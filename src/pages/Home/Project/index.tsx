import { GlobalRegistry } from '@/datav/core/registry';
import { IconWidget } from '@/datav/react/components';
import { Preview, Publish, Return } from '@/datav/react/icons';
import { CopyOutlined, DeleteOutlined, EditOutlined, SearchOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Badge, Button, Input, message, Modal, Select, Space, Spin } from 'antd';
import React, { useRef, useState } from 'react';
import { copyProject, delProject, editProject, publishState, queryProjectList } from '../../../services/datavApi';
import { formatDate } from '@/utils';
import AddProject from './add';
import './index.less';

const { Option } = Select;
GlobalRegistry.registerDesignerIcons({ Publish, Preview, Return });

const Project: React.FC = () => {
  const sotrtype = useRef<number>(1);
  const keyWord = useRef('');
  const [modalState, setModalState] = useState({
    visible: false,
    item: null,
  });
  const { loading, data, mutate, refresh } = useRequest(
    () => queryProjectList({ pagesize: 100, pagenum: 1, keyword: keyWord.current, sotrtype: sotrtype.current }),
    {
      // debounceWait: 1000,
      // refreshDeps: [keyWord],
      loadingDelay: 300,
    }
  );

  const handleSubmit = async (item: any) => {
    const res = await editProject({
      id: item.id || '',
      title: item.title,
      width: item.width,
      height: item.height,
    });
    if (res.code === 0) {
      message.success({
        content: item.id ? '修改成功' : '创建成功',
        className: 'dv-message-class',
      });
      setModalState({
        visible: false,
        item: null,
      });
      refresh();
      if (res.data?.id) {
        window.open(`/design/${res.data?.id}`);
      }
    } else {
      message.error({
        content: res.message,
        className: 'dv-message-class',
      });
    }
  };

  const copy = async (id: string) => {
    const res = await copyProject(id);
    if (res.code === 0) {
      message.success({
        content: '复制成功',
        className: 'dv-message-class',
      });
      refresh();
    } else {
      message.error({
        content: res.message,
        className: 'dv-message-class',
      });
    }
  };

  const deleteItem = (id: string) => {
    Modal.confirm({
      wrapClassName: 'dv-modal-confirm',
      title: '确认删除该项目吗？',
      icon: <ExclamationCircleOutlined />,
      content: '删除后无法恢复，请谨慎操作',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        const res = await delProject([id]);
        if (res.code === 0) {
          message.success({
            content: '删除成功',
            className: 'dv-message-class',
          });
          mutate((data as any[]).filter((f) => f.id !== id));
        } else {
          message.error({
            content: res.message,
            className: 'dv-message-class',
          });
        }
      },
      onCancel: () => {},
    });
  };
  return (
    <div className="visual-project">
      <Space size="large" className="head">
        <AddProject
          state={modalState}
          onSubmit={handleSubmit}
          onCancel={() => {
            setModalState({
              visible: false,
              item: null,
            });
          }}
        />
        <Button
          type="primary"
          onClick={() => {
            setModalState({
              visible: true,
              item: null,
            });
          }}
        >
          创建空白项目
        </Button>
        <div style={{ display: 'flex', alignItems: 'center' }} className="search-input">
          <Input
            prefix={<SearchOutlined />}
            // suffix={<SearchOutlined />}
            allowClear
            autoComplete="off"
            name="keyword"
            onChange={(e) => {
              keyWord.current = e.target.value;
            }}
            placeholder="项目名称搜索"
          />
          <Button type="primary" style={{ marginLeft: 10 }} onClick={refresh} shape="circle" icon={<SearchOutlined />} />
        </div>
        <div className="font-color stot">
          <div>排序方式：</div>
          <Select
            defaultValue={1}
            dropdownClassName="project-sort-select"
            onChange={(e) => {
              sotrtype.current = e;
              refresh();
            }}
            bordered={false}
          >
            <Option value={1}>按创建时间</Option>
            <Option value={2}>按修改时间</Option>
            <Option value={3}>按名称</Option>
          </Select>
        </div>
      </Space>
      <Spin tip={<span style={{ textShadow: 'none' }}>Loading...</span>} style={{ minHeight: 500 }} spinning={loading}>
        <div className="list-container">
          <div className="list">
            {data?.map((m) => (
              <RenderItem
                key={m.id}
                sotrtype={sotrtype.current}
                item={m}
                onDelete={deleteItem}
                onEdit={() => {
                  setModalState({
                    visible: true,
                    item: m,
                  });
                }}
                onCopy={copy}
              />
            ))}
          </div>
        </div>
      </Spin>
    </div>
  );
};
export default Project;

const RenderItem: React.FC<{
  item: any;
  onDelete: (id: string) => void;
  onEdit: () => void;
  sotrtype: number;
  onCopy: (id: string) => void;
}> = ({ item, sotrtype, onDelete, onEdit, onCopy }) => {
  const [publish, setPublish] = useState(item.publish);

  return (
    <div key={item.id} className="item font-color">
      <div
        className="cover"
        style={
          item.cutCover
            ? {
                background: `url(${item.cutCover})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: '100% 100%',
              }
            : {}
        }
      >
        {/* <img src={m.cover} alt="" /> */}
        <div className="activate">
          <div className="publish">
            <Space size={12}>
              <IconWidget
                title={item.publish ? '取消发布' : '发布'}
                infer={item.publish ? 'Return' : 'Publish'}
                onClick={async () => {
                  const newPublish = publish === 1 ? 0 : 1;
                  const res = await publishState({ id: item.id, publish: newPublish });
                  if (res.code === 0) {
                    message.success({
                      content: newPublish === 1 ? '发布成功' : '已取消发布',
                      className: 'dv-message-class',
                    });
                    item.publish = newPublish;
                    setPublish(newPublish);
                  } else {
                    message.info(res.message);
                  }
                }}
                style={{ color: '#fff' }}
              />
              <IconWidget
                title="预览"
                infer="Preview"
                onClick={() => {
                  window.open(`/screen/${item.id}`);
                }}
                style={{ color: '#fff' }}
              />
            </Space>
          </div>
          <div className="btn" onClick={() => window.open(`/design/${item.id}`)}>
            编辑
          </div>
          <Space size={14}>
            <EditOutlined title="重命名" onClick={onEdit} />
            <CopyOutlined title="复制" onClick={() => onCopy(item.id)} />
            <DeleteOutlined title="删除" onClick={() => onDelete(item.id)} />
          </Space>
        </div>
      </div>
      <div className="info">
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', paddingRight: 4 }} title={item?.title}>
            {item.title || '未命名'}
          </div>
          {sotrtype === 2 ? (
            <div className="tr">修改时间：{formatDate(item.updatetime, 'yyyy-MM-dd HH:mm:ss')}</div>
          ) : (
            <div className="tr">创建时间：{formatDate(item.createtime, 'yyyy-MM-dd HH:mm:ss')}</div>
          )}
        </div>
        {item.publish ? <Badge color="rgb(24 144 255)" text="已发布" /> : <Badge color="#576369" text="未发布" />}
      </div>
    </div>
  );
};

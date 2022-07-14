import { GlobalRegistry } from '@/datav/core/registry';
import { IconWidget } from '@/datav/react/components';
import { Preview, Publish, Return } from '@/datav/react/icons';
import { CopyOutlined, DeleteOutlined, EditOutlined, SearchOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Badge, Button, Input, message, Modal, Select, Space, Spin } from 'antd';
import React, { useState } from 'react';
import { delProject, publishState, queryProjectList } from './service';
const { Option } = Select;
import './index.less';
import { formatDate } from '@/utils';

GlobalRegistry.registerDesignerIcons({ Publish, Preview, Return });

const Project: React.FC = () => {
  const [keyWord, setkeyWord] = useState('');
  const { loading, data, mutate } = useRequest(() => queryProjectList({ pagesize: 100, pagenum: 1, keyword: keyWord }), {
    debounceWait: 1000,
    refreshDeps: [keyWord],
    loadingDelay: 300,
  });

  const deleteItem = (id: string) => {
    Modal.confirm({
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
          message.error(res.message);
        }
      },
      onCancel: () => {},
    });
  };
  return (
    <div className="visual-project">
      <Space size="large" className="head">
        <Button type="primary" onClick={() => window.open('/design/new')}>
          创建空白项目
        </Button>
        <Input
          prefix={<SearchOutlined />}
          autoComplete="off"
          value={keyWord}
          name="keyword"
          onChange={(e) => {
            setkeyWord(e.target.value);
          }}
          placeholder="请输入名称搜索"
        />
        <div className="font-color stot">
          <div>排序方式：</div>
          <Select defaultValue="3" style={{ width: 120 }} bordered={false}>
            <Option value="1">按创建时间</Option>
            <Option value="2">按修改时间</Option>
            <Option value="3">按名称</Option>
          </Select>
        </div>
      </Space>
      <Spin tip={<span style={{ textShadow: 'none' }}>Loading...</span>} style={{ minHeight: 500 }} spinning={loading}>
        <div className="list-container">
          <div className="list">
            {data?.map((m) => (
              <RenderItem key={m.id} item={m} onDelete={deleteItem} />
            ))}
          </div>
        </div>
      </Spin>
    </div>
  );
};
export default Project;

const RenderItem: React.FC<{ item: any; onDelete: (id: string) => void }> = ({ item, onDelete }) => {
  const [publish, setPublish] = useState(item.publish);

  return (
    <div key={item.id} className="item font-color">
      <div
        className="cover"
        style={
          item.cover
            ? {
                background: `url(${item.cover})`,
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
                title={publish ? '取消发布' : '发布'}
                infer={publish ? 'Return' : 'Publish'}
                onClick={async () => {
                  const newPublish = publish === 1 ? 0 : 1;
                  const res = await publishState({ id: item.id, publish: newPublish });
                  if (res.code === 0) {
                    message.success({
                      content: newPublish === 1 ? '发布成功' : '已取消发布',
                      className: 'dv-message-class',
                    });
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
            <EditOutlined
              title="重命名"
              onClick={() => {
                message.info('暂无接口支持');
              }}
            />
            <CopyOutlined
              title="复制"
              onClick={() => {
                message.info('暂无接口支持');
              }}
            />
            <DeleteOutlined title="删除" onClick={() => onDelete(item.id)} />
          </Space>
        </div>
      </div>
      <div className="info">
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{item.name}</div>
          <div className="tr">{formatDate(item.createtime, 'yyyy-MM-dd HH:mm:ss')}</div>
        </div>
        {publish ? <Badge color="rgb(24 144 255)" text="已发布" /> : <Badge color="#576369" text="未发布" />}
      </div>
    </div>
  );
};

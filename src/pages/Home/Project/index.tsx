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

const placeholderImg =
  'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjI4MzQ3OTY5NzI1IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI1Njg1IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIj48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwvc3R5bGU+PC9kZWZzPjxwYXRoIGQ9Ik05NzEuNDM0NjY3IDQ0Ny44MjkzMzNjMCAxOS4xMTQ2NjcgNi40ODUzMzMgNDQuNzE0NjY3IDYuNDg1MzMzIDYzLjgyOTMzNCAwIDI1NS42NTg2NjctMjEwLjk0NCA0NjYuMjYxMzMzLTQ2Ni4yNjEzMzMgNDY2LjI2MTMzM2gtMzguMjI5MzM0YzAgMTIuNjI5MzMzLTYuNDg1MzMzIDMyLjA4NTMzMy0xMi42MjkzMzMgNDQuNzE0NjY3aDUxLjJjMjgwLjkxNzMzMyAwIDUxMC45NzYtMjMwLjA1ODY2NyA1MTAuOTc2LTUxMC45NzYgMC0yNS42IDAtNTEuMi02LjQ4NTMzMy04Mi45NDQtMTMuMzEyIDYuNDg1MzMzLTI1Ljk0MTMzMyAxMi42MjkzMzMtNDUuMDU2IDE5LjExNDY2NnpNNDUuMDU2IDUxMS42NTg2NjdjMC03MC4zMTQ2NjcgMTkuMTE0NjY3LTE0MC42MjkzMzMgNDQuNzE0NjY3LTIwNC40NTg2NjctMTIuNjI5MzMzLTYuNDg1MzMzLTI1LjYtMTIuNjI5MzMzLTM4LjIyOTMzNC0yNS42LTMyLjA4NTMzMyA3MC4zMTQ2NjctNTEuMiAxNDYuNzczMzMzLTUxLjIgMjMwLjA1ODY2NyAwIDE4NS4zNDQgOTUuOTE0NjY3IDM0NS4wODggMjQ5LjE3MzMzNCA0MzQuNTE3MzMzIDAtMTIuNjI5MzMzIDYuNDg1MzMzLTI1LjYgMTkuMTE0NjY2LTM4LjIyOTMzMy0xNDAuNjI5MzMzLTgzLjI4NTMzMy0yMjMuNTczMzMzLTIzMC4wNTg2NjctMjIzLjU3MzMzMy0zOTYuMjg4ek01MTEuMzE3MzMzIDAuNjgyNjY3QzM5Ni4yODggMC42ODI2NjcgMjg3Ljc0NCAzOC45MTIgMTk4LjMxNDY2NyAxMDkuMjI2NjY3YzEyLjYyOTMzMyA2LjQ4NTMzMyAxOS4xMTQ2NjcgMTkuMTE0NjY3IDMyLjA4NTMzMyAzMi4wODUzMzNDMzA3LjIgNzcuMTQxMzMzIDQwMi43NzMzMzMgNDUuMzk3MzMzIDUxMS4zMTczMzMgNDUuMzk3MzMzYzE1OS43NDQgMCAyODAuOTE3MzMzIDYzLjgyOTMzMyAzNzAuMzQ2NjY3IDE3OC44NTg2NjcgMTIuNjI5MzMzLTYuNDg1MzMzIDE5LjExNDY2Ny0xOS4xMTQ2NjcgMzIuMDg1MzMzLTI1LjYtODkuNDI5MzMzLTEzNC4xNDQtMjI5LjcxNzMzMy0xOTcuOTczMzMzLTQwMi40MzItMTk3Ljk3MzMzM3pNMTk4LjMxNDY2NyAyMzAuNzQxMzMzbDIxMC45NDQgMjA0LjQ1ODY2N3Y2My44MjkzMzNMMTcyLjcxNDY2NyAyNjIuNDg1MzMzbDI1LjYtMzEuNzQ0eiBtLTUwLjg1ODY2Ny0xMi45NzA2NjZsMTc4Ljg1ODY2NyA2MTkuNTItNDQuNzE0NjY3IDEyLjYyOTMzM0wxMDguODg1MzMzIDIzMC43NDEzMzNsMzguNTcwNjY3LTEyLjk3MDY2NnogbTI2OC4yODggNjcwLjcybC0zMi4wODUzMzMtMzIuMDg1MzM0IDUzMC4wOTA2NjYtNTQyLjcyIDMyLjA4NTMzNCAzMi4wODUzMzQtNTMwLjA5MDY2NyA1NDIuNzJ6IG0xMzQuMTQ0LTQyMS41NDY2NjdsLTEyLjYyOTMzMy0zOC4yMjkzMzNMODU2LjQwNTMzMyAzMDcuMmwzMi4wODUzMzQgMzguMjI5MzMzLTMzOC42MDI2NjcgMTIxLjUxNDY2N3pNODQ5LjkyIDI5NC41NzA2NjdMMTY2LjU3MDY2NyAxNzkuNTQxMzMzbDYuNDg1MzMzLTQ0LjcxNDY2Nkw4NTYuNzQ2NjY3IDI0My4zNzA2NjdsLTYuODI2NjY3IDUxLjJ6IG0tNDIxLjU0NjY2NyAyNTUuMzE3MzMzbDQ0LjcxNDY2NyAxMi42MjkzMzMtOTUuOTE0NjY3IDI5NC4yMjkzMzQtNDQuNzE0NjY2LTEyLjYyOTMzNCA5NS45MTQ2NjYtMjk0LjIyOTMzM3ogbTAgMCIgZmlsbD0iIzQzNDM0MyIgcC1pZD0iMjU2ODYiPjwvcGF0aD48cGF0aCBkPSJNMzI2LjMxNDY2NyA5OTAuODkwNjY3Yy01MS4yIDAtOTUuOTE0NjY3LTQ0LjcxNDY2Ny05NS45MTQ2NjctOTUuOTE0NjY3IDAtNTEuMiA0NC43MTQ2NjctOTUuOTE0NjY3IDk1LjkxNDY2Ny05NS45MTQ2NjcgNTEuMiAwIDk1LjkxNDY2NyA0NC43MTQ2NjcgOTUuOTE0NjY2IDk1LjkxNDY2Ny0wLjM0MTMzMyA1MS4yLTQ1LjA1NiA5NS45MTQ2NjctOTUuOTE0NjY2IDk1LjkxNDY2N3ogbTAtMTQ3LjExNDY2N2MtMjUuNiAwLTUxLjIgMjUuNi01MS4yIDUxLjJzMjUuNiA1MS4yIDUxLjIgNTEuMiA1MS4yLTI1LjYgNTEuMi01MS4yYy0wLjM0MTMzMy0yNS42LTI1LjYtNTEuMi01MS4yLTUxLjJ6IG02MDAuNDA1MzMzLTQ5MS44NjEzMzNjLTUxLjIgMC05NS45MTQ2NjctNDQuNzE0NjY3LTk1LjkxNDY2Ny05NS45MTQ2NjdzNDQuNzE0NjY3LTk1LjU3MzMzMyA5NS45MTQ2NjctOTUuNTczMzMzYzUxLjIgMCA5NS45MTQ2NjcgNDQuNzE0NjY3IDk1LjkxNDY2NyA5NS45MTQ2NjZzLTQ0LjcxNDY2NyA5NS41NzMzMzMtOTUuOTE0NjY3IDk1LjU3MzMzNHogbTAtMTQ2Ljc3MzMzNGMtMjUuNiAwLTUxLjIgMjUuNi01MS4yIDUxLjJzMjUuNiA1MS4yIDUxLjIgNTEuMiA1MS4yLTI1LjYgNTEuMi01MS4yLTI1LjYtNTEuMi01MS4yLTUxLjJ6TTk2LjI1NiAyMjQuMjU2QzQ1LjA1NiAyMjQuMjU2IDAuMzQxMzMzIDE3OS41NDEzMzMgMC4zNDEzMzMgMTI4LjM0MTMzM2MwLTUxLjIgNDQuNzE0NjY3LTk1LjkxNDY2NyA5NS45MTQ2NjctOTUuOTE0NjY2czk1LjkxNDY2NyA0NC43MTQ2NjcgOTUuOTE0NjY3IDk1LjkxNDY2NmMwIDUxLjItNDQuNzE0NjY3IDk1LjkxNDY2Ny05NS45MTQ2NjcgOTUuOTE0NjY3eiBtMC0xNDcuMTE0NjY3Yy0yNS42IDAtNTEuMiAxOS4xMTQ2NjctNTEuMiA1MS4yIDAgMjUuNiAyNS42IDUxLjIgNTEuMiA1MS4yczUxLjItMjUuNiA1MS4yLTUxLjItMjUuNi01MS4yLTUxLjItNTEuMnpNNDY2LjYwMjY2NyA1NTYuMzczMzMzYy01MS4yIDAtODkuNDI5MzMzLTQ0LjcxNDY2Ny04OS40MjkzMzQtOTUuOTE0NjY2IDAtNTEuMiA0NC43MTQ2NjctOTUuOTE0NjY3IDk1LjkxNDY2Ny05NS45MTQ2NjcgNTEuMiAwIDk1LjkxNDY2NyA0NC43MTQ2NjcgOTUuOTE0NjY3IDk1LjkxNDY2NyAwIDUxLjItNDQuNzE0NjY3IDk1LjkxNDY2Ny0xMDIuNCA5NS45MTQ2NjZ6IG0wLTE0Ni43NzMzMzNjLTI1LjYgMC01MS4yIDI1LjYtNTEuMiA1MS4yIDYuNDg1MzMzIDI1LjYgMjUuNiA1MS4yIDUxLjIgNTEuMnM1MS4yLTI1LjYgNTEuMi01MS4yYzAtMzIuMDg1MzMzLTE5LjExNDY2Ny01MS4yLTUxLjItNTEuMnogbTAgMCIgZmlsbD0iIzQzNDM0MyIgcC1pZD0iMjU2ODciPjwvcGF0aD48L3N2Zz4=';
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
              <div className="item-wrap" key={m.id}>
                <RenderItem
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
              </div>
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
      <div className="cover">
        {item.cutCover ? <img src={item.cutCover} alt="" /> : <img className="placeholderImg" src={placeholderImg} alt="" />}
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

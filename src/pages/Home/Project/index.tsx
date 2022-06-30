import { GlobalRegistry } from '@/datav/core/registry';
import { IconWidget } from '@/datav/react/components';
import { Preview, Publish } from '@/datav/react/icons';
import { CopyOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Badge, Button, Input, message, Select, Space, Spin } from 'antd';
import React, { useState } from 'react';
import { queryProjectList } from './service';
const { Option } = Select;
import './index.less';

GlobalRegistry.registerDesignerIcons({ Publish, Preview });
const Project: React.FC = () => {
  const [keyWord, setkeyWord] = useState('');
  const { loading, data } = useRequest(() => queryProjectList());

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
          onChange={(e) => setkeyWord(e.target.value)}
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
      <div className="list-container">
        <Spin tip="Loading..." spinning={loading}>
          <div className="list">
            {data?.map((m) => (
              <div key={m.id} className="item font-color">
                <div
                  className="cover"
                  style={{
                    background: `url(${m.cover})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: '100% 100%',
                  }}
                >
                  {/* <img src={m.cover} alt="" /> */}
                  <div className="activate">
                    <div className="publish">
                      <Space size={12}>
                        <IconWidget
                          title="发布"
                          infer="Publish"
                          onClick={() => {
                            message.info('暂无接口支持');
                          }}
                          style={{ color: '#fff' }}
                        />
                        <IconWidget
                          title="预览"
                          infer="Preview"
                          onClick={() => {
                            window.open(`/screen/${m.id}`);
                          }}
                          style={{ color: '#fff' }}
                        />
                      </Space>
                    </div>
                    <div className="btn" onClick={() => window.open(`/design/${m.id}`)}>
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
                      <DeleteOutlined
                        title="删除"
                        onClick={() => {
                          message.info('暂无接口支持');
                        }}
                      />
                    </Space>
                  </div>
                </div>
                <div className="info">
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{m.name}</div>
                    <div className="tr">{m.createtime}</div>
                  </div>
                  <Badge color="#576369" text="未发布" />
                </div>
              </div>
            ))}
          </div>
        </Spin>
      </div>
    </div>
  );
};
export default Project;

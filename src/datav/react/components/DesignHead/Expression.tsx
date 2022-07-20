import React, { useRef, useState } from 'react';
import { Divider, Modal, Tooltip } from 'antd';
import { IconWidget } from '../IconWidget/index';
import { useDesigner } from '../../hooks';
import { MonacoEditor } from '../../settings-form/components';

/** 配置JSON */
export const Expression: React.FC = () => {
  const [isModalVisible, setisModalVisible] = useState(false);
  const valRef = useRef<any>();
  const designer = useDesigner();
  return (
    <div>
      <Modal
        closeIcon={<IconWidget infer="Close" style={{ color: '#fff' }} />}
        visible={isModalVisible}
        bodyStyle={{ padding: 12, background: '#2a2e33' }}
        footer={null}
        width={1000}
        onCancel={() => {
          setisModalVisible(false);
        }}
        afterClose={() => {
          designer.setInitialValue(valRef.current);
        }}
      >
        <div style={{ color: '#fff' }}>JSON配置</div>
        <Divider style={{ margin: '12px 0', borderColor: 'rgb(68 72 76)' }} />
        <MonacoEditor
          {...{
            language: 'json',
            value: valRef.current,
            autoFormat: true,
            height: 500,
            options: {
              minimap: {
                enabled: true, // 是否显示缩略图
              },
            },
            className: 'filter-editor',
            onChange: (val) => {
              valRef.current = val;
            },
          }}
        />
      </Modal>
      <Tooltip overlayClassName="design-tip" color="#2681ff" placement="bottom" title={'大屏JSON配置'}>
        <div
          className={`head-btn`}
          onClick={() => {
            valRef.current = designer.getConfig();
            setisModalVisible(true);
          }}
        >
          <IconWidget infer="Expression" style={{ color: '#fff' }} />
        </div>
      </Tooltip>
    </div>
  );
};

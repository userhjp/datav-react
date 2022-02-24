import React from 'react';
import { ObjectField as ObjectFieldType } from '@formily/core';
import { Field, ObjectField, useField } from '@formily/react';
import { useMemo } from 'react';
import { DataSource } from '../../interface';
import { Tooltip } from 'antd';
import { BlurInput } from '../components';
import './index.less';
/** 还未想好事件怎么处理 */
export const EventFields: React.FC = () => {
  const field = useField<ObjectFieldType<DataSource>>();
  const value = useMemo(() => field.value || {}, [field.value]);

  return (
    <ObjectField name="fields">
      <div>
        <table className="data-attr-table">
          <thead className="table-head">
            <tr className="table-head-row">
              <th className="th-item column-item attr-name">字段</th>
              <th className="th-item column-item attr-value">绑定到变量</th>
              <th className="th-item column-item attr-describe">字段说明</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {Object.keys(value?.fields || {}).map((key) => (
              <ObjectField name={key} key={key}>
                <tr className="table-body-row">
                  <td className="column-item attr-name">
                    <Tooltip overlayClassName="design-tip" color="#2681ff" placement="left" title={value?.fields[key].description || null}>
                      <span style={{ cursor: 'help' }}>{key}</span>
                    </Tooltip>
                  </td>
                  <td className="column-item attr-value">
                    <Field name="map" component={[BlurInput, { size: 'small', placeholder: '可自定义' }]} />
                  </td>
                  <td className="column-item attr-describe">描述。。。</td>
                </tr>
              </ObjectField>
            ))}
          </tbody>
        </table>
      </div>
    </ObjectField>
  );
};

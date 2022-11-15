import { IFieldSetting } from '../../../../../interface';
import React from 'react';
import './index.less';

type FieldGridProps = {
  fields: IFieldSetting;
  typeName: '对象' | '列表';
};

export const FieldGrid: React.FC<FieldGridProps> = (props) => {
  const { fields, typeName } = props;
  if (!fields || Object.keys(fields).length < 1) return null;
  return (
    <div v-if="fields" className="field-wp">
      <div className="field-info">
        数据响应结果应为{typeName}，{typeName}
        {typeName === '列表' ? '对象' : ''}元素包含如下字段
      </div>
      <div className="field-grid">
        <div className="field-item field-title">字段</div>
        <div className="field-item field-title">映射</div>
        <div className="field-item field-title">说明</div>
        {Object.keys(fields).map((m, i) => (
          <React.Fragment key={i}>
            <div className="field-item">{m}</div>
            <div className="field-item">{fields[m].map || '-'}</div>
            <div className="field-item">{fields[m].description || '-'}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

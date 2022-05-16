import { useDvGlobal } from '@/datav/react/hooks';
import { ArrayItems, Space, FormItem, Form } from '@formily/antd';
import { createForm, onFieldValueChange } from '@formily/core';
import { createSchemaField, FormProvider, observer, useField } from '@formily/react';
import { toJS } from '@formily/reactive';
import { Select as AntdSelect, Collapse, InputNumberProps } from 'antd';
import React, { useMemo, useState } from 'react';
import { ColorPicker } from '../ColorPicker';
import './index.less';

export const Palette: React.FC<any> = observer(({ value, onChange }) => {
  const dvGlobal = useDvGlobal();
  const field = useField();

  const colors = toJS(dvGlobal.colorList);
  const currentColors = toJS(value || dvGlobal.colorList[0]);
  const handleChange = (colors: string[]) => {
    if (JSON.stringify(value) !== JSON.stringify(colors)) onChange(colors);
  };

  return (
    <div className="palette-select-dropdown-menu">
      <Collapse className="palette-collapse" expandIconPosition="right" ghost>
        <Collapse.Panel
          header={
            <ColorSelect
              style={{ width: '254px', display: 'flex' }}
              colors={colors}
              title={field.title}
              value={'current'}
              currentColors={currentColors}
              onChange={(e) => handleChange(colors[e])}
            />
          }
          key="1"
        >
          <ColorArrayForm value={currentColors} onChange={handleChange} />
        </Collapse.Panel>
      </Collapse>
    </div>
  );
});

const ColorSelect: React.FC<InputNumberProps & { title?: string; colors: string[][]; currentColors?: string[] }> = (props) => {
  const { value, onChange, title, colors, style, currentColors = [] } = props;
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: 'block', alignItems: 'center', width: '100%', ...(style || {}) }} onClick={(e) => e.stopPropagation()}>
      {title && <span style={{ paddingRight: 20 }}>{title}</span>}
      <AntdSelect
        style={{ minWidth: 0, flex: 1 }}
        virtual={false}
        showArrow={false}
        open={open}
        onDropdownVisibleChange={(e) => {
          if (e) setOpen(true);
        }}
        value={value}
        onChange={(newValue) => {
          if (value !== newValue) {
            onChange(newValue);
          }
        }}
        onBlur={() => setOpen(false)}
        dropdownClassName="palette-select-dropdown"
      >
        <AntdSelect.OptGroup label="当前映射">
          <AntdSelect.Option disabled value="current">
            <div
              className="palette-select-dropdown-menu-item"
              style={{ userSelect: 'none', height: '100%', display: 'flex', alignItems: 'center' }}
            >
              {currentColors.map((m, i) => (
                <span key={i} style={{ backgroundColor: m }} />
              ))}
            </div>
          </AntdSelect.Option>
        </AntdSelect.OptGroup>
        <AntdSelect.OptGroup label="选择模板">
          {colors.map((arr: string[], i) => {
            return (
              <AntdSelect.Option key={i} value={i}>
                <div
                  className="palette-select-dropdown-menu-item"
                  key={i}
                  style={{ userSelect: 'none', height: '100%', display: 'flex', alignItems: 'center' }}
                >
                  {arr.map((m, i) => (
                    <span key={i} style={{ backgroundColor: m }} />
                  ))}
                </div>
              </AntdSelect.Option>
            );
          })}
        </AntdSelect.OptGroup>
      </AntdSelect>
    </div>
  );
};

const SchemaField = createSchemaField({
  components: {
    ArrayItems,
    ColorPicker,
    Space,
    FormItem,
  },
});

const ColorArrayForm: React.FC<{ value: string[]; onChange: (val: string[]) => void }> = ({ value, onChange }) => {
  const form = useMemo(
    () =>
      createForm({
        initialValues: {
          string_array: value,
        },
        effects() {
          onFieldValueChange('string_array.*', (field) => {
            const val = toJS(field.form.getValuesIn('string_array'));
            if (JSON.stringify(val) !== JSON.stringify(value)) {
              onChange(val);
            }
          });
        },
      }),
    [value]
  );

  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.Array
          name="string_array"
          title="颜色配置"
          x-decorator="FormItem"
          x-component="ArrayItems"
          x-decorator-props={{ labelWidth: 58 }}
        >
          <SchemaField.Void x-component="Space">
            <SchemaField.Void x-decorator="FormItem" x-component="ArrayItems.SortHandle" />
            <SchemaField.String
              x-decorator="FormItem"
              name="input"
              x-component="ColorPicker"
              x-component-props={{ styleType: 2 } as any}
              default="#0098d9"
            />
            <SchemaField.Void x-decorator="FormItem" x-component="ArrayItems.Remove" />
          </SchemaField.Void>
          <SchemaField.Void
            x-reactions={{
              dependencies: ['..string_array'],
              fulfill: {
                state: {
                  visible: '{{$deps[0].length < 8}}',
                },
              },
            }}
            x-component="ArrayItems.Addition"
            title="添加颜色"
          />
        </SchemaField.Array>
      </SchemaField>
    </FormProvider>
  );
};

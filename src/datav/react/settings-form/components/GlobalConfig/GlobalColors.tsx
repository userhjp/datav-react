import { ArrayItems, Space, FormItem } from '@formily/antd';
import { ArrayField as ArrayFieldType, createForm, onFieldInputValueChange, onFieldValueChange } from '@formily/core';
import { createSchemaField, FormProvider, observer, useField } from '@formily/react';
import { toJS } from '@formily/reactive';
import { Select as AntdSelect, Collapse, InputNumberProps } from 'antd';
import React, { useMemo, useState } from 'react';
import { ColorPicker } from '../ColorPicker';
import './index.less';

export const GlobalColors: React.FC<any> = observer(({ value, onChange }) => {
  const field = useField<ArrayFieldType>();
  const [idx, setIdx] = useState(0);
  return (
    <div className="global-colors-select-dropdown-menu">
      <Collapse className="global-colors-collapse" expandIconPosition="right" ghost>
        <Collapse.Panel
          header={
            <ColorSelect
              style={{ width: '90%', display: 'flex' }}
              colors={value}
              value={idx}
              onChange={(e: number) => setIdx(e)}
              onAdd={() => {
                field.push(['red']);
              }}
            />
          }
          key="1"
        >
          <ColorArrayForm
            value={field.value[idx]}
            onChange={(e) => {
              field.value[idx] = e;
            }}
          />
        </Collapse.Panel>
      </Collapse>
    </div>
  );
});

const ColorSelect: React.FC<InputNumberProps & { value: number; colors: string[][]; onAdd: () => void }> = (props) => {
  const { value, onChange, onAdd, colors, style } = props;
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: 'block', alignItems: 'center', width: '100%', ...(style || {}) }} onClick={(e) => e.stopPropagation()}>
      <span style={{ paddingRight: 20 }}>配置模板</span>
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
            setOpen(false);
          }
        }}
        onBlur={() => setOpen(false)}
        dropdownClassName="global-colors-select-dropdown"
      >
        <AntdSelect.OptGroup label="选择配置模板">
          {colors.map((arr: string[], i) => {
            return (
              <AntdSelect.Option key={i} value={i}>
                <div
                  className="global-colors-select-dropdown-menu-item"
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
        values: {
          string_array: value,
        },
        effects() {
          onFieldInputValueChange('string_array', (field) => {
            onChange(field.value);
            console.log(field.value);
          });
          onFieldValueChange('string_array.*', (field) => {
            const val = toJS(field.form.getValuesIn('string_array'));
            onChange(val);
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
          x-decorator-props={{ labelWidth: 68, layout: 'horizontal' }}
        >
          <SchemaField.Void x-component="Space" x-component-props={{ className: 'color-array-space', style: { width: '100%' } }}>
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
            title="添加颜色"
            x-component="ArrayItems.Addition"
            x-reactions={{
              dependencies: ['..string_array'],
              fulfill: {
                state: {
                  visible: '{{$deps[0].length < 8}}',
                },
              },
            }}
          />
        </SchemaField.Array>
      </SchemaField>
    </FormProvider>
  );
};
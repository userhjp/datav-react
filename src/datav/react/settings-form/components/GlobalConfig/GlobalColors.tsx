import { IGlobalColor } from '@/datav/core';
import { IconWidget } from '@/datav/react/components';
import { ArrayItems, Space, FormItem, Radio } from '@formily/antd';
import { ArrayField as ArrayFieldType, createForm, onFieldInputValueChange } from '@formily/core';
import { createSchemaField, FormProvider, observer, useField } from '@formily/react';
import { Select as AntdSelect, Collapse, InputNumberProps, InputProps } from 'antd';
import React, { useMemo, useState } from 'react';
import { ColorPicker } from '../ColorPicker';
import './index.less';

export const GlobalColors: React.FC<any> = observer(({ value }) => {
  const field = useField<ArrayFieldType>();
  const [idx, setIdx] = useState(0);

  return (
    <div className="global-colors-select-dropdown-menu">
      <Collapse className="global-colors-collapse" expandIconPosition="right" defaultActiveKey={[1]} ghost>
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
              debugger;
              field.value[idx] = e;
            }}
          />
        </Collapse.Panel>
      </Collapse>
    </div>
  );
});

const ColorSelect: React.FC<InputNumberProps & { value: number; colors: IGlobalColor[]; onAdd: () => void }> = observer((props) => {
  const { value, onChange, onAdd, colors, style } = props;
  const [open, setOpen] = useState(false);
  return (
    <div style={{ display: 'block', alignItems: 'center', width: '100%', ...(style || {}) }} onClick={(e) => e.stopPropagation()}>
      <span style={{ paddingRight: 20 }}>选择模板</span>
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
          {colors.map((item, i) => {
            return (
              <AntdSelect.Option key={i} value={i}>
                <div
                  className="global-colors-select-dropdown-menu-item"
                  key={i}
                  style={{ userSelect: 'none', height: '100%', display: 'flex', alignItems: 'center' }}
                >
                  {item.map((m, i) => {
                    const cStyle: React.CSSProperties = {};
                    switch (m.type) {
                      case 'horizontal':
                        cStyle.backgroundImage = `linear-gradient(to right, ${m.baseColor}, ${m.gradualColor})`;
                        break;
                      case 'vertical':
                        cStyle.backgroundImage = `linear-gradient(to top, ${m.baseColor}, ${m.gradualColor})`;
                        break;
                      default:
                        cStyle.backgroundColor = m.baseColor;
                        break;
                    }
                    return <span key={i} style={cStyle} />;
                  })}
                </div>
              </AntdSelect.Option>
            );
          })}
        </AntdSelect.OptGroup>
      </AntdSelect>
    </div>
  );
});

const ColorsType: React.FC<{ value: string; onChange: (val: string) => void }> = ({ value, onChange }) => {
  switch (value) {
    case 'horizontal':
      return <IconWidget infer="FlexJustifyEnd" onClick={() => onChange('vertical')} />;
    case 'vertical':
      return <IconWidget infer="FlexJustifyStart" onClick={() => onChange('base')} />;
    default:
      return <IconWidget infer="AddOperation" onClick={() => onChange('horizontal')} />;
  }
};

const SchemaField = createSchemaField({
  components: {
    ArrayItems,
    ColorPicker,
    Space,
    FormItem,
    Radio,
    ColorsType,
  },
});

export const ColorArrayForm: React.FC<{ value: IGlobalColor; onChange: (val: IGlobalColor) => void; compColor?: boolean }> = ({
  value,
  onChange,
  compColor = false,
}) => {
  const form = useMemo(
    () =>
      createForm({
        values: {
          colorList: value,
        },
        effects() {
          onFieldInputValueChange('colorList.*', (field) => {
            onChange(field.form.values.colorList);
          });
          // onFieldInputValueChange('colorList', (field) => {
          //   onChange(field.form.values);
          // });
          // onFieldInputValueChange('colorType', (field) => {
          //   if (compColor) onChange(field.form.values);
          // });
        },
      }),
    [value]
  );

  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.Array
          name="colorList"
          title="颜色配置"
          x-decorator="FormItem"
          x-component="ArrayItems"
          x-decorator-props={{ labelWidth: 68, layout: 'horizontal' }}
        >
          <SchemaField.Object>
            <SchemaField.Void x-component="Space" x-component-props={{ className: 'color-array-space', style: { width: '100%' } }}>
              <SchemaField.Void x-decorator="FormItem" x-component="ArrayItems.SortHandle" />
              <SchemaField.String
                x-decorator="FormItem"
                name="baseColor"
                x-component="ColorPicker"
                x-component-props={{ styleType: 2 } as any}
                default="#0098d9"
              />
              <SchemaField.String
                x-decorator="FormItem"
                name="gradualColor"
                x-component="ColorPicker"
                x-component-props={{ styleType: 2 } as any}
                default="#0098d9"
                x-reactions={{
                  dependencies: ['.type'],
                  fulfill: {
                    state: {
                      visible: '{{$deps[0] !== "base"}}',
                    },
                  },
                }}
              />
              <SchemaField.String name="type" x-decorator="FormItem" x-component="ColorsType" />
              <SchemaField.Void x-decorator="FormItem" x-component="ArrayItems.Remove" />
            </SchemaField.Void>
          </SchemaField.Object>
          <SchemaField.Void
            title="添加颜色"
            x-component="ArrayItems.Addition"
            x-reactions={{
              dependencies: ['...colorList'],
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

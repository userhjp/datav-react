import { _Validators } from '@/utils/validators';
import { Button, Divider, Modal } from 'antd';
import { Form, FormItem, Input, Select, Submit, FormGrid, FormButtonGroup } from '@formily/antd';
import React, { useEffect } from 'react';
import { createForm } from '@formily/core';
import { Field, VoidField } from '@formily/react';
import './index.less';

export type EditUserProps = {
  onSubmit: (values: any) => void;
  onCancel: () => void;
  state: {
    visible: boolean;
    item: any;
  };
};

const form = createForm({
  validateFirst: true,
});

const AddProject: React.FC<EditUserProps> = (props) => {
  const { state, onCancel, onSubmit } = props;

  useEffect(() => {
    if (state.visible) {
      form.reset();
      if (state.item) {
        form.setValues({
          title: state.item.title,
          width: state.item.width,
          height: state.item.height,
        });
      }
    }
  }, [state]);

  return (
    <Modal
      wrapClassName="project-add-wrap"
      width={500}
      style={{ top: '26%' }}
      maskClosable={false}
      destroyOnClose
      open={state.visible}
      footer={false}
      onCancel={onCancel}
    >
      <div className="project-add-wrap-title">{state.item ? '重命名项目' : '创建空白项目'}</div>
      {/* <Divider style={{ margin: '12px 0', borderColor: 'rgb(68 72 76)' }} /> */}
      <Form
        layout={'vertical'}
        form={form}
        labelCol={5}
        wrapperCol={16}
        onAutoSubmit={(values) => onSubmit({ ...values, id: state.item?.id || null })}
      >
        <Field
          name="title"
          title="大屏名称"
          decorator={[FormItem]}
          component={[Input, { placeholder: '请输入' }]}
          validator={{
            required: true,
            message: '大屏名称不能为空',
          }}
        />
        <VoidField
          name="name"
          title="大屏尺寸"
          decorator={[
            FormItem,
            {
              asterisk: true,
              feedbackLayout: 'none',
            },
          ]}
          component={[FormGrid]}
        >
          <Field
            name="width"
            decorator={[FormItem]}
            initialValue={1920}
            component={[
              Input,
              {
                placeholder: '宽',
                suffix: <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>px</span>,
              },
            ]}
            validator={{
              required: true,
              message: '大屏宽度不能为空',
            }}
          />
          <Field
            name="height"
            decorator={[FormItem]}
            initialValue={1080}
            component={[
              Input,
              {
                placeholder: '高',
                suffix: <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>px</span>,
              },
            ]}
            validator={{
              required: true,
              message: '大屏高度不能为空',
            }}
          />
        </VoidField>
        <FormButtonGroup.FormItem style={{ textAlign: 'center' }}>
          <Submit>提交</Submit>
        </FormButtonGroup.FormItem>
      </Form>
    </Modal>
  );
};

export default AddProject;

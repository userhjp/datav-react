import React, { useEffect } from 'react';
import { RecursionField, useField, observer, ISchema, VoidField, useForm } from '@formily/react';
import { useSelected } from '../../hooks';
import { layoutSchema, pageSchema } from '../schema';
import './index.less';

export const SettingsPage: React.FC = observer((props) => {
  const selected = useSelected();
  const field = useField();

  return (
    <VoidField basePath={field.address} name="settings">
      <div className="settings-layout" style={{ zIndex: selected.length > 1 ? 99 : -1 }}>
        <RecursionField name="layout" schema={layoutSchema} />
      </div>
      <div className="settings-layout" style={{ zIndex: selected.length == 0 ? 99 : -1 }}>
        <RecursionField name="pages" schema={pageSchema} />
      </div>
    </VoidField>
  );
});

import { FieldStatus } from '../../../../../shared';
import React, { useMemo } from 'react';
import './index.less';

type DataStateProps = {
  status: FieldStatus;
};

export const DataState: React.FC<DataStateProps> = ({ status }) => {
  const renderState = useMemo(() => {
    switch (status) {
      case FieldStatus.success:
        return <div className="data-success">匹配成功</div>;
      case FieldStatus.failed:
        return <div className="data-failed">未匹配到字段</div>;
      default:
        return (
          <div className="loading">
            <span>
              <i className="status-icon validating" />
              <i className="status-icon validating" />
              <i className="status-icon validating" />
            </span>
            匹配中
          </div>
        );
    }
  }, [status]);

  return <div className="data-status">{renderState}</div>;
};

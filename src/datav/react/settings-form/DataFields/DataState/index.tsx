import { FieldStatus } from '@/datav/shared';
import React, { useMemo } from 'react';
import './index.less';

type DataStateProps = {
  value: FieldStatus;
};

const DataState: React.FC<DataStateProps> = (props) => {
  const { value } = props;
  const renderState = useMemo(() => {
    switch (value) {
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
  }, [value]);

  return <div className="data-status">{renderState}</div>;
};
export default DataState;

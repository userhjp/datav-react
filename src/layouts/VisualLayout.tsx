import React from 'react';
import { AppstoreAddOutlined, DesktopOutlined, FundProjectionScreenOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, NavLink } from 'react-router-dom';
import { Outlet } from 'react-router';
import './VisualLayout.less';

const VisualLayout: React.FC = () => {
  return (
    <div className="visual-layout">
      <div className="sidebar">
        <div>
          <div className="top">
            <img alt="logo" className="logo" src={require('@/assets/svg/logo.svg')} />
            <div className="links">
              <NavLink to="/visual/project" className={(selected) => `${selected.isActive ? 'selected' : ''}`}>
                <AppstoreAddOutlined />
                &nbsp;&nbsp;
                <span className="link-title">我的项目</span>
              </NavLink>
              <NavLink to="/visual/example" className={(selected) => `${selected.isActive ? 'selected' : ''}`}>
                <FundProjectionScreenOutlined />
                &nbsp;&nbsp;
                <span className="link-title">项目案例</span>
              </NavLink>
            </div>
          </div>
          <div className="links">
            <Link to="/sys">
              <DesktopOutlined />
              &nbsp;&nbsp;
              <span className="link-title">进入后台</span>
            </Link>
            <a>
              <LogoutOutlined />
              &nbsp;&nbsp;
              <span className="link-title">退出登录</span>
            </a>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="router-out">
          <Outlet />
        </div>
        <div className="text">version 1.2 重庆咸鱼科技公司</div>
      </div>
    </div>
  );
};

export default VisualLayout;

import React from 'react';
import { AppstoreAddOutlined, DesktopOutlined, FundProjectionScreenOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, NavLink } from 'react-router-dom';
import { Outlet } from 'react-router';
import { Expression } from '@/datav/react/icons';
import './VisualLayout.less';

const VisualLayout: React.FC = () => {
  return (
    <div className="visual-layout">
      <div className="sidebar">
        <div>
          <div className="top">
            {/* <img alt="logo" className="logo" src={require('@/assets/svg/logo.svg')} /> */}
            <svg className="rotate" width={40} height={40} viewBox="0 0 1024 1024" fill="#1890ff">
              <path
                d="M784 313.6L512 166.4 240 313.6l272 156.8 272-156.8z m67.2 73.6l-291.2 166.4v307.2l291.2-153.6v-320zM464 864v-310.4L169.6 384v323.2l294.4 156.8z m44.8-806.4l435.2 233.6v473.6l-435.2 233.6-435.2-233.6V291.2l435.2-233.6z"
                p-id="4604"
              />
            </svg>
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

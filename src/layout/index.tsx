import React, { useState } from 'react';
import { renderRoutes } from 'react-router-config';
import { Layout, Menu } from 'antd';
import { DesktopOutlined, PieChartOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import { PAGE } from 'utils/enum';
import './style.scss';

const { Header, Content, Sider } = Layout;

function MainLayout(props: any) {
  const location = useLocation();
  const { route, history } = props;
  const [collapsed, setCollapsed] = useState(false);

  const toggleSlider = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = (param: any) => {
    history.push(param.key);
  };

  return (
    <Layout className="site-layout">
      <Sider collapsible collapsed={collapsed} onCollapse={toggleSlider} className="site-sidebar">
        <div className="logo">
          <img src="/logo.jpeg" alt="logo" />
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={[location.pathname ?? `Chat`]}
          mode="inline"
          onClick={handleMenuClick}
        >
          <Menu.Item key={PAGE.HOME} icon={<DesktopOutlined />}>
            Home
          </Menu.Item>
          <Menu.Item key={PAGE.CHAT} icon={<PieChartOutlined />}>
            Chat
          </Menu.Item>
          <Menu.Item key={PAGE.CONTACTS} icon={<PieChartOutlined />}>
            Contacts
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className={`site-content-wrapper ${collapsed ? 'ml-80' : 'ml-200'}`}>
        <Header className="site-header">Task Detials ZURU</Header>
        <Content className="site-content">{renderRoutes(route.routes)}</Content>
      </Layout>
    </Layout>
  );
}

export default MainLayout;

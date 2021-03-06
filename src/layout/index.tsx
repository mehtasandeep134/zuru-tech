import React, { useState } from 'react';
import { renderRoutes } from 'react-router-config';
import { Layout, Menu } from 'antd';
import { PieChartOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import StaticLabels from '../data/contacts.json';
import './style.scss';

const { Header, Content, Sider, Footer } = Layout;

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
        <div className="slideWrapper">
          <Menu
            theme="dark"
            defaultSelectedKeys={[location.pathname ?? `Chat`]}
            mode="inline"
            onClick={handleMenuClick}
          >
            {StaticLabels.menuCards.map((items: any) => (
              <Menu.Item key={items} icon={<PieChartOutlined />}>
                {items}
              </Menu.Item>
            ))}
          </Menu>
        </div>
      </Sider>
      <Layout className={`site-content-wrapper ${collapsed ? 'ml-80' : 'ml-200'}`}>
        <Header className="site-header">
          <h1>{StaticLabels.header}</h1>
        </Header>
        <Content className="site-content">{renderRoutes(route.routes)}</Content>
        <Footer>Double click on name to edit it * * *</Footer>
      </Layout>
    </Layout>
  );
}

export default MainLayout;

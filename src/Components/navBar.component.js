import React from "react";
import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";
import { Layout, Menu} from 'antd';
import { 
  UserOutlined, 
  DashboardOutlined,
  PlusOutlined, 
  DatabaseOutlined, 
  FundTwoTone, 
  PieChartTwoTone,
  IeOutlined
} 
from '@ant-design/icons';
const { Sider } = Layout;


const  MenuComponent = () =>{ 
    return <Sider
    breakpoint="lg"
    collapsedWidth="0"
    onBreakpoint={broken => {
    }}
    onCollapse={(collapsed, type) => {
    }}
  >
    <div className="logo" >

    </div>
    
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
      <Menu.Item key="1" icon={<DashboardOutlined />}>
      <Link to="/home">Home</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<PlusOutlined />}>
      <Link to="/create-task">Create Task</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<DatabaseOutlined />}>
      <Link to="/manager-task">Manager Task</Link>
      </Menu.Item>

      <Menu.Item key="4" icon={<PieChartTwoTone />}>
      <Link to="/manager-time">Manager Time</Link>
      </Menu.Item>
      
      <Menu.Item key="5" icon={<FundTwoTone />}>
      <Link to="/analytics-task">Analytic Task</Link>
      </Menu.Item>

      <Menu.Item key="6" icon={<UserOutlined />}>
      <Link to="/register">Register</Link>
      </Menu.Item>

      <Menu.Item key="7" icon={<IeOutlined />}>
      <Link to="/vocabulary">Vocabulary Building</Link>
      </Menu.Item>
      </Menu>
  </Sider>
}

export default MenuComponent
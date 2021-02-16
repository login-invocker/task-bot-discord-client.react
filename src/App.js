import React, { useContext, createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Link,
  useHistory,
} from "react-router-dom";
import { Layout, Menu} from 'antd';
import RouteConfig from './config/router'
import { UserOutlined, PlusOutlined, DatabaseOutlined, FundTwoTone, PieChartTwoTone } from '@ant-design/icons';
import './App.css'
const { Header, Content, Footer, Sider } = Layout;
export const authContext = createContext();

function useAuth() {
  return useContext(authContext);
}

const App = () =>{
  return <>
  <ProvideAuth>
    <Layout>
      <Router>      
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
          }}
          onCollapse={(collapsed, type) => {
          }}
        >
          <div className="logo" >
          <AuthButton />

          </div>
          
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/login">Login</Link>
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

            </Menu>
        </Sider>
        <Layout>
          <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
          <Content style={{ margin: '24px 16px 0' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            
            <RouteConfig /> 

            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED - Tạo bởi Dang Thanh Tung</Footer>
        </Layout>
      </Router>
    </Layout>
  </ProvideAuth>
</>
}
export default App;


const fakeAuth = {
  isAuthenticated: false,
  signin(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = cb => {
    return fakeAuth.signin(() => {
      setUser("user");
      cb();
    });
  };

  const signout = cb => {
    return fakeAuth.signout(() => {
      setUser(null);
      cb();
    });
  };

  return {
    user,
    signin,
    signout
  };
}

function AuthButton() {
  let history = useHistory();
  let auth = useAuth();

  return auth.user ? (
    <p>
      Welcome!{" "}
      <button
        onClick={() => {
          auth.signout(() => history.push("/"));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  );
}
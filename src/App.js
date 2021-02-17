import React, { useContext, createContext, useState } from "react";
import {
  BrowserRouter as Router,
  useHistory,
} from "react-router-dom";
import { Layout} from 'antd';
import RouteConfig from './config/router'
import MenuComponent from './Components/navBar.component'
import './App.css'
import Wellcome from "./pages/well-come-page"
const { Header, Content, Footer } = Layout;
export const authContext = createContext();

function useAuth() {
  return useContext(authContext);
}

const layout = <Layout>
<Router>
   <MenuComponent />
  <Layout>
    <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
    <Content style={{ margin: '24px 16px 0' }}>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
      
      <RouteConfig /> 

      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Created by Dang Thanh Tung</Footer>
  </Layout>
</Router>
</Layout>
const App = () =>{
  return <>
  <ProvideAuth>
  {/* <AuthButton /> */}

    <authContext.Consumer>
      {value=> {
        if(value.user){
          return layout
        }else{
          return <Wellcome />
        }
      }}
    </authContext.Consumer>
    
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
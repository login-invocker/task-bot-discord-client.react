import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  useHistory,
  useLocation
} from "react-router-dom";
import { Form, Input, Button } from 'antd';
import {authContext} from '../App'
import {loginService} from '../services/user-service'
import Notification from "../Components/nofication-component";
// import HeaderPage from '../Components/header-pages'

function useAuth() {
  return useContext(authContext);
}

const LoginPages = () =>{
  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();

  let { from } = location.state || { from: { pathname: "/" } };
  let login = () => {
    auth.signin(() => {
      history.replace(from);
    });
  };

  const onFinish = async (values) => {
    const responseData =  await loginService(values)
    if(responseData.status !== 201)
    {
      Notification({
        type: "success",
        message: "Chào mừng đến với You Task!"
      })
      return login()
    }
    else{
      Notification({
        type: "error",
        message: responseData.data.message
      })
      
    }
  };

  const onFinishFailed = (errorInfo) => {
  };

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="User Name"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your name',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your pass!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
    </div>
    );
}
export default LoginPages;

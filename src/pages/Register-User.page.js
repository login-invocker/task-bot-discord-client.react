import React from "react";
import {
  BrowserRouter as Router,
  useHistory,
} from "react-router-dom";
import { Form, Input, Button } from 'antd';
import {registerUserService} from '../services/user-service'
import HeaderPage from '../Components/header-pages'
import Notification from "../Components/nofication-component";



const RegisterPage = () =>{
  let history = useHistory();

  const onFinish = async (values) => {
    const dataRespone =await registerUserService(values)
    if(dataRespone.status === 201){
        Notification({
            type: "error",
            message: dataRespone.data.message
          })
    }else{
        Notification({
            type: "success",
            message: "Tạo tài khoản thành công!"
          })

        history.push('/login')
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
        <HeaderPage onback="null" title="Register account"/>

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
            message: 'Please input your pass!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="First name"
        name="firstName"
        rules={[
          {
            message: 'Please input your pass!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="last name"
        name="lastName"
        rules={[
          {
            message: 'Please input your lastName!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            message: 'Please input your email!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="cellphone"
        name="cellphone"
        rules={[
          {
            message: 'Please input your cellphone!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="birthday"
        name="birthday"
        rules={[
          {
            message: 'Please input your birthday!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Address"
        name="address"
        rules={[
          {
            message: 'Please input your birthday!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
    </div>
    );
}
export default RegisterPage;

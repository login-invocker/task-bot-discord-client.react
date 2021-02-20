import React from "react";
import { Form, Input, Button, Switch } from 'antd';
import Notification from '../../Components/nofication-component';
import { saveVocabulary } from '../../services/vocabulary-service'
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

const CreateTask = () =>{
    const onFinish = async (values) => {
        const isCreate = await saveVocabulary(values)
        if(isCreate)
        return Notification({
            type: "success",
            message: "Tạo từ vưng thành công"
          })
        else
        return Notification({
            type: "error",
            message: "Tạo từ vựng thất bại"
          })
      };
    
      const onFinishFailed = (errorInfo) => {
      };
  return <>
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
        label="English"
        name="english"
        rules={[
          {
            required: true,
            message: 'Please input your word englisg',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Vietnamess"
        name="vietnamese"
        rules={[
          {
            required: true,
            message: 'Please input your content!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="E.x"
        name="example"
        rules={[
          {
            required: true,
            message: 'Please input your content!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
</>
}
export default CreateTask;

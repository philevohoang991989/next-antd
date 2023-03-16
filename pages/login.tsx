import { authApi } from '@/api-client';
import { storageKeys } from "@/constants/storage-keys";
import { getCookies, getCookie, setCookie, removeCookies } from 'cookies-next';
import { EmptyLayout } from '@/components/layout';
import { Button, Form, Input } from 'antd';
import { useEffect } from 'react';

export default function Login () {
  const onFinish = async (values: any) => {
    console.log("Success:", values);
    const datalogin: any  = await authApi.login(values)
    setCookie(storageKeys.accessToken, datalogin.accessToken );
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <main>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

       

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </main>
  );
}

Login.Layout = EmptyLayout
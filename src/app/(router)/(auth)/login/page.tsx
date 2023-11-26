"use client";
import regex from "@/constants/regex";
import { Button, Form, Input, message } from "antd";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function Login() {
  const router = useRouter();
  const handleSubmit = async (values: any) => {
    const signInData = await signIn("credentials", {
      username: values.username,
      password: values.password,
      redirect: false,
    });

    if (signInData?.error) {
      message.error("Oops! Something when wrong!");
    } else {
      router.push("/");
    }
  };

  return (
    <div>
      <Form onFinish={handleSubmit}>
        <Form.Item
          name="username"
          rules={[
            {
              pattern: regex.email,
              message: "Incorrect mail format!",
            },
          ]}
        >
          <Input type="text" />
        </Form.Item>
        <Form.Item name="password">
          <Input.Password />
        </Form.Item>
        <Button htmlType="submit">Sign in</Button>
      </Form>
    </div>
  );
}

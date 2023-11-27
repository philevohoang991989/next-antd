"use client";
import regex from "@/constants/regex";
import { Button, Form, Input, message } from "antd";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import styles from '../styles.module.scss'

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
    <main className={styles.wapperPage}>
      <Form onFinish={handleSubmit} layout="vertical" className={styles.wapperForm}>
        <Form.Item
          name="username"
          label='Username'
          rules={[
            {
              pattern: regex.email,
              message: "Incorrect mail format!",
            },
          ]}
        >
          <Input type="text" />
        </Form.Item>
        <Form.Item name="password" label='Password'>
          <Input.Password />
        </Form.Item>
        <Button htmlType="submit">Sign in</Button>
      </Form>
    </main>
  );
}

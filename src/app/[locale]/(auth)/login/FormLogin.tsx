/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import useApiAuth from "@/lib/hook/useAxiosAuth";
import { Form, FormProps, Input, Button } from "antd";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { useState } from "react";

import Logo from "@/assets/logo_black.png";
interface Props{
    setIsOtp?:(value: boolean)=> void
}

export default function LoginForm({setIsOtp}: Props) {
  const router = useRouter();
  const [cookie, setCookie] = useCookies(["userId"]);
  const axiosAuth = useApiAuth();
  const [isLoading, setIsLoading] = useState(false);
  type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {

    console.log({values});
    
    setIsLoading(true);
    // signIn("credentials", {
    //     username: values.username,
    //     password: values.password,
    //     redirect: false,
    // }).then((result) => {
    //     if (result?.error) {
    //         console.log("error");
    //     } else {
    //         setIsLoading(false)
    //         router.push("/");
    //     }
    // });
     axiosAuth
      .post("Authentication/login", {
        userName: btoa(values?.username || ""),
        password: btoa(values?.password || ""),
      })
      .then((res) => {
        setCookie("userId", res.data);
        axiosAuth.post(`Authentication/otp?userId=${res.data}`, {});
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        typeof setIsOtp === "function" && setIsOtp(true)
      });
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="basic"
      layout="vertical"
      className="border text-card-foreground w-[31rem] bg-white rounded-[1.6rem] wrapper-login"
      style={{ boxShadow: "0 4px 20px rgba(0,0,0,.15)" }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div className="px-4 py-16">
        <div className="flex-col p-6 flex justify-center items-center space-y-1">
          <Image src={Logo} alt="logo" priority />
        </div>
        <Form.Item<FieldType>
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="Tên đăng nhập" />
        </Form.Item>

        <Form.Item<FieldType>
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Mật khẩu" />
        </Form.Item>

        <Button
          type="primary"
          className="w-[100%] mt-4"
          htmlType="submit"
          loading={isLoading}
          iconPosition="start"
        >
          Submit
        </Button>
      </div>
    </Form>
  );
}

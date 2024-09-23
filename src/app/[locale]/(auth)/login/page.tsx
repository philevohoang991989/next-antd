"use client";

import {useRouter} from "next/navigation";
import {signIn} from "next-auth/react";
import {Form, FormProps, Input, Button} from "antd";
import Logo from "@/assets/logo_black.png"
import Image from "next/image";
import { useState } from "react";

export default function Login() {
    const router = useRouter();
    const [isLoading, setIsLoading]= useState(false)
    type FieldType = {
        username?: string;
        password?: string;
        remember?: string;
    };

    const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
        console.log("Success:", values);
        setIsLoading(true)
        signIn("credentials", {
            username: values.username,
            password: values.password,
            redirect: false,
        }).then((result) => {
            if (result?.error) {
                console.log("error");
            } else {
                setIsLoading(false)
                router.push("/");
            }
        });
    };

    const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
        errorInfo
    ) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div className="flex justify-center items-center w-[100%] h-[100vh] ">
            <Form
                name="basic"
                layout="vertical"
                className="border text-card-foreground w-[31rem] bg-white rounded-[1.6rem] wrapper-login"
                style={{boxShadow:"0 4px 20px rgba(0,0,0,.15)"}}
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
                        rules={[{required: true, message: "Please input your username!"}]}
                    >
                        <Input placeholder="Tên đăng nhập"/>
                    </Form.Item>

                    <Form.Item<FieldType>
                        name="password"
                        rules={[{required: true, message: "Please input your password!"}]}
                    >
                        <Input.Password placeholder="Mật khẩu"/>
                    </Form.Item>

                    <Button type="primary" className="w-[100%] mt-4" htmlType="submit" loading={isLoading} iconPosition='start'>
                        Submit
                    </Button>
                </div>
            </Form>
        </div>
    );
}

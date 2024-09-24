import { Button, Form, FormProps, Input } from "antd";
import Image from "next/image";
import { useState } from "react";
import Logo from "@/assets/logo_black.png";
// import type { GetProps } from "antd";
import { regexValidateNumber } from "@/constants";
import { signIn, SignInResponse } from "next-auth/react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
// type OTPProps = GetProps<typeof Input.OTP>;
export default function OtpForm() {
  type FieldType = {
    otp?: number;
  };
  const [isLoading, setIsLoading] = useState(false);
  const locale = useLocale();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookie, setCookie] = useCookies(["userId"]);
  const router = useRouter();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log({ values });

    setIsLoading(true);

    try {
        const dataSignIn: SignInResponse | undefined = await signIn("credentials", {
          otp: values.otp,
          userId: cookie.userId,
          redirect: false,
        });
    
        if (dataSignIn && dataSignIn?.url) {
          // Handle the successful sign-in response here
          console.log(dataSignIn);
          router.push("/admin" + locale);
        }
      } catch (error) {
        // Handle any error that occurs during the sign-in process
        console.error("Error signing in:", error);
      }
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
          className="flex justify-center"
          label='OTP'
          name="otp"
          rules={[
            { required: true, message: "Please input otp!" },
            {
              pattern: regexValidateNumber,
              message: 'OTP là số',
            },
          ]}
        >
          <Input.OTP />
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

"use client";

import { useState } from "react";
import OtpForm from "./FormOtp";
import LoginForm from "./FormLogin";

export default function Login() {
  const [isOtp, setIsOtp] = useState<boolean>(false);

  return (
    <div className="flex justify-center items-center w-[100%] h-[100vh] ">
      {isOtp ? (
        <OtpForm />
      ) : (
        <LoginForm setIsOtp={(value: boolean) => setIsOtp(value)} />
      )}
    </div>
  );
}

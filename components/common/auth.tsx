import { storageKeys } from "@/constants/storage-keys";
import { Spin } from "antd";
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export interface AuthProps {
  children: any
}

export function Auth({ children }: AuthProps) {
  const router = useRouter()
  let token = getCookie(storageKeys.accessToken)

  useEffect(() => {
    if (!token) router.push('/login')
  }, [router, token])

  return <div>{!token? <Spin size="large" style={{position:'absolute', top:'50%',left:'50%'}}/>:children}</div>
}
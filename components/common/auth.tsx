import { useAuth } from '@/hooks'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export interface AuthProps {
  children: any
}

export function Auth({ children }: AuthProps) {
  const router = useRouter()
  const [userProfile, setUserProfile] = useState({})
  const { profile, firstLoading } = useAuth()
  console.log({ profile })

  useEffect(() => {
    if (!firstLoading && !profile?.username) router.push('/login')
  }, [router, profile, firstLoading])

  if (!profile?.username) return <p>Loading...</p>

  return <div>{children}</div>
}
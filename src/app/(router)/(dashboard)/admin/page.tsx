'use client'

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axiosInstance, { setAuthToken } from '@/utils/axios';

export default function AdminPage () {
  const session = useSession();
  const [data, setData] = useState(null);
  console.log({ accessToken: session });
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session && session.data && session.data.token) {
          // Set the authentication token before making the request
          setAuthToken(session.data?.token);
          const response = await axiosInstance.get('/user/me');
          setData(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [session]);
  console.log({data});
  
  return (
    <div>
      Admin Page
     
    </div>
  );
}

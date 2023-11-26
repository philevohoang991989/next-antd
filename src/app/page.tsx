"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axiosInstance, { setAuthToken } from "@/utils/axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const session = useSession();
  const [data, setData] = useState<any>();
  const router = useRouter();
  console.log({ accessToken: session });
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session && session.data && session.data.token) {
          // Set the authentication token before making the request
          setAuthToken(session.data?.token);
          const response = await axiosInstance.get("/user/me");
          setData(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [session]);
  useEffect(() => {
    if (data?.roleId === 1) {
      router.push("/usage");
    } else {
      router.push("/request-ocr");
    }
  }, [data,router]);
  return (
    <main className={styles.main}>
    </main>
  );
}

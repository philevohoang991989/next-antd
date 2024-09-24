'use client'
import { DashboardOutlined, UserOutlined } from "@ant-design/icons";
import { Card } from "antd";
import {useRouter} from "next/navigation";

export default function HomePage() {
  // const t = useTranslations("HomePage");
    const router = useRouter();
  const { Meta } = Card;
  return (
    <div className="flex justify-center items-center w-[100%] h-[100vh]">
      <div className="border text-card-foreground w-[31rem] bg-white rounded-[1.6rem] p-8 shadow-lg ">
        <h1 className="text-[1.5rem] mb-4 font-bold">Portal Selection</h1>
        <div className="flex gap-6 justify-center">
          <Card
            hoverable
            style={{ width: 240,padding:'1rem', textAlign:'center' }}
            cover={
              <DashboardOutlined
                style={{ fontSize: "3rem", color: "#0D85A8" }}
              />
            }
            onClick={()=>router.push("/admin")}
          >
            <Meta title="Admin" description="" />
          </Card>
          <Card
            hoverable
            style={{ width: 240, padding:'1rem',textAlign:'center'  }}
            cover={
              <UserOutlined style={{ fontSize: "3rem", color: "#0D85A8" }} />
            }
          ><Meta title="User" description="" /></Card>
        </div>
      </div>
    </div>
  );
}

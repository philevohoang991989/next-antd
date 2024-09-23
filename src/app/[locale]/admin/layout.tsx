"use client";
import { Layout, Menu, MenuProps } from "antd";
import { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
        style={{height: "100%"}}
          onClick={onClick}
          defaultSelectedKeys={["8"]}
          defaultOpenKeys={["Team 2"]}
          mode="inline"
          items={items}
        />
      </Sider>
      {children}
    </Layout>
  );
}

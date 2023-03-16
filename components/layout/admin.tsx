import { LayoutProps } from "@/models";
import { Layout, Space } from "antd";
import Link from "next/link";
import { Auth } from "../common";
import styles from "./styles.module.scss";
// import { Auth } from '../common'

export function AdminLayout({ children }: LayoutProps) {
  const { Header, Footer, Sider, Content } = Layout;
  //   const router = useRouter()
  //   const { logout, profile } = useAuth()
  //   async function handleLogoutClick() {
  //     try {
  //       await logout()
  //       console.log('redirect to login page')
  //       router.push('/login')
  //     } catch (error) {
  //       console.log('failed to logout', error)
  //     }
  //   }
  return (
    <Auth>
      <Layout className={styles.layoutStyle}>
        <Sider className={styles.siderStyle}>Sider</Sider>
        <Layout>
          <Header className={styles.headerStyle}>Header</Header>
          <Content className={styles.contentStyle}>{children}</Content>
          <Footer className={styles.footerStyle}>Footer</Footer>
        </Layout>
      </Layout>
    </Auth>
  );
}

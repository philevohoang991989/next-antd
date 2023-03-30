import { LayoutProps, MenuListType } from '@/models'
import { Layout, Menu } from 'antd'
import { FieldTimeOutlined } from '@ant-design/icons'
import { find } from 'lodash'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { Auth } from '../common'
import styles from './styles.module.scss'
import Link from 'next/link'

export function AdminLayout({ children }: LayoutProps) {
  const nodeRef = useRef(null)
  const { Header, Footer, Sider, Content } = Layout
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [currentMenu, setCurrentMenu] = useState<MenuListType[]>([])
  const router = useRouter()
  // console.log({ router })
  useEffect(() => {
    const parentRoute = `/${router.pathname.split('/')[1]}`
    console.log({ parentRoute })
  }, [router])
  const menuList = [
    {
      key: '1',
      href: '/',
      linkText: `Home`,
      icon: <FieldTimeOutlined />
    },
    {
      key: '2',
      href: '/about',
      linkText: `About`,
      icon: <FieldTimeOutlined />
    }
  ]
  useEffect(() => {
    const menu = menuList
    const dataMerged: any = []

    menu.map((item) => {
      return dataMerged.push({
        label: (
          <Link href={item.href} className={styles.menuItem}>
            {item.linkText}
          </Link>
        ),
        href: item.href,
        key: item.key,
        icon: item.icon
      })
    })

    setCurrentMenu(dataMerged)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    const parentRoute = `/${router.pathname.split('/')[1]}`
    const routeFound = find(currentMenu, { href: parentRoute })

    if (routeFound) {
      setSelectedKeys([routeFound.key])
    } else {
      setSelectedKeys([])
    }
  }, [currentMenu, router])

  return (
    <Auth>
      <Layout className={styles.layoutStyle}>
        <Sider className={styles.siderStyle}>
          <Menu
            ref={nodeRef}
            selectedKeys={selectedKeys}
            className={styles.menu}
            items={currentMenu}
          />
        </Sider>
        <Layout>
          <Header className={styles.headerStyle}>Header</Header>
          <React.StrictMode>
            <Content className={styles.contentStyle}>{children}</Content>
          </React.StrictMode>
          <Footer className={styles.footerStyle}>Footer</Footer>
        </Layout>
      </Layout>
    </Auth>
  )
}

import { AdminLayout } from '@/components/layout'
import { Button } from 'antd'
import styles from './styles.module.scss'
export default function AboutPage() {
  return (
    <main className={styles.about}>
      <h1>About</h1>
      <Button>submit</Button>
    </main>
  )
}
AboutPage.Layout = AdminLayout

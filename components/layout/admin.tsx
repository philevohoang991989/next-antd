import { LayoutProps } from '@/models'
import Link from 'next/link'
// import { Auth } from '../common'

export function AdminLayout({ children }: LayoutProps) {
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
    <div>
      <h1>Admin Layout</h1>
      <div>Sidebar</div>

      {/* <p>Profile: {JSON.stringify(profile || {}, null, 4)}</p>

      <button onClick={handleLogoutClick}>Logout</button> */}
      <Link href='/'>Home</Link>
      <Link href='/about'>About</Link>
      <div>{children}</div>
    </div>
  )
}
import { NavBar } from '@/components/navbar'

export default function DashboardLayout({ children }) {
  return (
    <main className='p-14'>
      <NavBar />
      {children}
    </main>
  )
}

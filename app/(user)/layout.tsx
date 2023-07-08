import { NavBar } from '@/components/navbar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className='p-14'>
      <NavBar />
      {children}
    </main>
  )
}

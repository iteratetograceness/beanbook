import { NavBar } from '@/components/navbar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className='flex flex-col gap-5 p-14'>
      <NavBar />
      {children}
    </main>
  )
}

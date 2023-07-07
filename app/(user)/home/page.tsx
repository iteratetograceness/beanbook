import { UserButton } from '@clerk/nextjs'

export default function Home() {
  return (
    <div>
      <UserButton afterSignOutUrl='/signin' />
    </div>
  )
}

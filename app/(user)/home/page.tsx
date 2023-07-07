import { UserButton } from '@clerk/nextjs'

export default function UserHome() {
  return (
    <div>
      <UserButton afterSignOutUrl='/signin' />
    </div>
  )
}

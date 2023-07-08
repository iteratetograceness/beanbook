import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='flex w-screen h-screen justify-center items-center py-12'>
      <SignIn />
    </div>
  )
}

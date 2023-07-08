import { Home, PlusCircle } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from './ui/button'

export async function NavBar() {
  return (
    <nav className='flex w-full bg-accent p-3 rounded-xl justify-between'>
      <div className='flex items-center gap-3'>
        <Button size='icon' variant='secondary' asChild>
          <Link href='/home'>
            <Home aria-label='Return to home' />
          </Link>
        </Button>
      </div>

      <div className='flex items-center gap-3'>
        <Button size='icon' variant='secondary' asChild>
          <Link href='/new'>
            <PlusCircle aria-label='Add new entry' />
          </Link>
        </Button>
        <div className='h-10 w-10 bg-primary rounded-full'>
          <UserButton afterSignOutUrl='/signin' />
        </div>
      </div>
    </nav>
  )
}

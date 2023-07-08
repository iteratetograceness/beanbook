import { Home, PlusCircle } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from './ui/button'

const LINKS = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/about', label: 'Landing Page' },
]
export function NavBar() {
  return (
    <nav className='flex w-full bg-accent p-3 rounded-xl justify-between'>
      <div className='flex items-center gap-3'>
        <Button size='icon' variant='secondary' asChild>
          <Link href='/home'>
            <Home aria-label='Return to home' />
          </Link>
        </Button>
        <input
          placeholder='Search your sips...'
          className='bg-muted p-2 rounded-lg'
        />
      </div>

      <div className='flex items-center gap-3'>
        <Button size='icon' variant='secondary' asChild>
          <Link href='/new'>
            <PlusCircle aria-label='Add new entry' />
          </Link>
        </Button>
        <UserButton afterSignOutUrl='/signin' />
      </div>
    </nav>
  )
}

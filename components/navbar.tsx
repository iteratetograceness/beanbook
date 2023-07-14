'use client'

import { Plus } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from './ui/button'
import { AnimatedLogo } from './animation/logo'
import { motion } from 'framer-motion'

export function NavBar() {
  return (
    <nav className='flex w-full bg-card p-3 rounded-xl justify-between'>
      <div className='flex items-center gap-3'>
        <Button size='sm' variant='link' asChild>
          <Link className='hover:no-underline' passHref href='/home'>
            <motion.div
              className='flex items-center gap-2'
              whileHover={{ scale: 0.95 }}
            >
              <AnimatedLogo className='pt-1' width={35} delay={0} />
              <h1 className='font-semibold text-lg'>sips</h1>
            </motion.div>
          </Link>
        </Button>
      </div>

      <div className='flex items-center gap-3'>
        <Button size='icon' variant='secondary' asChild>
          <Link passHref href='/new' className='flex gap-2'>
            <Plus aria-label='Add new entry' />
          </Link>
        </Button>
        <div className='h-10 w-10 bg-primary rounded-full'>
          <UserButton afterSignOutUrl='/signin' />
        </div>
      </div>
    </nav>
  )
}

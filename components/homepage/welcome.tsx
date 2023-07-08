'use client'

import { motion, easeIn } from 'framer-motion'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { AnimatedLogo } from '../animation/logo'
import { Button } from '../ui/button'
import Link from 'next/link'

const enter = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      opacity: { duration: 0.3 },
      y: { type: 'spring', damping: 20, stiffness: 60, duration: 0.3 },
    },
  },
  exit: {
    opacity: 0,
    y: 80,
    transition: {
      opacity: { duration: 0.3 },
      y: { type: 'spring', damping: 20, stiffness: 60, duration: 0.3 },
    },
  },
}

const BULLET_POINTS = [
  {
    title: 'Track your beans',
    description: 'Record your favorite coffee beans and roasters',
  },
  {
    title: 'Rate your brews',
    description: 'Evaluate your brewing techniques and equipment',
  },
  {
    title: 'Capture your tastes',
    description: 'Take note of intricate details about your preferences ',
  },
]

const buttonContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.3,
    },
  },
}
const button = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0 },
}

export function WelcomeCard() {
  return (
    <motion.div
      className='w-11/12 sm:w-auto'
      initial='hidden'
      animate='visible'
      exit='exit'
      variants={enter}
      onAnimationComplete={() => console.log('done!')}
    >
      <Card>
        <CardHeader>
          <AnimatedLogo className='mb-4 self-end' delay={0.3} />
          <CardTitle>Sips</CardTitle>
          <CardDescription>A simple coffee tasting journal</CardDescription>
        </CardHeader>
        <CardContent>
          {BULLET_POINTS.map(({ title, description }, i) => (
            <div
              key={i}
              className='mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0'
            >
              <span className='flex h-2 w-2 translate-y-1 rounded-full bg-muted-foreground' />
              <div className='space-y-1'>
                <p className='text-sm font-medium leading-none'>{title}</p>
                <p className='text-sm text-muted-foreground'>{description}</p>
              </div>
            </div>
          ))}
          <motion.div
            initial='hidden'
            animate='show'
            className='flex gap-2'
            variants={buttonContainer}
          >
            <motion.div className='w-1/2' variants={button}>
              <Button asChild className='w-full'>
                <Link href='/signin'>Sign In</Link>
              </Button>
            </motion.div>
            <motion.div className='w-1/2' variants={button}>
              <Button asChild className='w-full' variant='secondary'>
                <Link href='/signup'>Sign Up</Link>
              </Button>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

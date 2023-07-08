'use client'

import { THEME } from '@/lib/constants'
import { motion } from 'framer-motion'

const draw = (d = 0) => ({
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => {
    const delay = d + i * 0.6
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          delay,
          ease: 'easeInOut',
          type: 'spring',
          stiffness: 50,
          duration: 0.5,
        },
        opacity: { delay, duration: 0.25 },
      },
    }
  },
})

export function AnimatedLogo({
  className = '',
  width = 50,
  height = 45,
  delay = 0,
}) {
  return (
    <motion.svg
      className={className}
      width={width}
      height={height}
      shapeRendering='geometricPrecision'
      textRendering='geometricPrecision'
      viewBox='42.98 122.13 425.37 255.73'
      initial='hidden'
      animate='visible'
    >
      <g transform='translate(-60.365233 97.756646)'>
        <motion.path
          d='M375.9486,100.929454c0,0-300.363785-3.43928-300.363785-3.43928s0,71.435887,0,117.980779c0,116.087148,100.641984,112.743041,100.641984,112.743041q0,0,100.458771,0c0,0,100.208274,0,99.26303-112.743041-.67008-79.923135,0-114.541499,0-114.541499Z'
          transform='translate(40.256115-60.613692)'
          fill='none'
          stroke={THEME.colors.primary}
          strokeWidth='25'
          strokeLinecap='round'
          strokeLinejoin='round'
          variants={draw(delay)}
          custom={1}
        />
        <motion.path
          d='M-50,0c0-27.614237,22.385763-50,50-50s50,22.385763,50,50-22.385763,50-50,50-50-22.385763-50-50Z'
          transform='translate(466.209545 123.958955)'
          fill='none'
          stroke={THEME.colors.primary}
          strokeWidth='25'
          strokeLinecap='round'
          strokeLinejoin='round'
          variants={draw(delay)}
          custom={2}
        />
        {/* </m.g> */}
      </g>
    </motion.svg>
  )
}

'use client'

import { InfoIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'
import { Card } from '../ui/card'

const steps = [
  {
    title: 'The Reset',
    description:
      'We always recommend beginning with a glass of water to cleanse your palate.',
  },
  {
    title: 'The Sniff',
    description:
      'Before even tasting the coffee, take a moment to smell it. Search for the aromas that fill your nose. Remember, there are no wrong answers, only interesting noses.',
  },
  {
    title: 'The Cool Down',
    description:
      'Let your coffee cool down to a comfortable temperature. Drinking piping hot coffee will decrease the receptiveness of your taste buds.',
  },
  {
    title: 'The Acid Trip',
    description:
      'Acidity, also known as brightness, is the tartness of the coffee - the zing! It does not refer to pH level. Acidity is sensed on the sides or tip of your tongue, sometimes the back of your jawbone. Coffees with high acidity are often described as tangy and crisp, while ones with low acidity are know to be smooth and mellow.',
  },
  {
    title: 'The Body Yadi',
    description:
      'Body is more about how the coffee feels in your mouth and against your palate. From thin and watery to full and creamy, body describes the weight of your coffee.',
  },
  {
    title: 'The Taste',
    description:
      'Let the coffee linger in your mouth. What are the main, dominant flavor notes? What does it remind you of? Start broad - like fruity, nutty, or bitter - then get more specific. Is it more citrusy or berry-like?',
  },
  {
    title: 'The Finish Line',
    description:
      'After swallowing the coffee, what is the aftertaste? Does it linger? Is it sweet or bitter?',
  },
  {
    title: 'The Final Words',
    description:
      "Lastly, note down any other observations. Again, there are no wrong answers during any step. Be poetic, philosophical, or absolutely ridiculous. It's your coffee, after all.",
  },
] as const

export function TastingGuide() {
  const [step, setStep] = useState(0)

  return (
    <Sheet onOpenChange={() => setStep(0)}>
      <SheetTrigger className='inline-flex gap-1 w-fit items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2'>
        <InfoIcon className='h-4 w-4' />
        Coffee Tasting Guide
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{"Sip's guide to tasting coffee"}</SheetTitle>
          <p className='text-sm'>
            Coffee tasting can feel overwhelming. Use this 8-step guide to help
            you get started.
          </p>
          <div className='flex gap-1 py-4'>
            {steps.map((_, i) => (
              <Badge
                key={i}
                variant={step === i ? 'secondary' : 'default'}
                onClick={() => setStep(i)}
              >
                {i + 1}
              </Badge>
            ))}
          </div>
        </SheetHeader>
        <SheetDescription className='flex flex-col gap-2'>
          <h2 className='text-lg'>{steps[step].title}</h2>
          <Card className='p-4 h-56'>
            <p>{steps[step].description}</p>
          </Card>
          <div className='flex justify-between mt-4'>
            <Button
              disabled={step === 0}
              onClick={() => setStep((prev) => prev - 1)}
            >
              Back
            </Button>
            <Button
              disabled={step === 7}
              onClick={() => setStep((prev) => prev + 1)}
            >
              Next
            </Button>
          </div>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  )
}

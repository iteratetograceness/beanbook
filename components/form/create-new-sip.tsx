'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { sipSchema } from '@/lib/schemas'
import { useState } from 'react'
import { Info } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'

export function CreateNewSip() {
  const [step, setStep] = useState(0)
  const form = useForm<z.infer<typeof sipSchema>>({
    resolver: zodResolver(sipSchema),
    defaultValues: {
      name: '',
      rating: 0,
    },
  })

  function onSubmit(values: z.infer<typeof sipSchema>) {
    console.log(values)
  }

  /**
   * TODO:
   * - [ ] Add rating component
   * - [ ] Replace Date Picker
   */

  return (
    <TooltipProvider delayDuration={0}>
      <Form {...form}>
        <form
          className='flex flex-col gap-4'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {step === 0 ? (
            <>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Coffee Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Colombia Honey' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p>placeholder for rating</p>
              <div className='flex gap-4 flex-col sm:flex-row'>
                <Tooltip>
                  <FormField
                    control={form.control}
                    name='origin'
                    render={({ field }) => (
                      <FormItem>
                        <TooltipTrigger>
                          <FormLabel className='flex items-center gap-1'>
                            Origin(s)
                            <Info size={16} />
                          </FormLabel>
                        </TooltipTrigger>
                        <FormControl>
                          <Input placeholder='Colombia' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <TooltipContent
                    className='shadow-none border-ring'
                    side='right'
                  >
                    <p>Where the beans were grown and processed</p>
                  </TooltipContent>
                </Tooltip>
                <FormField
                  control={form.control}
                  name='price'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='19.99'
                          type='number'
                          {...form.register('price', { valueAsNumber: true })}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='roast_date'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Roast Date</FormLabel>
                      <FormControl>
                        <Input {...field} type='date' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='roaster'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Roaster</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='Counter Culture'
                          type='string'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Tooltip>
                <FormField
                  control={form.control}
                  name='origin'
                  render={({ field }) => (
                    <FormItem>
                      <TooltipTrigger>
                        <FormLabel className='flex items-center gap-1'>
                          Roast
                          <Info size={16} />
                        </FormLabel>
                      </TooltipTrigger>
                      <FormControl>
                        <RadioGroup defaultValue='medium'>
                          <div className='flex items-center space-x-2'>
                            <RadioGroupItem value='light' id='r1' />
                            <Label htmlFor='r1'>Light</Label>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <RadioGroupItem value='medium' id='r2' />
                            <Label htmlFor='r2'>Medium</Label>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <RadioGroupItem value='dark' id='r3' />
                            <Label htmlFor='r3'>Compact</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <TooltipContent
                  className='shadow-none border-ring'
                  side='right'
                >
                  <p>
                    <b>Light:</b> Milder taste, higher levels of acidity and
                    caffeine.
                  </p>
                  <p>
                    <b>Medium:</b> Darker color, richer and more balanced
                    profile.
                  </p>
                  <p>
                    <b>Dark:</b> Deep color, bolder flavor profile, less acidity
                    and caffeine.
                  </p>
                </TooltipContent>
              </Tooltip>
            </>
          ) : null}

          {step === 2 ? (
            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='19.99'
                      type='number'
                      {...form.register('price', { valueAsNumber: true })}
                    />
                  </FormControl>
                  <FormDescription>
                    This is the origin of the coffee.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : null}
          {step > 0 ? (
            <Button onClick={() => setStep((step) => step - 1)}>Back</Button>
          ) : null}
          {step < 2 ? (
            <Button onClick={() => setStep((step) => step + 1)}>Next</Button>
          ) : (
            <Button type='submit'>Submit</Button>
          )}
        </form>
      </Form>
    </TooltipProvider>
  )
}

'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  ACIDITY,
  BODY,
  COMMON_ADJECTIVES,
  FINISH,
  SipSchema,
  sipSchema,
} from '@/lib/schemas'
import { Info } from 'lucide-react'
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover'
import { cn } from '@/lib/utils'
import { Calendar } from '../ui/calendar'
import { MultiSelect } from './multi-select'
import { BREW_METHOD } from '@/lib/schemas'
import { Textarea } from '../ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useUser } from '@clerk/nextjs'
import { createSip } from '@/lib/actions'
import { useRouter } from 'next/navigation'

export function CreateNewSip() {
  const { user } = useUser()
  const router = useRouter()
  const sipForm = useForm<SipSchema>({
    resolver: zodResolver(sipSchema),
    defaultValues: {
      name: '',
      rating: 0,
      brew_method: [],
      aroma: [],
      acidity: [],
      body: [],
      taste: [],
      finish: [],
    },
  })

  async function onSubmit(values: SipSchema) {
    if (!user) return

    try {
      const id = await createSip({ form: values, userId: user.id })
      sipForm.reset()
      router.push(`/entry/${id}`)
    } catch (error) {
      console.log('ERROR')
      sipForm.setError('root.serverError', {
        type: '500',
      })
      console.log(sipForm.formState)
    }
  }

  return (
    <TooltipProvider delayDuration={0}>
      {/* @ts-ignore -- Investigate: "Type instantiation is excessively deep and possibly infinite."*/}
      <Form {...sipForm}>
        <form
          className='flex flex-col gap-4'
          onSubmit={sipForm.handleSubmit(onSubmit)}
        >
          {/* Name and Price */}
          <div className='flex gap-4 flex-col sm:flex-row'>
            {/* Name */}
            <FormField
              control={sipForm.control}
              name='name'
              render={({ field }) => (
                <FormItem className='flex-1 max-w-lg'>
                  <FormLabel>Coffee Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Colombia Honey' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Price */}
            <FormField
              control={sipForm.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='19.99'
                      type='number'
                      {...field}
                      {...sipForm.register('price', {
                        setValueAs: (v: string) =>
                          v === '' ? undefined : parseInt(v, 10),
                      })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Rating */}
          <p>RATING PLACEHOLDER</p>
          {/* Origin, Roaster, and Roast Date */}
          <div className='flex gap-4 flex-col sm:flex-row'>
            {/* Origin */}
            <Tooltip>
              <FormField
                control={sipForm.control}
                name='origin'
                render={({ field }) => (
                  <FormItem className='flex-1 sm:max-w-sm'>
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
              <TooltipContent className='shadow-none border-ring' side='right'>
                <p>Where the beans were grown and processed</p>
              </TooltipContent>
            </Tooltip>
            {/* Roaster */}
            <FormField
              control={sipForm.control}
              name='roaster'
              render={({ field }) => (
                <FormItem className='flex-1 sm:max-w-sm'>
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
            {/* Roast Date */}
            <FormField
              control={sipForm.control}
              name='roast_date'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='inline-block w-full'>
                    Roast Date
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Roast */}
          <Tooltip>
            <FormField
              control={sipForm.control}
              name='roast'
              render={({ field }) => (
                <FormItem>
                  <TooltipTrigger>
                    <FormLabel className='flex items-center gap-1'>
                      Roast
                      <Info size={16} />
                    </FormLabel>
                  </TooltipTrigger>
                  <Select onValueChange={field.onChange} defaultValue='medium'>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a roast' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='light'>Light</SelectItem>
                      <SelectItem value='medium'>Medium</SelectItem>
                      <SelectItem value='dark'>Dark</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <TooltipContent className='shadow-none border-ring' side='right'>
              <p>
                <b>Light:</b> Milder taste, higher levels of acidity and
                caffeine.
              </p>
              <p>
                <b>Medium:</b> Darker color, richer and more balanced profile.
              </p>
              <p>
                <b>Dark:</b> Deep color, bolder flavor profile, less acidity and
                caffeine.
              </p>
            </TooltipContent>
          </Tooltip>
          <Alert className='max-w-3xl'>
            <AlertTitle className='text-sm'>Note:</AlertTitle>
            <AlertDescription>
              Type to search <b>or</b> add your own descriptors for Brew Method,
              Aroma, Acidity, Body, Taste, and Finish.
            </AlertDescription>
          </Alert>
          {/* Brew Method and Aroma */}
          <div className='flex gap-4 flex-col sm:flex-row'>
            {/* Brew Method */}
            <Tooltip>
              <FormField
                control={sipForm.control}
                name='brew_method'
                render={({ field }) => (
                  <FormItem className='flex-1 sm:max-w-md'>
                    <TooltipTrigger>
                      <FormLabel className='flex items-center gap-1'>
                        Brew Method
                        <Info size={16} />
                      </FormLabel>
                    </TooltipTrigger>
                    <FormControl>
                      <MultiSelect
                        defaultValues={BREW_METHOD}
                        placeholder='Select or add your own brew method(s)'
                        onChange={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <TooltipContent className='shadow-none border-ring' side='right'>
                <p>How and/or with what equipment the coffee was prepared</p>
              </TooltipContent>
            </Tooltip>
            {/* Aroma */}
            <Tooltip>
              <FormField
                control={sipForm.control}
                name='aroma'
                render={({ field }) => (
                  <FormItem className='flex-1 sm:max-w-md'>
                    <TooltipTrigger>
                      <FormLabel className='flex items-center gap-1'>
                        Aroma
                        <Info size={16} />
                      </FormLabel>
                    </TooltipTrigger>
                    <FormControl>
                      <MultiSelect
                        defaultValues={COMMON_ADJECTIVES}
                        placeholder='Select or add your own aroma descriptor(s)'
                        onChange={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <TooltipContent className='shadow-none border-ring' side='right'>
                <p>The smell of the coffee</p>
              </TooltipContent>
            </Tooltip>
          </div>
          {/* Acidity and Body */}
          <div className='flex gap-4 flex-col sm:flex-row'>
            {/* Acidity */}
            <Tooltip>
              <FormField
                control={sipForm.control}
                name='acidity'
                render={({ field }) => (
                  <FormItem className='flex-1 sm:max-w-md'>
                    <TooltipTrigger>
                      <FormLabel className='flex items-center gap-1'>
                        Acidity
                        <Info size={16} />
                      </FormLabel>
                    </TooltipTrigger>
                    <FormControl>
                      <MultiSelect
                        defaultValues={ACIDITY}
                        placeholder='Select or add your own acidity descriptor(s)'
                        onChange={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <TooltipContent className='shadow-none border-ring' side='right'>
                <p>{'The sharp, bright flavors in a coffee'}</p>
              </TooltipContent>
            </Tooltip>
            {/* Body */}
            <Tooltip>
              <FormField
                control={sipForm.control}
                name='body'
                render={({ field }) => (
                  <FormItem className='flex-1 sm:max-w-md'>
                    <TooltipTrigger>
                      <FormLabel className='flex items-center gap-1'>
                        Body
                        <Info size={16} />
                      </FormLabel>
                    </TooltipTrigger>
                    <FormControl>
                      <MultiSelect
                        defaultValues={BODY}
                        placeholder='Select or add your own body descriptor(s)'
                        onChange={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <TooltipContent className='shadow-none border-ring' side='right'>
                <p>The texture or heaviness of the coffee</p>
              </TooltipContent>
            </Tooltip>
          </div>
          {/* Taste and Finish */}
          <div className='flex gap-4 flex-col sm:flex-row'>
            {/* Taste */}
            <Tooltip>
              <FormField
                control={sipForm.control}
                name='taste'
                render={({ field }) => (
                  <FormItem className='flex-1 sm:max-w-md'>
                    <TooltipTrigger>
                      <FormLabel className='flex items-center gap-1'>
                        Taste
                        <Info size={16} />
                      </FormLabel>
                    </TooltipTrigger>
                    <FormControl>
                      <MultiSelect
                        defaultValues={COMMON_ADJECTIVES}
                        placeholder='Select or add your own taste descriptor(s)'
                        onChange={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <TooltipContent className='shadow-none border-ring' side='right'>
                <p>The flavors perceived on your palate</p>
              </TooltipContent>
            </Tooltip>
            {/* Finish */}
            <Tooltip>
              <FormField
                control={sipForm.control}
                name='finish'
                render={({ field }) => (
                  <FormItem className='flex-1 sm:max-w-md'>
                    <TooltipTrigger>
                      <FormLabel className='flex items-center gap-1'>
                        Finish
                        <Info size={16} />
                      </FormLabel>
                    </TooltipTrigger>
                    <FormControl>
                      <MultiSelect
                        defaultValues={[...FINISH, ...COMMON_ADJECTIVES]}
                        placeholder='Select or add your own finish descriptor(s)'
                        onChange={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <TooltipContent className='shadow-none border-ring' side='right'>
                <p>The aftertaste or lingering flavors in your mouth</p>
              </TooltipContent>
            </Tooltip>
          </div>
          {/* Notes */}
          <FormField
            control={sipForm.control}
            name='notes'
            render={({ field }) => (
              <FormItem className='flex-1 max-w-2xl'>
                <FormLabel>Your Notes</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Optional notes here'
                    className='resize-none w-full'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className='text-sm text-destructive'>
            {sipForm.formState.errors.root?.serverError.type
              ? 'Something went wrong. Please try again!'
              : ''}
          </p>
          <Button className='w-fit' type='submit'>
            Submit
          </Button>
        </form>
      </Form>
    </TooltipProvider>
  )
}

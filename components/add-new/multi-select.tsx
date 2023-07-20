'use client'

import { X } from 'lucide-react'
import { useRef, useState, useCallback } from 'react'
import { Badge } from '@/components/ui/badge'
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Command as CommandPrimitive } from 'cmdk'
import { generateLabelAndValue } from '@/lib/utils'
import { ControllerRenderProps } from 'react-hook-form'

type Option = Record<'value' | 'label', string>

interface CustomProps {
  defaultValues: Option[]
  placeholder: string
}

type MultiSelectProps = CustomProps &
  Pick<ControllerRenderProps, 'onChange' | 'value'>

export function MultiSelect({
  defaultValues,
  placeholder,
  ...field
}: MultiSelectProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<Option[]>([])
  const [inputValue, setInputValue] = useState('')

  const handleUnselect = useCallback(
    (option: Option) => {
      const updated = selected.filter((s) => s.value !== option.value)
      setSelected(updated)

      const updatedValue = field.value.filter((v: string) => v !== option.value)
      field.onChange(updatedValue)
    },
    [field, selected]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current
      if (input) {
        if (e.key === 'Delete' || e.key === 'Backspace') {
          if (input.value === '') {
            const selectedCopy = [...selected]
            if (selectedCopy.length === 0) return
            selectedCopy.pop()
            setSelected(selectedCopy)

            field.value.pop()
            field.onChange(field.value)
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === 'Escape') {
          input.blur()
        }
      }
    },
    [field, selected]
  )

  const selectables = defaultValues.filter(
    (option) => !selected.includes(option)
  )

  return (
    <Command
      label={placeholder}
      onKeyDown={handleKeyDown}
      className='overflow-visible bg-transparent'
    >
      <div className='group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2'>
        <div className='flex gap-1 flex-wrap'>
          {selected.map((option) => {
            return (
              <Badge key={option.value} variant='secondary'>
                {option.label}
                <button
                  className='ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleUnselect(option)
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onClick={() => handleUnselect(option)}
                >
                  <X className='h-3 w-3 text-white hover:text-foreground' />
                </button>
              </Badge>
            )
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className='bg-transparent outline-none placeholder:text-muted-foreground flex-1'
          />
        </div>
      </div>
      <div className='relative mt-2'>
        {open && selectables.length > 0 ? (
          <div className='absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in'>
            <CommandList className='max-h-[200px]'>
              <CommandGroup className='h-full overflow-auto'>
                <>
                  {selectables.map((option) => {
                    return (
                      <CommandItem
                        key={option.value}
                        onMouseDown={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                        }}
                        onSelect={() => {
                          setInputValue('')
                          const updated = [...selected, option]
                          setSelected(updated)

                          const updatedValue = [...field.value, option.value]
                          field.onChange(updatedValue)
                        }}
                        className={'cursor-pointer'}
                      >
                        {option.label}
                      </CommandItem>
                    )
                  })}
                  {inputValue.length > 0 ? (
                    <CommandItem
                      key={inputValue}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                      onSelect={() => {
                        setInputValue('')
                        const { label, value } =
                          generateLabelAndValue(inputValue)
                        const updated = [...selected, { value, label }]
                        setSelected(updated)

                        const updatedValue = [...field.value, value]
                        field.onChange(updatedValue)
                      }}
                      className={'cursor-pointer'}
                    >
                      {`Add new "${inputValue}"...`}
                    </CommandItem>
                  ) : null}
                </>
              </CommandGroup>
            </CommandList>
          </div>
        ) : null}
      </div>
    </Command>
  )
}

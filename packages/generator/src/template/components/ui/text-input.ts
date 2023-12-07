export const textInput = `
import React from "react"
import { twMerge } from "tailwind-merge"

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(({
  label,
  name,
  className,
  ...props
}, ref) => {
  return (
    <>
      <label
        htmlFor={name}
        className="block text-xs font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        type='text'
        id={name}
        name={name}
        className={twMerge('mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm', className)}
        {...props}
        ref={ref}
      />
    </>
  )
})
`

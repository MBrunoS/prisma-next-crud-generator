export const input = `
import React from 'react'
import { twMerge } from 'tailwind-merge'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, name, className, required, ...props }, ref) => {
    return (
      <>
        <label
          htmlFor={name}
          className="block text-xs font-medium text-gray-700"
        >
          {label}
          {required && (
            <>
              &nbsp;<span className="font-bold text-secondary">*</span>
            </>
          )}
        </label>
        <input
          id={name}
          name={name}
          className={twMerge(
            'mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm',
            className,
          )}
          {...props}
          ref={ref}
        />
      </>
    )
  },
)
`

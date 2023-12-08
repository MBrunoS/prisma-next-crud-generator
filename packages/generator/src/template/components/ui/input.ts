export const input = `
import React from 'react'
import { twMerge } from 'tailwind-merge'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, name, type, className, required, ...props }, ref) => {
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
          type={type}
          id={name}
          name={name}
          required={required}
          className={twMerge(
            'mt-1 border-gray-200 shadow-sm sm:text-sm',
            type !== 'radio' && type !== 'checkbox' ? 'block w-full rounded-md' : 'inline-block rounded-full',
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

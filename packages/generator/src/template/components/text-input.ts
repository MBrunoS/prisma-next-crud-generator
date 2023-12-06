export const textInput = `
interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
}

export const TextInput = ({
  label,
  name,
  className,
  ...props
}: TextInputProps) => {
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
        className={\`mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm \${className}\`}
        {...props}
      />
    </>
  )
}
`

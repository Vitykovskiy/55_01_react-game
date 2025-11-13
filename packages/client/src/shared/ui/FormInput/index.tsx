import { TextInput } from '@gravity-ui/uikit'
import { ChangeEvent, Ref } from 'react'
import { useController } from 'react-hook-form'

type FormInputProps = {
  ref?: Ref<HTMLInputElement>
  label?: string
  className?: string
  name: string
  disabled?: boolean
  placeholder?: string
  value?: string
  type?: 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url'
  onChangeFormInput?: (value: string) => void
}

export const FormInput = ({
  ref,
  label,
  name,
  className,
  disabled,
  placeholder,
  value = '',
  type = 'text',
  onChangeFormInput,
}: FormInputProps) => {
  const {
    field: { onChange, value: fieldValue = value },
    fieldState: { error },
  } = useController({ name: name, defaultValue: value })

  const handleChange = ({
    currentTarget: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    onChange(value)
    onChangeFormInput?.(value)
  }

  return (
    <TextInput
      value={fieldValue}
      type={type}
      label={label}
      ref={ref}
      className={className}
      placeholder={placeholder}
      disabled={disabled}
      onChange={handleChange}
      validationState={error?.message ? 'invalid' : undefined}
      errorMessage={error?.message}
    />
  )
}

import { User } from '@entities/user'
import { FormInput } from '@shared/ui/FormInput'

type ProfilePageInputsProps = {
  data: User
}

type FieldConfig = {
  name: string
  label: string
  value?: string
  disabled?: boolean
  type?: 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url'
}
export const ProfilePageInputs = ({ data }: ProfilePageInputsProps) => {
  const fields: FieldConfig[] = [
    { name: 'firstName', label: 'Имя:', value: data.firstName, disabled: true },
    {
      name: 'lastName',
      label: 'Фамилия:',
      value: data.lastName,
      disabled: true,
    },
    { name: 'login', label: 'Логин:', value: data.login, disabled: true },
    { name: 'email', label: 'Email:', value: data.email, disabled: true },
    {
      name: 'phone',
      label: 'Телефон:',
      type: 'tel',
      value: data.phone,
      disabled: true,
    },
    {
      name: 'oldPassword',
      label: 'Старый пароль:',
      type: 'password',
      value: data.oldPassword,
      disabled: false,
    },
    {
      name: 'password',
      label: 'Новый пароль:',
      type: 'password',
      value: data.password,
      disabled: false,
    },
  ]

  return (
    <>
      {fields.map(field => (
        <FormInput
          key={field.name}
          name={field.name}
          label={field.label}
          defaultValue={field.value || ''}
          disabled={field?.disabled || false}
          type={field?.type}
        />
      ))}
    </>
  )
}

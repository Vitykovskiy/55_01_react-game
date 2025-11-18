import { FormInput } from '@shared/ui/FormInput'
import { User } from '../model/types'

type ProfilePageInputsProps = {
  data: User | undefined
}
export const ProfilePageInputs = ({ data }: ProfilePageInputsProps) => {
  if (!data) {
    return null
  }

  return (
    <>
      <FormInput
        name={'firstName'}
        label={'Имя:'}
        defaultValue={data.firstName}
        disabled={true}
      />
      <FormInput
        name={'lastName'}
        label={'Фамилия:'}
        defaultValue={data.secondName}
        disabled={true}
      />
      <FormInput
        name={'login'}
        label={'Логин:'}
        defaultValue={data.login}
        disabled={true}
      />
      <FormInput
        name={'email'}
        label={'Email:'}
        defaultValue={data.email}
        disabled={true}
      />
      <FormInput
        name={'phone'}
        type={'tel'}
        label={'Телефон:'}
        defaultValue={data.phone}
        disabled={true}
      />
      <FormInput
        name={'oldPassword'}
        type={'password'}
        defaultValue={data.oldPassword}
        label={'Старый пароль:'}
      />
      <FormInput
        name={'password'}
        type={'password'}
        defaultValue={data.password}
        label={'Новый пароль:'}
      />
    </>
  )
}

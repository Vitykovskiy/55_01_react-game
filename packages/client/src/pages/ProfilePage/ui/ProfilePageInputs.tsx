import { FormInput } from '@shared/ui/FormInput'
import { User } from '@pages/ProfilePage/model/types'

type ProfilePageInputsProps = {
  data: User | undefined
}
export const ProfilePageInputs = (props: ProfilePageInputsProps) => {
  const { data } = props
  if (!data) return null

  return (
    <>
      <FormInput
        name={'firstName'}
        label={'Имя:'}
        value={data.firstName}
        disabled={true}
      />
      <FormInput
        name={'lastName'}
        label={'Фамилия:'}
        value={data.secondName}
        disabled={true}
      />
      <FormInput
        name={'login'}
        label={'Логин:'}
        value={data.login}
        disabled={true}
      />
      <FormInput
        name={'email'}
        label={'Email:'}
        value={data.email}
        disabled={true}
      />
      <FormInput
        name={'phone'}
        type={'tel'}
        label={'Телефон:'}
        value={data.phone}
        disabled={true}
      />
      <FormInput
        name={'oldPassword'}
        type={'password'}
        value={data.oldPassword}
        label={'Старый пароль:'}
      />
      <FormInput
        name={'password'}
        type={'password'}
        value={data.password}
        label={'Новый пароль:'}
      />
    </>
  )
}

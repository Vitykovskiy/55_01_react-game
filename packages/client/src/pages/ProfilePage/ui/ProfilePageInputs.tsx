import { FormInput } from '@shared/ui/FormInput'
import { User } from '@pages/ProfilePage/model/types'

type ProfilePageInputsProps = {
  data: User
}
export const ProfilePageInputs = (props: ProfilePageInputsProps) => {
  const { data } = props

  return (
    <>
      <FormInput
        name={'firstName'}
        label={'Имя:'}
        value={data.first_name}
        disabled={true}
      />
      <FormInput
        name={'lastName'}
        label={'Фамилия:'}
        value={data.second_name}
        disabled={true}
      />
      <FormInput
        name={'login'}
        label={'Логин:'}
        value={data.login}
        disabled={true}
      />
      <FormInput
        name={'password'}
        type={'password'}
        value={data.password}
        label={'Пароль:'}
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
    </>
  )
}

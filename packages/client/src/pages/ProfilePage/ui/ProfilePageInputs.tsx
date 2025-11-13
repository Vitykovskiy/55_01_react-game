import { FormInput } from '@shared/ui/FormInput'
import { User } from '@pages/ProfilePage/model/types'
import s from './ProfilePage.module.scss'

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
        className={s.input}
      />
      <FormInput
        name={'lastName'}
        label={'Фамилия:'}
        value={data.second_name}
        className={s.input}
      />
      <FormInput
        name={'login'}
        label={'Логин:'}
        value={data.login}
        className={s.input}
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
        className={s.input}
      />
      <FormInput
        name={'phone'}
        type={'tel'}
        label={'Телефон:'}
        value={data.phone}
        className={s.input}
      />
    </>
  )
}

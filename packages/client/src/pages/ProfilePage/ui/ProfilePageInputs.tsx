import { FormInput } from '@shared/ui/FormInput'
import { User } from '@pages/ProfilePage/model/types'
import s from './ProfilePage.module.scss'

export const ProfilePageInputs = (props: { data: User }) => (
  <>
    <FormInput
      name={'firstName'}
      label={'Имя:'}
      value={props.data.first_name}
      className={s.input}
    />
    <FormInput
      name={'lastName'}
      label={'Фамилия:'}
      value={props.data.second_name}
      className={s.input}
    />
    <FormInput
      name={'login'}
      label={'Логин:'}
      value={props.data.login}
      className={s.input}
    />
    <FormInput
      name={'password'}
      type={'password'}
      value={props.data.password}
      label={'Пароль:'}
    />
    <FormInput
      name={'email'}
      label={'Email:'}
      value={props.data.email}
      className={s.input}
    />
    <FormInput
      name={'phone'}
      type={'tel'}
      label={'Телефон:'}
      value={props.data.phone}
      className={s.input}
    />
  </>
)

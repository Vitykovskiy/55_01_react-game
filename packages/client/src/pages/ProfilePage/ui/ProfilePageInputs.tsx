import { FormInput } from '@shared/ui/FormInput'

export const ProfilePageInputs = () => (
  <>
    <FormInput name={'firstName'} label={'Имя:'} />
    <FormInput name={'lastName'} label={'Фамилия:'} />
    <FormInput name={'login'} label={'Логин:'} />
    <FormInput name={'password'} type={'password'} label={'Пароль:'} />
    <FormInput name={'email'} label={'Email:'} />
    <FormInput name={'phone'} type={'tel'} label={'Телефон:'} />
  </>
)

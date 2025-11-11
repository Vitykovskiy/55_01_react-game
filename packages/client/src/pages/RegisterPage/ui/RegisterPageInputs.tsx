import { FormInput } from '@shared/ui/FormInput'

export const RegisterPageInputs = () => (
  <>
    <FormInput name={'firstName'} label={'Имя:'} />
    <FormInput name={'lastName'} label={'Фамилия:'} />
    <FormInput name={'login'} label={'Логин:'} />
    <FormInput name={'password'} type={'password'} label={'Пароль:'} />
    <FormInput name={'email'} label={'Почта:'} />
    <FormInput name={'phone'} type={'tel'} label={'Телефон:'} />
  </>
)

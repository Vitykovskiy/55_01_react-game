import { FormInput } from '@shared/ui/FormInput'

export const LoginPageInputs = () => (
  <>
    <FormInput name={'login'} label={'Логин:'} />
    <FormInput name={'password'} type={'password'} label={'Пароль:'} />
  </>
)

import { FormInput } from '@shared/ui/FormInput'

export const LoginPageInputs = () => (
  <>
    <div>
      <FormInput name={'login'} label={'Логин:'} />
    </div>
    <div>
      <FormInput name={'password'} type={'password'} label={'Пароль:'} />
    </div>
  </>
)

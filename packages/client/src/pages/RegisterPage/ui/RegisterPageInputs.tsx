import { FormInput } from '@shared/ui/FormInput'

export const RegisterPageInputs = () => (
  <>
    <div>
      <FormInput name={'firstName'} label={'Имя:'} />
    </div>
    <div>
      <FormInput name={'lastName'} label={'Фамилия:'} />
    </div>
    <div>
      <FormInput name={'login'} label={'Логин:'} />
    </div>
    <div>
      <FormInput name={'password'} type={'password'} label={'Пароль:'} />
    </div>
    <div>
      <FormInput name={'email'} label={'Почта:'} />
    </div>
    <div>
      <FormInput name={'phone'} type={'tel'} label={'Телефон:'} />
    </div>
  </>
)

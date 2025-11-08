import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

// 1. Описываем схему валидации через Zod: https://zod.dev/api
const schema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(80, 'Max 80 characters'),
  lastName: z.string(),
  email: z.email({ message: 'Invalid email format' }),
  login: z.string().min(3, 'Minimum 3 characters').max(25, 'Max 25 characters'),
  password: z.string().min(1, 'Password is required'),
})

// 2. Создаём тип формы на основе схемы
type Schema = z.infer<typeof schema>

// 3. Пишем компонент формы. Можно воспользоваться Form Builder'ом - https://react-hook-form.com/form-builder
const FormExample = () => {
  // Про useForm https://react-hook-form.com/docs/useform
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: Schema) => {
    console.log(data)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          type="text"
          placeholder="First name"
          {...register('firstName')}
        />
        {errors.firstName && (
          <div style={{ color: 'red' }}>{errors.firstName.message}</div>
        )}
      </div>

      <div>
        <input type="text" placeholder="Last name" {...register('lastName')} />
        {errors.lastName && (
          <div style={{ color: 'red' }}>{errors.lastName.message}</div>
        )}
      </div>

      <div>
        <input type="text" placeholder="Email" {...register('email')} />
        {errors.email && (
          <div style={{ color: 'red' }}>{errors.email.message}</div>
        )}
      </div>

      <div>
        <input type="text" placeholder="Login" {...register('login')} />
        {errors.login && (
          <div style={{ color: 'red' }}>{errors.login.message}</div>
        )}
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          {...register('password')}
        />
        {errors.password && (
          <div style={{ color: 'red' }}>{errors.password.message}</div>
        )}
      </div>

      <button type="submit">Register</button>
    </form>
  )
}

export default FormExample

import { Button, Text } from '@gravity-ui/uikit'
import { zodResolver } from '@hookform/resolvers/zod'
import { BASE_URL, RoutePath, usePage } from '@shared/config'
import { AvatarLoad } from '@shared/ui/AvatarLoad'
import Layout from '@shared/ui/Layout'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { PROFILE_AVATAR, PROFILE_PAGE_TITLE } from '../model/consts'
import { schema } from '../model/schemas'
import { Schema } from '../model/types'
import { useProfile } from '../model/useProfile'
import s from './ProfilePage.module.scss'
import { ProfilePageInputs } from './ProfilePageInputs'
import { useSelector } from '@shared/store'

export const ProfilePage = () => {
  usePage({})

  const { data, isLoadingUser } = useSelector(state => state.user)

  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
  })
  const { handleSubmit } = methods
  const navigate = useNavigate()
  const { updatePassword, updateAvatar } = useProfile(methods.setError)

  if (isLoadingUser) {
    return <p>Загрузка</p>
  }

  const handleButtonComeback = () => {
    navigate(RoutePath.Main)
  }

  const onSubmit = async (data: Schema) => {
    await updatePassword(data.oldPassword, data.password)
  }

  const handleAvatarChange = (file: File) => {
    updateAvatar(file)
  }

  return (
    <div>
      <Layout variant="center" title={PROFILE_PAGE_TITLE}>
        <Text variant="header-1" as="h1">
          {PROFILE_PAGE_TITLE}
        </Text>
        <AvatarLoad
          img={data?.avatar ? BASE_URL + data.avatar : PROFILE_AVATAR}
          imageChange={handleAvatarChange}
        />
        <FormProvider {...methods}>
          <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <ProfilePageInputs data={data} />
            <Button type={'submit'} view="action">
              Сохранить
            </Button>
            <Button type={'button'} onClick={handleButtonComeback}>
              Назад
            </Button>
          </form>
        </FormProvider>
      </Layout>
    </div>
  )
}

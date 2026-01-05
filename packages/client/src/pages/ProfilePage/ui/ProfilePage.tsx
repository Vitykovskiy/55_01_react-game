import { Button, Text } from '@gravity-ui/uikit'
import { zodResolver } from '@hookform/resolvers/zod'
import { BASE_URL, RoutePath, usePage } from '@shared/config'
import { useSelector } from '@shared/store'
import { AvatarLoad } from '@shared/ui/AvatarLoad'
import Layout from '@shared/ui/Layout'
import { Loader } from '@shared/ui/Loader'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { PROFILE_AVATAR, PROFILE_PAGE_TITLE } from '../model/consts'
import { schema } from '../model/schemas'
import { Schema } from '../model/types'
import { useProfile } from '../model/useProfile'
import s from './ProfilePage.module.scss'
import { ProfilePageInputs } from './ProfilePageInputs'

export const ProfilePage = () => {
  usePage({})

  const { data: user, isLoadingUser } = useSelector(state => state.user)
  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
  })
  const { handleSubmit } = methods
  const navigate = useNavigate()
  const { updatePassword, updateAvatar } = useProfile(methods.setError)

  if (!user) {
    return null
  }

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
    <Layout variant="center" title={PROFILE_PAGE_TITLE}>
      <Loader show={isLoadingUser}>
        <Text variant="header-1" as="h1">
          {PROFILE_PAGE_TITLE}
        </Text>
        <AvatarLoad
          img={user.avatar ? BASE_URL + user.avatar : PROFILE_AVATAR}
          imageChange={handleAvatarChange}
        />
        <FormProvider {...methods}>
          <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <ProfilePageInputs data={user} />
            <Button type={'submit'} view="action">
              Сохранить
            </Button>
            <Button type={'button'} onClick={handleButtonComeback}>
              Назад
            </Button>
          </form>
        </FormProvider>
      </Loader>
    </Layout>
  )
}

import { Button, Text } from '@gravity-ui/uikit'
import { zodResolver } from '@hookform/resolvers/zod'
import { RoutePath, usePage } from '@shared/config/routing'
import Layout from '@shared/ui/Layout'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { PROFILE_PAGE_TITLE, PROFILE_AVATAR } from '../model/consts'
import { schema } from '../model/schemas'
import { Schema } from '../model/types'
import s from './ProfilePage.module.scss'
import { ProfilePageInputs } from './ProfilePageInputs'
import { AvatarLoad } from '@shared/ui/AvatarLoad'
import { BaseUrl } from '../../../shared/config/routing/consts'
import { useProfile } from '../model/useProfile'

export const ProfilePage = () => {
  usePage({})
  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
  })
  const { handleSubmit } = methods
  const navigate = useNavigate()
  const { user, loadUser, updatePassword, updateAvatar, isLoading } =
    useProfile()

  useEffect(() => {
    loadUser()
  }, [])

  if (isLoading) {
    return null
  }

  const handleButtonComeback = () => {
    navigate(RoutePath.Main)
  }

  const onSubmit = async (data: Schema) => {
    await updatePassword(data.oldPassword, data.password)
  }

  const handleAvatarChange = async (file: File) => {
    await updateAvatar(file)
  }

  return (
    <div>
      <Layout variant="center" title={PROFILE_PAGE_TITLE}>
        <Text variant="header-1" as="h1">
          {PROFILE_PAGE_TITLE}
        </Text>
        <AvatarLoad
          img={user?.avatar ? BaseUrl + user.avatar : PROFILE_AVATAR}
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
      </Layout>
    </div>
  )
}

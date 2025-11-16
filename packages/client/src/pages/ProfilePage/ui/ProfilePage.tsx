import { Button, Text } from '@gravity-ui/uikit'
import { zodResolver } from '@hookform/resolvers/zod'
import { RoutePath, usePage } from '@shared/config/routing'
import Layout from '@shared/ui/Layout'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { PROFILE_PAGE_TITLE, PROFILE_AVATAR } from '../model/consts'
import { schema } from '../model/schemas'
import { PasswordChangeData, Schema, User } from '../model/types'
import s from './ProfilePage.module.scss'
import { ProfilePageInputs } from './ProfilePageInputs'
import { AvatarLoad } from '@shared/ui/AvatarLoad'
import { Api } from '@shared/lib'
import { BaseUrl } from '@shared/config/routing/consts'

export const ProfilePage = () => {
  usePage({})
  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
  })
  const { handleSubmit } = methods
  const [initiatedPage, setInitiatedPage] = useState(false)
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)

  const getUser = async () => {
    try {
      const response = await Api.getRequest<User>('auth/user')
      if (response) {
        setUser(response)
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    setInitiatedPage(true)
    getUser()
  }, [])

  if (!initiatedPage) {
    return null
  }

  const handleButtonAuthClick = () => {
    navigate(RoutePath.Main)
  }

  const changePassword = async (data: Schema) => {
    try {
      await Api.putRequest<PasswordChangeData>('user/password', {
        oldPassword: data.oldPassword,
        newPassword: data.password,
      })
    } catch (e) {
      console.error(e)
    }
  }

  const onSubmit = async (data: Schema) => {
    await changePassword(data)
    handleButtonAuthClick()
  }

  const handleAvatarChange = async (file: File) => {
    try {
      const formData = new FormData()
      formData.append('avatar', file)

      await Api.putRequest<User>('user/profile/avatar', formData, {
        'Content-Type': 'multipart/form-data',
      })
    } catch (e) {
      console.error(e)
    }
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
            <Button type={'button'} onClick={handleButtonAuthClick}>
              Назад
            </Button>
          </form>
        </FormProvider>
      </Layout>
    </div>
  )
}

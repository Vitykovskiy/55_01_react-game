import { Button, Text } from '@gravity-ui/uikit'
import { zodResolver } from '@hookform/resolvers/zod'
import { RoutePath, usePage } from '@shared/config/routing'
import Layout from '@shared/ui/Layout'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { PROFILE_PAGE_TITLE, PROFILE_DATA } from '../model/consts'
import { schema } from '../model/schemas'
import { PasswordChangeData, Schema, User } from '../model/types'
import s from './ProfilePage.module.scss'
import { ProfilePageInputs } from './ProfilePageInputs'
import { AvatarLoad } from '@shared/ui/AvatarLoad'
import { Api } from '@shared/lib'

export const ProfilePage = () => {
  usePage({})
  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
  })
  const { handleSubmit } = methods
  const [initiatedPage, setInitiatedPage] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setInitiatedPage(true)
  }, [])

  if (!initiatedPage) {
    return null
  }

  const handleButtonAuthClick = () => {
    navigate(RoutePath.Main)
  }

  const onSubmit = async (data: Schema) => {
    await Api.putRequest<PasswordChangeData>('user/password', {
      oldPassword: 'string',
      newPassword: data,
    })
    handleButtonAuthClick()
  }

  const handleAvatarChange = async (file: File, imageUrl: string) => {
    console.log(file)
    console.log(imageUrl)
    const formData = new FormData()
    formData.append('avatar', file)
    const response = await Api.putRequest<User>('user/profile/avatar', formData)
  }

  return (
    <div>
      <Layout variant="center" title={PROFILE_PAGE_TITLE}>
        <Text variant="header-1" as="h1">
          {PROFILE_PAGE_TITLE}
        </Text>
        <AvatarLoad
          img={PROFILE_DATA.avatar}
          imageChange={handleAvatarChange}
        />
        <FormProvider {...methods}>
          <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <ProfilePageInputs data={PROFILE_DATA} />
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

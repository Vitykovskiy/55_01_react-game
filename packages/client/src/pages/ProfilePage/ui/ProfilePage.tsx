import { Button, Text } from '@gravity-ui/uikit'
import { zodResolver } from '@hookform/resolvers/zod'
import { RoutePath, usePage } from '@shared/config/routing'
import Layout from '@shared/ui/Layout'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { PROFILE_PAGE_TITLE, PROFILE_AVATAR } from '../model/consts'
import { schema } from '../model/schemas'
import { Schema } from '../model/types'
import s from './ProfilePage.module.scss'
import { ProfilePageInputs } from './ProfilePageInputs'
import { AvatarLoad } from '@shared/ui/AvatarLoad'

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

  const onSubmit = (data: Schema) => {
    console.log(data)
    handleButtonAuthClick()
  }

  const handleAvatarChange = (file: File, imageUrl: string) => {
    console.log(file)
    console.log(imageUrl)
  }

  return (
    <div>
      <Layout variant="center" title={PROFILE_PAGE_TITLE}>
        <Text variant="header-1" as="h1">
          {PROFILE_PAGE_TITLE}
        </Text>
        <AvatarLoad img={PROFILE_AVATAR} imageChange={handleAvatarChange} />
        <FormProvider {...methods}>
          <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <ProfilePageInputs />
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

import { Button, Text } from '@gravity-ui/uikit'
import { zodResolver } from '@hookform/resolvers/zod'
import { RoutePath, usePage, BASE_URL } from '@shared/config/routing'
import Layout from '@shared/ui/Layout'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { PROFILE_PAGE_TITLE, PROFILE_AVATAR } from '../model/consts'
import { schema } from '../model/schemas'
import { Schema } from '../model/types'
import s from './ProfilePage.module.scss'
import { ProfilePageInputs } from './ProfilePageInputs'
import { AvatarLoad } from '@shared/ui/AvatarLoad'
import { useProfile } from '../model/useProfile'
import { useSelectorStore } from '@entities/storeRedux'

export const ProfilePage = () => {
  usePage({})

  const { data, isLoadingUser } = useSelectorStore(state => state.userSlice)

  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
  })
  const { handleSubmit } = methods
  const navigate = useNavigate()
  const { updatePassword, updateAvatar } = useProfile(methods.setError)

  if (isLoadingUser) {
    return <p>'Загрузка'</p>
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

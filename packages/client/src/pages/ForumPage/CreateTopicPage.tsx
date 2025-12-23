import { Button, Text, TextArea, TextInput } from '@gravity-ui/uikit'
import { ChangeEvent, FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { RoutePath, usePage } from '@shared/config'
import Layout from '@shared/ui/Layout'
import Section from '@shared/ui/Section'
import styles from './CreateTopicPage.module.scss'

export const CreateTopicPage = () => {
  usePage({})
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  const canSubmit = title.trim().length > 0 && text.trim().length > 0

  const handleCreate = () => {
    if (!canSubmit) {
      return
    }

    navigate(RoutePath.Forum)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleCreate()
  }

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <Layout
        title="Создать тему"
        alignItems="flex-start"
        bottomPanel={
          <Section pb>
            <Button
              type="submit"
              view="action"
              width="max"
              disabled={!canSubmit}>
              Создать тему
            </Button>
            <Button
              view="outlined"
              width="max"
              component={Link}
              to={RoutePath.Forum}>
              Отмена
            </Button>
          </Section>
        }
        withBottomPadding={false}>
        <Text as="h1" variant="header-1">
          Новая тема
        </Text>
        <Text as="p" variant="body-2">
          Расскажите о том, что вас волнует, и другие участники смогут помочь.
        </Text>
        <Section alignItems="flex-start">
          <Text as="p" variant="subheader-2">
            Заголовок
          </Text>
          <TextInput
            value={title}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setTitle(event.target.value)
            }
            placeholder="Название темы"
            size="l"
          />
        </Section>
        <Section pb alignItems="flex-start">
          <Text as="p" variant="subheader-2">
            Описание
          </Text>
          <TextArea
            value={text}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
              setText(event.target.value)
            }
            minRows={8}
            placeholder="Опишите проблему, вопрос или пример"
          />
        </Section>
      </Layout>
    </form>
  )
}

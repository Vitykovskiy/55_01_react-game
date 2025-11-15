import { Button, Text, TextArea } from '@gravity-ui/uikit'
import Section from '@shared/ui/Section'
import { ChangeEvent } from 'react'

type CommentFormSectionProps = {
  text: string
  canSubmit: boolean
  onChange: (value: string) => void
}

export const CommentFormSection = ({
  text,
  canSubmit,
  onChange,
}: CommentFormSectionProps) => {
  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }

  return (
    <Section pb>
      <Text as="h2" variant="subheader-2">
        Написать:
      </Text>
      <TextArea
        size="m"
        placeholder="Введите ваш комментарий здесь"
        minRows={8}
        value={text}
        onChange={handleTextAreaChange}
      />
      <Button view="action" width="max" disabled={!canSubmit}>
        Добавить комментарий
      </Button>
    </Section>
  )
}

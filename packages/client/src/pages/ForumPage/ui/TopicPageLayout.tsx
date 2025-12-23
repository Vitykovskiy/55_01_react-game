import { Button } from '@gravity-ui/uikit'
import { RoutePath } from '@shared/config'
import Layout from '@shared/ui/Layout'
import Section from '@shared/ui/Section'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type TopicPageLayoutProps = {
  children: ReactNode
}

export const TopicPageLayout = ({ children }: TopicPageLayoutProps) => {
  return (
    <Layout
      title=""
      alignItems="flex-start"
      bottomPanel={
        <Section pb>
          <Button
            view="outlined"
            width="max"
            component={Link}
            to={RoutePath.Forum}>
            Назад
          </Button>
        </Section>
      }
      withBottomPadding={false}>
      {children}
    </Layout>
  )
}

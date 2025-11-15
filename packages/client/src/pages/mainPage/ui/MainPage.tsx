import { Text } from '@gravity-ui/uikit'
import s from './MainPage.module.scss'
import Layout from '@shared/ui/Layout'
import logoMain from '../../../../public/main/logo.svg'
import { Buttons } from './Buttons'

export const MainPage = () => {
  return (
    <div className={s.mainPage}>
      <Layout variant="center" title="Главная">
        <img src={logoMain} alt="логотип" />
        <Text className={s.text} as="p" variant="body-2">
          Magic Type — увлекательная веб-игра, где скорость набора превращается
          в магию. Каждый правильно набранный текст — заклинание или удар меча.
          Побеждай чудовищ и докажи, что слова сильнее клинка.
        </Text>
        <Buttons />
      </Layout>
    </div>
  )
}

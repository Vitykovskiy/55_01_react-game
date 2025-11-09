import { usePage } from '@shared/config/routing'
import Layout from '@shared/ui/Layout'

export const ForumPage = () => {
  usePage({})
  return (
    // Пример использования Layout в варианте default

    <Layout
      title="Форум"
      description="Cтраница форума"
      variant="default"
      bottomPanel={<div>Bottom Panel</div>}>
      <h1>Форум</h1>
      <div>Test</div>
    </Layout>

    // Пример использования Layout в варианте center

    /* <Layout
      variant="center"
      title="Форум"
      description="Cтраница форума"
      >
      <h1>Форум</h1>
      <div>Test</div>
    </Layout>
    */

    // Пример использования Layout с bottomPanel

    /* <Layout
      variant="center"
      title="Форум"
      description="Cтраница форума"
      bottomPanel={<div>Bottom Panel</div>}
      >
      <h1>Форум</h1>
      <div style={{width: '100%',minHeight: '120vh', background: 'orange'}}>Test</div>
    </Layout>
    */
  )
}

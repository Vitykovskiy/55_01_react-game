import { Button } from '@gravity-ui/uikit'

type typeButton = 'button' | 'submit' | 'reset'
type viewButton = 'action' | 'outlined'

export type ButtonCustomProps = {
  name: string
  text: string
  handleClick?: () => void
  type?: typeButton
  view?: viewButton
}

export const ButtonCustom = ({
  handleClick,
  text,
  name,
  type = 'button',
  view = 'action',
}: ButtonCustomProps) => {
  return (
    <Button
      view={view}
      width="max"
      type={type}
      name={name}
      onClick={handleClick}>
      {text}
    </Button>
  )
}

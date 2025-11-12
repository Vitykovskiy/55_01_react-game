import { Button } from '@gravity-ui/uikit'
import { ButtonCustomProps } from '.'

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

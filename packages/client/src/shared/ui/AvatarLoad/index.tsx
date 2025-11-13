import { Avatar } from '@gravity-ui/uikit'
import s from './style.module.scss'
import { ChangeEvent, useRef, useState } from 'react'
interface AvatarLoadProps {
  img: string
  imageChange?: (file: File, imageUrl: string) => void
}
export const AvatarLoad = (props: AvatarLoadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [avatar, setAvatar] = useState(props.img)
  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    if (target && target.files && target.files.length > 0) {
      const file = target.files[0]
      if (file) {
        const imageUrl = URL.createObjectURL(file)
        setAvatar(imageUrl)
        props.imageChange?.(file, imageUrl)
      }
    }
  }
  return (
    <div className={s.avatarContainer} onClick={handleAvatarClick}>
      <Avatar imgUrl={avatar} size="xl" className={s.avatarHover} />

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className={s.input}
      />
    </div>
  )
}

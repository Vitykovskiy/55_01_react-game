import { EventBus } from '../../models/EventBus'
import {
  GameEvents,
  HeroEvents,
  MobEvents,
  ProjectileEvents,
} from '../../models/types'
import { SOUNDS_ASSETS, SOUNDS_MAP } from './constants'

export class SoundsManager {
  private audioContext: AudioContext
  private sounds: Map<string, AudioBuffer> = new Map()

  constructor(private _eventBus: EventBus<GameEvents>) {
    this.audioContext = new window.AudioContext()

    this.initializeAudio()
  }

  private async initializeAudio(): Promise<void> {
    await this.loadAllSounds()
    this._initGameEventsListeners()
  }

  private async loadAllSounds(): Promise<void> {
    const promises = Object.entries(SOUNDS_MAP).map(([name, filename]) =>
      this.loadSound(filename, name)
    )
    await Promise.allSettled(promises)
  }

  private async loadSound(filename: string, name: string): Promise<void> {
    try {
      const soundUrl = Object.values(SOUNDS_ASSETS).find(url =>
        url.includes(filename)
      )

      if (!soundUrl) {
        console.warn(`Звук ${filename} не найден в импортированных файлах`)
        return
      }

      const response = await fetch(soundUrl)

      if (!response.ok) {
        throw new Error(
          `Ошибка loadSound fetch: ${filename} ${response.status}`
        )
      }

      const arrayBuffer = await response.arrayBuffer()
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer)
      this.sounds.set(name, audioBuffer)
    } catch (error) {
      console.error(`Ошибка загрузки звука ${name}:`, error)
    }
  }

  private _playSound(name: string): void {
    const buffer = this.sounds.get(name)

    if (!buffer) {
      console.warn(`Ошибка воспроизведения звука "${name}": Звук не найден`)
      return
    }

    try {
      const source = this.audioContext.createBufferSource()
      source.buffer = buffer
      source.connect(this.audioContext.destination)
      source.start()
    } catch (error) {
      console.warn(`Ошибка воспроизведения звука "${name}":`, error)
    }
  }

  private _initGameEventsListeners(): void {
    this._eventBus.on(MobEvents.Death, () => {
      Math.random() > 0.5
        ? this._playSound('orc_death_01')
        : this._playSound('orc_death_02')
    })

    this._eventBus.on(HeroEvents.AttacksRange, () => {
      this._playSound('arrow_cast')
    })

    this._eventBus.on(ProjectileEvents.Launched, () => {
      this._playSound('arrow_shoot')
    })

    this._eventBus.on(ProjectileEvents.Landed, () => {
      this._playSound('arrow_hit')
    })
  }
}

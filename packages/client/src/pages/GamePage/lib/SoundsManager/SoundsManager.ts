import { EventBus } from '../../models/EventBus'
import {
  GameEvents,
  HeroEvents,
  MobEvents,
  ProjectileEvents,
} from '../../models/types'
import { SOUNDS_ASSETS, SoundsKeys } from './constants'

// TODO: Вынести слушатели в SoundsDirector
export class SoundsManager {
  private audioContext: AudioContext
  private sounds: Map<SoundsKeys, AudioBuffer> = new Map()

  constructor(private _eventBus: EventBus<GameEvents>) {
    this.audioContext = new window.AudioContext()

    this.init()
  }

  public async init(): Promise<void> {
    await this.loadAllSounds()
    this._initGameEventsListeners()
  }

  private async loadAllSounds(): Promise<void> {
    const promises = Object.values(SoundsKeys).map(async name => {
      const entry = Object.entries(SOUNDS_ASSETS).find(([path]) =>
        path.endsWith(`/${name}.mp3`)
      )

      if (!entry) {
        throw new Error(`Звук "${name}.mp3" не найден в assets`)
      }

      const url = await entry[1]()
      await this.loadSound(url, name)
    })

    await Promise.all(promises)
  }

  private async loadSound(soundUrl: string, name: SoundsKeys): Promise<void> {
    try {
      const response = await fetch(soundUrl)

      if (!response.ok) {
        throw new Error(`Ошибка loadSound fetch: ${name} ${response.status}`)
      }

      const arrayBuffer = await response.arrayBuffer()

      if (this.audioContext.state === 'closed') {
        throw new Error('AudioContext закрыт')
      }

      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer)
      this.sounds.set(name, audioBuffer)
    } catch (error) {
      console.error(`Ошибка загрузки звука ${name}:`, error)
    }
  }

  public playSound(name: SoundsKeys): void {
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
        ? this.playSound(SoundsKeys.OrcDeath01)
        : this.playSound(SoundsKeys.OrcDeath02)
    })

    this._eventBus.on(HeroEvents.AttacksRange, () => {
      this.playSound(SoundsKeys.ArrowCast)
    })

    this._eventBus.on(ProjectileEvents.Launched, () => {
      this.playSound(SoundsKeys.ArrowShoot)
    })

    this._eventBus.on(ProjectileEvents.Landed, () => {
      this.playSound(SoundsKeys.ArrowHit)
    })
  }
}

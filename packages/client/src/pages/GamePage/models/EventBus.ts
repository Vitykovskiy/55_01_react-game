export type EventCallback = (...args: unknown[]) => void

export class EventBus<T extends string> {
  private listeners: Partial<Record<T, EventCallback[]>>

  constructor() {
    this.listeners = {}
  }

  on(event: T, callback: EventCallback) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }

    this.listeners[event].push(callback)
  }

  off(event: T, callback: EventCallback) {
    if (!this.listeners[event]) {
      throw new Error(`Not found event: ${event}`)
    }

    this.listeners[event] = this.listeners[event].filter(
      listener => listener !== callback
    )
  }

  emit(event: T, ...args: unknown[]) {
    if (!this.listeners[event]) {
      return
    }

    this.listeners[event].forEach(listener => {
      listener(...args)
    })
  }
}

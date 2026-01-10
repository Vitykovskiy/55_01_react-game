import { WORDS } from '../models/consts'

export class Dictionary {
  private _dictionary: string[] = WORDS
  private _usedWords: string[] = []
  private _currentWords: string[] = []

  public getRandomWord(): string | null {
    const forbiddenLetters = new Set(this._currentWords.map(word => word[0]))

    const candidates = this._dictionary.filter(
      word =>
        !this._usedWords.includes(word) &&
        !this._currentWords.includes(word) &&
        !forbiddenLetters.has(word[0])
    )

    if (candidates.length === 0) {
      return null
    }

    const index = Math.floor(Math.random() * candidates.length)
    return candidates[index]
  }

  public addToCurrent(name: string): void {
    this._currentWords.push(name)
  }

  public addToUsed(name: string): void {
    this._usedWords.push(name)
  }
}

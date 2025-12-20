# Memory Leaks

## GamePage: view-объекты не освобождались после выхода из игры

### Симптомы
- После выхода из игры в главное меню объекты, связанные с игрой, оставались в куче.
- Это указывало на возможное удержание ссылок и/или активные анимационные циклы.

### Как обнаружили
1. Chrome DevTools → Memory → Heap snapshot.
2. Снимок "до" на главном экране (до входа в игру).
3. Запуск игры, проигрыш, возврат в главное меню.
4. Нажатие "Collect rubbish" (принудительный GC).
5. Снимок "после" и сравнение (Comparison) по конструкторам.

Наблюдалась разница между "до" и "после":
- SkeletonView: 0 → 2 (delta +2)
- MainHeroView: 0 → 1 (delta +1)
- Skeleton: 0 → 4 (delta +4)

Эти объекты должны были исчезнуть после выхода из игры и GC.

### Причина
- Бесконечные requestAnimationFrame‑циклы в view-классах запускались в конструкторе и не останавливались при выходе из игры.
- ViewModel не имел централизованного метода очистки и не останавливал анимации/не освобождал ссылки на view-объекты.

### Решение
- Добавлен метод `destroy()` в `ViewModel`, который:
  - останавливает анимации у view,
  - очищает списки врагов/снарядов и сбрасывает ссылки.
- `Game.stop()` вызывает `viewModel.destroy()` при остановке игры.
- В `BaseUnitView.showAnimationOnce()` сохранение `requestAnimationFrame` id сделано через `_animator`, чтобы корректно отменять анимацию.

Изменения:
- `55_01_react-game/packages/client/src/pages/GamePage/lib/view/BaseUnitView.ts`
- `55_01_react-game/packages/client/src/pages/GamePage/lib/ViewModel.ts`
- `55_01_react-game/packages/client/src/pages/GamePage/ui/Game.ts`

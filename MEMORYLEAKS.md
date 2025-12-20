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

## Canvas: Detatched <canvas> без накопления

### Симптомы
- В heap snapshot появлялся `Detached <canvas>` и `Detached CanvasRenderingContext2D`.

### Как проверили
1. Серия снимков A/B/C/D с принудительным GC (Collect rubbish).
2. Сравнение показало, что количество `HTMLCanvasElement` и `CanvasRenderingContext2D` увеличивалось только один раз и дальше оставалось стабильным.
3. В DOM после выхода в меню `<canvas>` не обнаружен.

### Вывод
- Накопления нет, поведение выглядит как шум DevTools/движка. Утечки не подтверждено.

## BaseProjectileView: таймеры полета снаряда

### Риск
- `setTimeout` удерживает объект снаряда до завершения полета, даже если игра уже завершена.

### Решение
- Добавлен `destroy()` у `BaseProjectileView` с отменой таймера и очисткой ссылки на изображение.
- `ViewModel.destroy()` теперь вызывает `projectile.destroy()` для всех активных снарядов.

Изменения:
- `55_01_react-game/packages/client/src/pages/GamePage/lib/view/BaseProjectileView.ts`
- `55_01_react-game/packages/client/src/pages/GamePage/lib/ViewModel.ts`

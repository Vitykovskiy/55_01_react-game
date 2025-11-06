// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
)

// тест заглушка, чтобы jest не падал
test.todo('stub')

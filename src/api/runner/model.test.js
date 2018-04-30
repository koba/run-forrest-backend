import { Runner } from '.'
import { User } from '../user'

let user, runner

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  runner = await Runner.create({ user, name: 'test', run: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = runner.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(runner.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.name).toBe(runner.name)
    expect(view.run).toBe(runner.run)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = runner.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(runner.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.name).toBe(runner.name)
    expect(view.run).toBe(runner.run)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})

import { Run } from '.'

let run

beforeEach(async () => {
  run = await Run.create({ name: 'test', city: 'test', country: 'test', path: 'test', distance: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = run.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(run.id)
    expect(view.name).toBe(run.name)
    expect(view.city).toBe(run.city)
    expect(view.country).toBe(run.country)
    expect(view.path).toBe(run.path)
    expect(view.distance).toBe(run.distance)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = run.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(run.id)
    expect(view.name).toBe(run.name)
    expect(view.city).toBe(run.city)
    expect(view.country).toBe(run.country)
    expect(view.path).toBe(run.path)
    expect(view.distance).toBe(run.distance)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})

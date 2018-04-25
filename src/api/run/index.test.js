import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Run } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, run

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  run = await Run.create({})
})

test('POST /runs 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, name: 'test', city: 'test', country: 'test', path: 'test', distance: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.city).toEqual('test')
  expect(body.country).toEqual('test')
  expect(body.path).toEqual('test')
  expect(body.distance).toEqual('test')
})

test('POST /runs 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /runs 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /runs 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /runs 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /runs/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${run.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(run.id)
})

test('GET /runs/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${run.id}`)
  expect(status).toBe(401)
})

test('GET /runs/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /runs/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${run.id}`)
    .send({ access_token: adminSession, name: 'test', city: 'test', country: 'test', path: 'test', distance: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(run.id)
  expect(body.name).toEqual('test')
  expect(body.city).toEqual('test')
  expect(body.country).toEqual('test')
  expect(body.path).toEqual('test')
  expect(body.distance).toEqual('test')
})

test('PUT /runs/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${run.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /runs/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${run.id}`)
  expect(status).toBe(401)
})

test('PUT /runs/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, name: 'test', city: 'test', country: 'test', path: 'test', distance: 'test' })
  expect(status).toBe(404)
})

test('DELETE /runs/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${run.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /runs/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${run.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /runs/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${run.id}`)
  expect(status).toBe(401)
})

test('DELETE /runs/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})

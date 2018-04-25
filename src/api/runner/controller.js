import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Runner } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Runner.create({ ...body, user })
    .then((runner) => runner.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Runner.find(query, select, cursor)
    .populate('user')
    .then((runners) => runners.map((runner) => runner.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Runner.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((runner) => runner ? runner.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Runner.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((runner) => runner ? Object.assign(runner, body).save() : null)
    .then((runner) => runner ? runner.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Runner.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((runner) => runner ? runner.remove() : null)
    .then(success(res, 204))
    .catch(next)

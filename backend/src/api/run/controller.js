import { success, notFound } from '../../services/response/'
import { runState } from '../../services/run-forrest'
import { Run } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Run.create(body)
    .then((run) => run.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Run.find(query, select, cursor)
    .then((runs) => runs.map((run) => run.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Run.findById(params.id)
    .then(notFound(res))
    .then((run) => run ? run.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Run.findById(params.id)
    .then(notFound(res))
    .then((run) => run ? Object.assign(run, body).save() : null)
    .then((run) => run ? run.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Run.findById(params.id)
    .then(notFound(res))
    .then((run) => run ? run.remove() : null)
    .then(success(res, 204))
    .catch(next)

export const state = ({ params }, res, next) =>
  Run.findById(params.id)
    .then(notFound(res))
    .then((run) => run ? run.view() : null)
    .then((run) => runState(run.id))
    .then((state) => {
      if (!state) throw Error('No state');
      else return success(res)(state);
    })
    .catch(next)

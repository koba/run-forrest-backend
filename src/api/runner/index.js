import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Runner, { schema } from './model'

const router = new Router()
const { user, run } = schema.tree

/**
 * @api {post} /runners Create runner
 * @apiName CreateRunner
 * @apiGroup Runner
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam user Runner's user.
 * @apiParam run Runner's run.
 * @apiSuccess {Object} runner Runner's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Runner not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ user, run }),
  create)

/**
 * @api {get} /runners Retrieve runners
 * @apiName RetrieveRunners
 * @apiGroup Runner
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} runners List of runners.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /runners/:id Retrieve runner
 * @apiName RetrieveRunner
 * @apiGroup Runner
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} runner Runner's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Runner not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /runners/:id Update runner
 * @apiName UpdateRunner
 * @apiGroup Runner
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam user Runner's user.
 * @apiParam run Runner's run.
 * @apiSuccess {Object} runner Runner's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Runner not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ user, run }),
  update)

/**
 * @api {delete} /runners/:id Delete runner
 * @apiName DeleteRunner
 * @apiGroup Runner
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Runner not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router

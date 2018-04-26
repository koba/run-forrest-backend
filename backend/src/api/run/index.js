import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Run, { schema } from './model'

const router = new Router()
const { name, city, country, path, distance } = schema.tree

/**
 * @api {post} /runs Create run
 * @apiName CreateRun
 * @apiGroup Run
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Run's name.
 * @apiParam city Run's city.
 * @apiParam country Run's country.
 * @apiParam path Run's path.
 * @apiParam distance Run's distance.
 * @apiSuccess {Object} run Run's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Run not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ name, city, country, path, distance }),
  create)

/**
 * @api {get} /runs Retrieve runs
 * @apiName RetrieveRuns
 * @apiGroup Run
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} runs List of runs.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /runs/:id Retrieve run
 * @apiName RetrieveRun
 * @apiGroup Run
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} run Run's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Run not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /runs/:id Update run
 * @apiName UpdateRun
 * @apiGroup Run
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Run's name.
 * @apiParam city Run's city.
 * @apiParam country Run's country.
 * @apiParam path Run's path.
 * @apiParam distance Run's distance.
 * @apiSuccess {Object} run Run's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Run not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ name, city, country, path, distance }),
  update)

/**
 * @api {delete} /runs/:id Delete run
 * @apiName DeleteRun
 * @apiGroup Run
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Run not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router

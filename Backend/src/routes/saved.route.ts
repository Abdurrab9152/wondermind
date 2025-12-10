import Router from 'express'
import { removeTrip, saveTrip } from '../controllers/saved.controller'
import { validate } from '../validators/validate'
import { mongoIdPathVariableValidator } from '../validators/mongodb.validator'

const router = Router()



router.route('/save-trip').post(validate, saveTrip)

router.route('/remove-trip/:tripId').delete(mongoIdPathVariableValidator('tripId'), validate, removeTrip)



export default router;
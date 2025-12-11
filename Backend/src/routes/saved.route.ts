import Router from 'express'
import { getAllSaveTrip, removeTrip, saveTrip } from '../controllers/saved.controller'
import { validate } from '../validators/validate'
import { mongoIdPathVariableValidator } from '../validators/mongodb.validator'
import { authenticateJWT } from '../middlewares/auth.middleware'

const router = Router()

router.use(authenticateJWT)

router.route('/save-trip').post(validate, saveTrip)

router.route('/remove-trip/:tripId').delete(mongoIdPathVariableValidator('tripId'), validate, removeTrip)

router.route('/get-saved-trips').get(validate, getAllSaveTrip)



export default router;
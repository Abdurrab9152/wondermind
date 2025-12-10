import Router from 'express'
import { searchTrip } from '../controllers/search.controller'


const router = Router()



router.route('/').get(searchTrip)


export default router
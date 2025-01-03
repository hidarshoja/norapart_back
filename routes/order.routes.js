import express from 'express'
import {index,create,update} from '../controllers/order.controller.js'
import {adminRoute, protectRoute} from "../middlewares/auth.middleware.js";
import {createOrdersValidation, refUpdateOrderValidation} from "../validation/order.validation.js";
import {handleValidationErrors} from "../middlewares/validate.middleware.js";

const router = express.Router()
router.get('/',protectRoute,adminRoute,index)
router.post('/',protectRoute,createOrdersValidation,handleValidationErrors, create)
router.patch('/:address_id',protectRoute,refUpdateOrderValidation,handleValidationErrors, update)

export default  router
import express from 'express'
import {create} from '../controllers/order.controller.js'
import {protectRoute} from "../middlewares/auth.middleware.js";
import {createOrdersValidation} from "../validation/order.validation.js";
import {handleValidationErrors} from "../middlewares/validate.middleware.js";

const router = express.Router()

router.post('/',protectRoute,createOrdersValidation,handleValidationErrors, create)

export default  router
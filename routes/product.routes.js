import express from 'express'
import {index,create,show} from '../controllers/product.controller.js'
import { adminRoute, protectRoute } from '../middlewares/auth.middleware.js'
import { createProductValidation } from '../validation/product.validation.js'
import { handleValidationErrors } from '../middlewares/validate.middleware.js'
import upload from '../libs/product.upload.js'

const router = express.Router()

router.get('/',index)
router.get('/show/:slug',show)

router.post(
    '/',
    protectRoute,
    adminRoute, 
    createProductValidation,
    handleValidationErrors,
    create
)


export default router
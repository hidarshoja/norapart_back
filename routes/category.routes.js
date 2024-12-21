import express from 'express'
import { adminRoute, protectRoute } from '../middlewares/auth.middleware.js'
import { handleValidationErrors } from '../middlewares/validate.middleware.js'
import { create, index } from '../controllers/category.controller.js'
import { createCategoryValidation } from '../validation/category.validation.js'

const router = express.Router()

router.get('/', index)
router.post('/',protectRoute,adminRoute, createCategoryValidation,handleValidationErrors,create)

export default router
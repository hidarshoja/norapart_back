import express from 'express'
import { adminRoute, protectRoute } from '../middlewares/auth.middleware.js'
import { handleValidationErrors } from '../middlewares/validate.middleware.js'
import { create, index, destroy , update, show } from '../controllers/category.controller.js'
import {createCategoryValidation, updateCategoryValidation} from '../validation/category.validation.js'

const router = express.Router()

router.get('/', index)
router.get('/show/:id', show)

router.post('/',protectRoute,adminRoute, createCategoryValidation,handleValidationErrors,create)

router.delete('/:id', protectRoute,adminRoute, destroy)


router.patch('/:id', protectRoute,adminRoute,updateCategoryValidation,handleValidationErrors, update)

export default router
import express from 'express'
import {
    index,
    create,
    show,
    destroy,
    update,
    destroyImage,
    createOffer,
    destroyOffer,
    getOffers
} from '../controllers/product.controller.js'
import { adminRoute, protectRoute } from '../middlewares/auth.middleware.js'
import {createProductValidation, offerValidation, updateProductValidation} from '../validation/product.validation.js'
import { handleValidationErrors } from '../middlewares/validate.middleware.js'

const router = express.Router()

router.get('/',index)
router.get('/offers',getOffers)

router.get('/show/:slug',show)

router.post(
    '/',
    protectRoute,
    adminRoute, 
    createProductValidation,
    handleValidationErrors,
    create
)

router.post('/offers',protectRoute,adminRoute,offerValidation,handleValidationErrors,createOffer)

router.delete('/:slug', protectRoute,adminRoute, destroy)
router.delete('/image/delete/:id/', protectRoute,adminRoute, destroyImage)
router.delete('/offers/delete/:id/', protectRoute,adminRoute, destroyOffer)

router.patch('/:slug', protectRoute,adminRoute, updateProductValidation,handleValidationErrors,update)


export default router
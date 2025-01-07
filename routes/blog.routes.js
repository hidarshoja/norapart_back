import express from 'express';
import {create, createViews, destroy, index, show, update} from "../controllers/blog.controller.js";
import {adminRoute, protectRoute} from "../middlewares/auth.middleware.js";
import {handleValidationErrors} from "../middlewares/validate.middleware.js";
import {addBlogValidation, updateBlogValidation} from "../validation/blog.validation.js";

const router = express.Router();

router.get('/', index)
router.get('/show/:blog_id', show)

router.post('/', protectRoute,adminRoute,addBlogValidation,handleValidationErrors,create)

router.patch('/:blog_id', protectRoute,adminRoute,updateBlogValidation,handleValidationErrors, update)
router.patch('/:blog_id/views', createViews)

router.delete('/:blog_id', protectRoute,adminRoute, destroy)

export default  router;
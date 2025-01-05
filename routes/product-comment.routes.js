import express from 'express';
import {create, destroy, index, update} from "../controllers/product-comment.controller.js";
import {adminRoute, protectRoute} from "../middlewares/auth.middleware.js";
import {handleValidationErrors} from "../middlewares/validate.middleware.js";
import {productCommentValidation} from "../validation/product-comment.validation.js";

const router = express.Router();

router.get('/', protectRoute,adminRoute,index)

router.post('/',protectRoute, productCommentValidation,handleValidationErrors,create)

router.patch('/:comment_id', protectRoute,adminRoute, update)

router.delete('/:comment_id', protectRoute,adminRoute, destroy)

export default  router;
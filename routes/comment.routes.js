import express from 'express';
import {create, reply, destroy, index, update} from "../controllers/comment.controller.js";
import {adminRoute, protectRoute} from "../middlewares/auth.middleware.js";
import {commentVaalidtion, replyCommentValidation} from "../validation/comment.validation.js";
import {handleValidationErrors} from "../middlewares/validate.middleware.js";
const router = express.Router();

router.get('/', index)

router.post('/', protectRoute,adminRoute,commentVaalidtion,handleValidationErrors,create)
router.post('/reply', protectRoute,adminRoute,replyCommentValidation,handleValidationErrors,reply)

router.patch('/:comment_id', protectRoute,adminRoute, update)

router.delete('/:comment_id', protectRoute,adminRoute, destroy)
export default router;
import express from 'express';
import {index, create, update, destroy} from "../controllers/question.controller.js";
import {adminRoute, protectRoute} from "../middlewares/auth.middleware.js";
import {questionVaalidtion, questionVaalidtionUpdate} from "../validation/question.validation.js";
import {handleValidationErrors} from "../middlewares/validate.middleware.js";

const router = express.Router();

router.get('/', index)

router.post('/', protectRoute,adminRoute,questionVaalidtion,handleValidationErrors,create)

router.patch('/:question_id', protectRoute,adminRoute,questionVaalidtionUpdate,handleValidationErrors, update)

router.delete('/:question_id', protectRoute,adminRoute, destroy)


export default  router
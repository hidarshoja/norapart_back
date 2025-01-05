import express from 'express';
import {create,  index, update} from "../controllers/contact.controller.js";
import {adminRoute, protectRoute} from "../middlewares/auth.middleware.js";
import {handleValidationErrors} from "../middlewares/validate.middleware.js";
import {addContactValidation, replyContactValidation} from "../validation/contact.validation.js";

const router = express.Router();

router.get('/',protectRoute,adminRoute,index)

router.post('/', addContactValidation,handleValidationErrors,create)

router.patch('/:contact_id', protectRoute,adminRoute, update)


export default  router;
import express from 'express';
import {index,create,update,destroy} from '../controllers/notification.controller.js';
import {adminRoute, protectRoute} from "../middlewares/auth.middleware.js";
import {addNotificationValidation, updateNotificationValidate} from "../validation/notification.validation.js";
import {handleValidationErrors} from "../middlewares/validate.middleware.js";



const route = express.Router();

route.get('/',protectRoute, index)
route.post('/',protectRoute,adminRoute,addNotificationValidation,handleValidationErrors, create)
route.patch('/:notification_id',protectRoute,adminRoute,updateNotificationValidate,handleValidationErrors, update)
route.delete('/:notification_id',protectRoute,adminRoute, destroy)


export default route;
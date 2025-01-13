import express from 'express';
import {adminRoute, protectRoute} from "../middlewares/auth.middleware.js";
import {index, show,changePassword, changeProfile, changeRole, changeStatus} from "../controllers/user.controllers.js";
import {changePasswordValidation, updateUserValidation} from "../validation/user.validation.js";
import {handleValidationErrors} from "../middlewares/validate.middleware.js";
const router = express.Router();

router.get('/', protectRoute,adminRoute,index)
router.get('/:user_id', protectRoute,adminRoute,show)

router.patch('/:user_id/change-status', protectRoute,adminRoute,changeStatus)
router.patch('/:user_id/change-password', protectRoute,changePasswordValidation,handleValidationErrors,changePassword)
router.patch('/:user_id/change-profile', protectRoute,updateUserValidation,handleValidationErrors,changeProfile)
router.patch('/:user_id/change-role', protectRoute,changeRole)

export default router;
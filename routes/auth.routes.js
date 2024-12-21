import express from "express";
import { getProfile, login, logout, refreshToken, signup } from "../controllers/auth.controller.js";
import { validateLogin, validateSignup } from "../validation/auth.validation.js";
import { handleValidationErrors } from "../middlewares/validate.middleware.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

// router.use(handleValidationErrors);

router.post("/signup", validateSignup,handleValidationErrors,signup);
router.post("/login", validateLogin, handleValidationErrors, login);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);


router.get("/profile", protectRoute,getProfile);

export default router;
import express from "express";
import { index, show } from "../controllers/torob.controller.js";
const router = express.Router();

router.get("/products", index);
router.get("/product/:slug", show);

export default router;


import express from "express";
import { index, show } from "../controllers/torob.controller.js";
const router = express.Router();

router.post("/products", index);
router.post("/product/:slug", show);

export default router;


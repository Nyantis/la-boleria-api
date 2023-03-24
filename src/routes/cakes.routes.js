import { Router } from "express";
import { create } from "../controllers/cakes.controllers.js";
import { cakePostMiddleware } from "../middlewares/cakes.middlewares.js";

const router = Router()

router.post("/cakes", cakePostMiddleware, create)

export default router
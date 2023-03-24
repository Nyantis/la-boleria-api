import { Router } from "express";
import { create } from "../controllers/cakes.controllers.js";
import { idParamSanitization } from "../middlewares/generics.js";
import { simplePostMiddleware } from "../middlewares/cakes.middlewares.js";

const router = Router()

router.post("/cakes", simplePostMiddleware, create)

export default router
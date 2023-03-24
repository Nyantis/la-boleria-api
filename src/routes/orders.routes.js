import { Router } from "express";
import { create } from "../controllers/orders.controllers.js";
import { idParamSanitization } from "../middlewares/generics.js";
import { orderPostMiddleware } from "../middlewares/orders.middlewares.js";

const router = Router()

router.post("/order", orderPostMiddleware, create)
router.get("/orders")
router.get("/orders/:id", idParamSanitization)

export default router
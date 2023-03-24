import { Router } from "express";
import { clientPostMiddleware } from "../middlewares/clients.middlewares.js";
import { create, search } from "../controllers/clients.controllers.js";
import { idParamSanitization } from "../middlewares/generics.js";

const router = Router()

router.post("/clients", clientPostMiddleware, create)
router.get("/clients/:id/orders", idParamSanitization, search)

export default router
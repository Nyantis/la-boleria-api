import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import clientsRoutes from "./routes/clients.routes.js"
import cakesRoutes from "./routes/cakes.routes.js"
import ordersRoutes from "./routes/orders.routes.js"

//config//
dotenv.config();
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());

//routes//
app.use([
  clientsRoutes,
  cakesRoutes,
  ordersRoutes,
]);

///init///
app.listen(port, () => console.log(`Server running in port: ${port}`));
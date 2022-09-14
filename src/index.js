import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import db from './database/Mongo.js'
import authRouter from "./routers/Auth.routes.js";
import adminRouter from "./routers/Admin.routes.js"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json())

app.use(authRouter);
app.use(adminRouter);

const port = process.env.PORT;

app.listen(port, () => console.log(`Magic happens @ http://localhost:${port}...`));

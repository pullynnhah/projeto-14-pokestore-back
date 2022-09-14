import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import db from './database/Mongo.js'
import authRouter from "./routers/Auth.routes.js";
import adminRouter from "./routers/Admin.routes.js";
import pokemonsRouter from "./routers/Pokemons.routes.js"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json())

app.use(authRouter);
app.use(adminRouter);
app.use(pokemonsRouter);

const port = process.env.PORT;

app.listen(port, () => console.log(`Magic happens @ http://localhost:${port}...`));

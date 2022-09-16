import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRouter from "./routers/Auth.routes.js";
import adminRouter from "./routers/Admin.routes.js";
import pokemonsRouter from "./routers/Pokemons.routes.js"
import pokemonRouter from "./routers/Pokemon.routes.js";
import purchaseHistory from "./routers/PurchaseHistory.routes.js"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRouter);
app.use(adminRouter);
app.use(pokemonsRouter);
app.use(pokemonRouter);
app.use(purchaseHistory)

const port = process.env.PORT;

app.listen(port, () => console.log(`Magic happens @ http://localhost:${port}...`));

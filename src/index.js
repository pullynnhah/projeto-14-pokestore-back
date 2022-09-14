import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import authRouter from "./routers/Auth.routes.js"; 

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json())

app.use(authRouter);
 
app.get("/test", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT;
app.listen(port, () => console.log(`Magic happens @ http://localhost:${port}...`));

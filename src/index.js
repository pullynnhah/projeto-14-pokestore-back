import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
app.use(cors());

app.get("/test", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT;
app.listen(port, () => console.log(`Magic happens @ http://localhost:${port}...`));

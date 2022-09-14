import db from "../database/Mongo.js";
import joi from "joi";
import {stripHtml} from "string-strip-html";
import bcrypt from "bcrypt";

import {StatusCodes} from "http-status-codes";

const newUserSchema = joi.object({
  name: joi.string().required().trim(),
  email: joi.string().email().trim().required(),
  password: joi.string().trim().required(),
});

const signup = async (req, res) => {
  let user;
  const {name, email, password} = req.body;
  const newUser = {
    name: stripHtml(name).result,
    email: stripHtml(email).result,
    password: stripHtml(password).result,
  };
  const validation = newUserSchema.validate(newUser, {abortEarly: false});

  if (validation.error) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(validation.error.message);
  }
  newUser.password = bcrypt.hashSync(password, 15);
  try {
    user = await db.collection("users").findOne({email: newUser.email});
  } catch (error) {
    console.log(error);
    return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
  if (user !== null) {
    return res.status(StatusCodes.CONFLICT).send("Este endereço de e-mail já possui um cadastro.");
  }
  try {
    await db.collection("users").insertOne(newUser);
    res.sendStatus(201);
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

export {signup};

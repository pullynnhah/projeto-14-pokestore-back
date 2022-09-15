import db from "../database/Mongo.js";
import joi from "joi";
import { stripHtml } from "string-strip-html";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import { ObjectId } from "mongodb";
import { v4 as uuidv4 } from "uuid";

const newUserSchema = joi.object({
  name: joi.string().required().trim(),
  email: joi.string().email().trim().required(),
  password: joi.string().trim().required(),
});

const userSchema = joi.object({
  email: joi.string().required().trim(),
  password: joi.string().required().trim()
})

const signup = async (req, res) => {
  let user;
  const { name, email, password } = req.body;
  const newUser = {
    name: stripHtml(name).result,
    email: stripHtml(email).result,
    password: stripHtml(password).result,
  };
  const validation = newUserSchema.validate(newUser, { abortEarly: false });

  if (validation.error) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(validation.error.message);
  }
  newUser.password = bcrypt.hashSync(password, 15);
  newUser.userPicture = Math.floor(Math.random() * 4) + 1;
  try {
    user = await db.collection("users").findOne({ email: newUser.email });
  } catch (error) {
    console.log(error);
    return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
  if (user !== null) {
    return res.status(StatusCodes.CONFLICT).send("Email adress already has been singup.");
  }
  try {
    await db.collection("users").insertOne(newUser);
    res.sendStatus(StatusCodes.CREATED);
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  let authentication = false;
  let registeredUser;
  let username;
  const user = {
    email: stripHtml(email).result,
    password: stripHtml(password).result
  };
  const validation = userSchema.validate(user, { abortEarly: false });
  if (validation.error) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(validation.error.message);
  }
  try {
    registeredUser = await db.collection("users").findOne({ email: user.email });
    if (registeredUser === null) {
      return res.status(StatusCodes.FORBIDDEN).send("Wrong email or password.");
    } else {
      authentication = bcrypt.compareSync(user.password, registeredUser.password);
      username = registeredUser.name;
    }
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
  if (!authentication) {
    return res.status(StatusCodes.FORBIDDEN).send("Wrong email or password.");
  } else {
    const token = uuidv4();
    const { _id, userPicture } = registeredUser;
    const userId = _id
    try {
      const existentSection = await db.collection("sections").findOne({ userId: `ObjectId(${_id})` });
      if (existentSection !== null) {
        await db.collection("sections").updateOne({ userId: ObjectId(_id) }, { $set: { token: token } });
      } else {
        await db.collection("sections").insertOne({ userId: ObjectId(_id), token: token });
      }
    } catch (error) {
      console.log(error.message);
      return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
    return res.status(StatusCodes.OK).send({ token, userId, userPicture });
  }
} 



export { signup, login };

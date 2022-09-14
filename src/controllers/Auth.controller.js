import db from "../database/Mongo.js";
import joi from "joi";
import { stripHtml } from "string-strip-html";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

const newUserSchema = joi.object({
    name: joi.string().required().trim(),
    email: joi.string().email().trim().required(),
    password: joi.string().trim().required()
});

const signup = async (req, res) => {
    let user;
    const { name, email, password } = req.body;
    const newUser = {
        name: stripHtml(name).result,
        email: stripHtml(email).result,
        password: stripHtml(password).result
    };
    const validation = newUserSchema.validate(newUser, { abortEarly: false });

    if (validation.error) {
        return res.status(422).send(validation.error.message);
    }
    const hashPassword = bcrypt.hashSync(password, 15);
    newUser.password = hashPassword;
    try {
        user = await db.collection("users").findOne({ email: newUser.email });
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
    if (user !== null) {
        return res.status(409).send("Este endereço de e-mail já possui um cadastro.");
    }
    try {
        await db.collection("users").insertOne(newUser);
        res.sendStatus(201);
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(500);
    }
};


export { signup };
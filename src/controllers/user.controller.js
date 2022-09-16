import db from "../database/Mongo.js";
import joi from "joi";
import { stripHtml } from "string-strip-html";
import { StatusCodes } from "http-status-codes";
import { ObjectId } from "mongodb";


const userContent = async (req, res) => {
    let section;
    const userId = req.headers.user;

    try {
        const userData = await db.collection("users").findOne({ _id: ObjectId(userId) });
        delete userData.password;
        res.status(StatusCodes.OK).send(userData)
    } catch (error) {
        console.log(error);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }




};

export { userContent }
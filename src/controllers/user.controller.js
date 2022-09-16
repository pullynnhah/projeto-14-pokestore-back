import db from "../database/Mongo.js";
import joi from "joi";
import { stripHtml } from "string-strip-html";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import { ObjectId } from "mongodb";
import { v4 as uuidv4 } from "uuid";


const userContent = async (req, res) => {
    let section;
    const userId = req.headers.user;

    return res.sendStatus(200)
  
    try {
      section = await db.collection("sections").findOne({ userId: ObjectId(userId) });
    } catch (error) {
      console.log(error);
      return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  
  };
  
  export { userContent }
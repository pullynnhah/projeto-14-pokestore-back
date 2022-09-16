import { StatusCodes } from "http-status-codes";
import db from "../database/Mongo.js";
import { ObjectId } from "mongodb";


const authorization = async (req, res, next) => {
    const userId = req.headers.user;
    let token = req.headers.authorization;
    if (!token) {
        return res.status(StatusCodes.BAD_REQUEST).send("token is missing");
    }
    token = token.replace("Bearer ", "");
    let section;

    try {
        section = await db.collection("sections").findOne({ userId: ObjectId(userId) });
    } catch (error) {
        console.log(error);
        return res.sendStatus(StatusCodes.BAD_REQUEST);
    }
    if (section === null) {
        return res.sendStatus(StatusCodes.NOT_FOUND);
    }
    if (section.token !== token) {
        res.sendStatus(StatusCodes.UNAUTHORIZED);
    }

    next();

};

export default authorization;
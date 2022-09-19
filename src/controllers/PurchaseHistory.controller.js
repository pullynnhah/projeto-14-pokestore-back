import db from "../database/Mongo.js";
import { StatusCodes } from "http-status-codes";

const getHistory = async (req,res) =>{
    const {user} = req.headers;
    try {
        let historyCartUser = await db.collection('Carts').find({userId:Number(user)}).toArray();
        historyCartUser = historyCartUser.filter(history=>history.purchaseDate!==null);
        res.send(historyCartUser).status(StatusCodes.ACCEPTED); 
    } catch (error) {
        console.log(error.message);
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export {getHistory}
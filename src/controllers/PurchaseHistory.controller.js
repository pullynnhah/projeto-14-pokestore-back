import db from "../database/Mongo.js";
import { StatusCodes } from "http-status-codes";

const getHistory = async (req,res) =>{
    const {userid} = req.headers;
    try {
        let historyCartUser = await db.collection('Carts').find({userId:Number(userid)}).toArray();
        historyCartUser = historyCartUser.filter(history=>history.purchaseDate!==null);
        res.send(historyCartUser).status(StatusCodes.ACCEPTED); 
    } catch (error) {
        console.log(error.message);
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR,"lala");
    }
}

export {getHistory}
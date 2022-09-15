import db from "../database/Mongo.js";
import { StatusCodes } from "http-status-codes";

const getPokemons = async (req, res) => {
    const filter = req.headers;
    console.log(filter)
    try {
        let pokemons;
        if(filter.type === undefined || filter.type === 'all'){
            pokemons = await db.collection('Pokemons').find().toArray();
        } else{
            pokemons = await db.collection('Pokemons').find({$or:[{type1:filter.type},{type2:filter.type}]}).toArray();
        }
        res.send(pokemons).status(StatusCodes.ACCEPTED);
    } catch (error) {
        console.log(error.message)
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export { getPokemons };
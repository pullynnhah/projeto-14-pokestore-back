import db from "../database/Mongo.js";
import { StatusCodes } from "http-status-codes";

const getPokemons = async (req, res) => {
    const filter = req.body;
    console.log(filter)
    try {
        let pokemons;
        let aux;
        if(filter.type === undefined){
            pokemons = await db.collection('Pokemons').find().toArray();
        } else{
            pokemons = await db.collection('Pokemons').find({type1:filter.type}).toArray();
            aux = await db.collection('Pokemons').find({type2:filter.type}).toArray();
            pokemons = pokemons.concat(aux);
        }
        res.send(pokemons).status(StatusCodes.ACCEPTED);
    } catch (error) {
        console.log(error.message)
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export { getPokemons };
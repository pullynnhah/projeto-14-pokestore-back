import db from "../database/Mongo.js";
import { StatusCodes } from "http-status-codes";

const getPokemons = async (req, res) => {
    const filter = req.query;
    console.log(filter)
    try {
        let pokemons;
        if(filter.type === undefined || filter.type === 'all'){
            pokemons = await db.collection('Pokemons').find().toArray();
        } 
        if(filter.type !== 'others' && filter.type!=='all' && filter.type!==undefined && filter.type!=='legendary'){
            pokemons = await db.collection('Pokemons').find({$or:[{type1:filter.type},{type2:filter.type}]}).toArray();
        }
        if(filter.type === 'others'){
            pokemons = await db.collection('Pokemons')
            .find({$or:[{type1:{$in:['dark','flying','dragon','rock']}},{type2:{$in:['dark','flying','dragon','rock']}}]})
            .toArray();
        }
        if(filter.type ==='legendary'){
            pokemons = await db.collection('Pokemons').find({isLegendary:true}).toArray();
        }
        res.send(pokemons).status(StatusCodes.ACCEPTED);
    } catch (error) {
        console.log(error.message,"lala")
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export { getPokemons };
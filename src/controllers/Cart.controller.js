import db from "../database/Mongo.js";
import {StatusCodes} from "http-status-codes";
import joi from "joi";

const quantitySchema = joi.object({
  quantity: joi.number().integer().min(1),
});

const postProduct = async (req, res) => {
  const {pokemonid: pokemonId, userid: userId} = req.headers;

  const validation = quantitySchema.validate(req.body);
  if (validation.error) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(validation.error.message);
  }
  const {quantity} = req.body;

  const data = {
    pokemonId,
    quantity,
    isInCart: true,
    orderId: null,
  };

  try {
    await db.collection("Carts").insertOne(data);
    return res.sendStatus(StatusCodes.CREATED);
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

export {postProduct, getProduct, removeProduct, checkoutProduct};

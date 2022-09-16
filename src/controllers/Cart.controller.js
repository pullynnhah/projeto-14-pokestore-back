import db from "../database/Mongo.js";
import {StatusCodes} from "http-status-codes";
import joi from "joi";
import {ObjectId} from "mongodb";
import moment from "moment";

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
    userId: ObjectId(userId),
    pokemonId: ObjectId(pokemonId),
    quantity,
    isActive: true,
    isSold: false,
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

const getProduct = async (req, res) => {};

const removeProduct = async (req, res) => {
  const {cartid: cartId} = req.headers;
  try {
    await db
      .collection("Carts")
      .updateOne(
        {$and: [{cartId: ObjectId(cartId)}, {isActive: true}, {isSold: false}]},
        {$set: {isActive: false}}
      );
    res.sendStatus(StatusCodes.OK);
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const checkoutProducts = async (req, res) => {
  const {userid: userId} = req.headers;
  moment().locale("en");

  try {
    const {insertedId} = db.collection("Orders").insertOne({
      purchaseDate: moment().format("L"),
      deliveryDate: moment().add(7, "days").format("L"),
    });

    await db
      .collection("Carts")
      .updateOne(
        {$and: [{userId: ObjectId(userId)}, {isActive: true}, {isSold: false}]},
        {$set: {isActive: false, isSold: true, orderId: ObjectId(insertedId)}}
      );
    res.sendStatus(StatusCodes.OK);
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

export {postProduct, getProduct, removeProduct, checkoutProducts};

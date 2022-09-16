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
    const {insertedId} = await db.collection("Carts").insertOne(data);
    return res.status(StatusCodes.CREATED).send({
      cartId: ObjectId(insertedId),
    });
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const getProducts = async (req, res) => {
  const {userid: userId} = req.headers;
  console.log(userId)
  const userFilter = {userId: ObjectId(userId)};
  const {mode} = req.query;
  console.log(userFilter)

  let filter = userFilter;
  if (mode === "cart") {
    filter = {$and: [userFilter, {isActive: true}]};
  } else if (mode === "history") {
    filter = {$and: [userFilter, {isSold: true}]};
  }

  try {
    const carts = await db.collection("Carts").find(filter).toArray();

    const data = await Promise.all(
      carts.map(async cart => {
        const pokemon = await db.collection("Pokemons").findOne({_id: ObjectId(cart.pokemonId)});
        if (pokemon === null) {
          console.log(cart.pokemonId);
          return null;
        }

        return {
          cartId: ObjectId(cart._id),
          quantity: cart.quantity,
          image: pokemon.image,
          isLegendary: pokemon.isLegendary,
          name: pokemon.name,
          type: pokemon.type1,
          price: pokemon.price,
        };
      })
    );

    res.status(StatusCodes.OK).send(data.filter(item => item !== null));
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const removeProduct = async (req, res) => {
  const {id: cartId} = req.params;
  try {
    await db
      .collection("Carts")
      .updateOne(
        {$and: [{_id: ObjectId(cartId)}, {isActive: true}, {isSold: false}]},
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
  console.log(moment().format("L"));
  try {
    const {insertedId} = db.collection("Orders").insertOne({
      purchaseDate: moment().format("L"),
      deliveryDate: moment().add(7, "days").format("L"),
    });

    await db
      .collection("Carts")
      .updateMany(
        {$and: [{userId: ObjectId(userId)}, {isActive: true}, {isSold: false}]},
        {$set: {isActive: false, isSold: true, orderId: ObjectId(insertedId)}}
      );
    res.sendStatus(StatusCodes.OK);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(StatusCodes.OK);
    return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

export {postProduct, getProducts, removeProduct, checkoutProducts};

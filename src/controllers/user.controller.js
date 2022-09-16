import db from "../database/Mongo.js";
import joi from "joi";
import { stripHtml } from "string-strip-html";
import { StatusCodes } from "http-status-codes";
import { ObjectId } from "mongodb";


const userContent = async (req, res) => {
    const userId = req.headers.user;

    try {
        const userData = await db.collection("users").findOne({ _id: ObjectId(userId) });
        delete userData.password;
        res.status(StatusCodes.OK).send(userData)
    } catch (error) {
        console.log(error);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

const updateUser = async (req, res) => {
    const userId = req.headers.user;
    let {
        adress: adress,
        adressNumber: adressNumber,
        city: city,
        contact: contact,
        name: name,
        neighborhood: neighborhood,
        zipCode: zipCode,
        userPicture: userPicture
    } = req.body;


    adress = adress? stripHtml(adress).result : adress;
    city = city? stripHtml(city).result : city;
    contact = contact? stripHtml(contact).result : contact;
    name = name? stripHtml(name).result : name;
    neighborhood = neighborhood? stripHtml(neighborhood).result : neighborhood;

    const body = { name, adress, adressNumber, neighborhood, city, zipCode, contact, userPicture }

    console.log(body);

    try {
        await db.collection("users").updateOne({ _id: ObjectId(userId) }, { $set: body });
        return res.sendStatus(StatusCodes.OK);
    } catch (error) {
        console.log(error);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export { userContent, updateUser }
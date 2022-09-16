import { StatusCodes } from "http-status-codes";

function hasUser(req, res, next) {
    const userId = req.headers.user;
    if(!userId) {
        return res.status(StatusCodes.BAD_REQUEST).send("user is missing");
    } else {
        next();
    }
};

export default hasUser;
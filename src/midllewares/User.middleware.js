import { StatusCodes } from "http-status-codes";

function hasUser(req, res, next) {
    const userId = req.headers.user;
    if(!userId) {
        return res.status(StatusCodes.NOT_FOUND).send("user is missingggg");
    } else {
        next();
    }
};

export default hasUser;
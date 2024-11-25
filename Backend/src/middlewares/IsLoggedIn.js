import jwt from "jsonwebtoken"
import dotenv from "dotenv"

const isLoggedIn = (req, res, next) => {
    try {
        const jwtToken = req.headers.authorization?.split(" ")[1];
        const user = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY)
        req.userExist = user
        next()
    }
    catch (error) {
        console.log(error)
        next(new Error("Please login first"))
    }
}

export default isLoggedIn
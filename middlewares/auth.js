import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Kindly Log In First" });
        }
        jwt.verify(token, process.env.secret, (error) => {
            if (error) {
                return res.status(403).json({ message: "User is not authorized" });
            }
            console.log("hi");
            next();
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" });
    }
}

export default auth;
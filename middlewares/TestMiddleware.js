import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();
export default class Middleware {
    static test = (req, res, next) => {
        try {
            console.log("Verifying token...");
            const token = req.header("Authorization").replace('Bearer ', '');
            const decoded = jwt.verify(token, process.env.SECRET);
            console.log(decoded.id);
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({ error: 'Access denied, token is invalid' });
        }
    }
    static test2=(req,res,yokhl)=>{
        try{
            console.log("yokh2");
            // const token = req.headers.authorization.split(' ')[1];
            // jwt.verify(token,process.env.SECRET);
            yokhl();
        }catch(error){
            res.status(401).json({error: 'Access denied, token is invalid'});
        }
    }
}

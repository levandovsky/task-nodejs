// {"full_name": "Test01 Test01",
//  "password": "12345678",
//  "email": "test01@emai.com"
// }


import {Router} from 'express';
import {body} from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import joi from "joi";
import dotenv from "dotenv";

import {USERS_TABLE} from "../utils/creat-tables.js"
import { sendError } from "../utils/error.js";
import {validateErrorsMidleware} from "../utils/validateErrorsMidleware.js"

const router = Router();
dotenv.config();

const userInfoSchema = joi.object({
    full_name: joi.string().max(256),
    email: joi.string().max(256),
    password: joi.string().min(8)
})

router.post("/register", 
    body(["email"]).isEmail(),
    validateErrorsMidleware,
    async (req, res) =>{
        const {mysql} = req.app;
        
        try {
            const {full_name, email, password} = await userInfoSchema.validateAsync(req.body);
            const hashed = await bcrypt.hash(password, 10);
            const query = `INSERT INTO ${USERS_TABLE} (full_name, email, password) VALUES (?, ?, ?);`;
    
            await mysql.query(query, [full_name, email, hashed]);
            
            res.send({
                registered: email,
            });
            
        } catch (error) {
            sendError(error, res);
        }
    });

router.post("/login", 
    body(["email", "password"], "Missing param").exists().notEmpty(),
    body(["password"]).isString(),
    body(["email"]).isEmail(),
    validateErrorsMidleware,
    async (req, res) => {
    
    const {mysql} = req.app;
    const {email, password} = req.body;
    
    
    
    try {
        const query = `SELECT * FROM ${USERS_TABLE} WHERE email = ?`;
        const [[user]] = await mysql.query(query, [email]);
        
        if (!user) {
            return res.status(401).send({
                error: "Incorrect username or password",
            });
        }

        // const validPw = await bcrypt.compare(password, user[0].password);
        const validPw = await bcrypt.compare(password, user.password);

        if (!validPw) {
            return res.status(402   ).send({
                error: "Incorrect username or password",
            });
        }

        console.log(user.id);
        // const token = jwt.sign({user_id: user[0].id}, process.env.TOKEN_SECRET);
        const token = jwt.sign({user_id: user.id}, process.env.TOKEN_SECRET);

        res.status(200).send({
            token,
        });
           
    } catch (error) {
        sendError(error, res);
    }
    
});    

export default router;

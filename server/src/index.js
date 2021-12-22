import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import mysql from "mysql2/promise";

import {creatTableUsers, creatTableGroups, creatTableBills, creatTableAccounts} from "./utils/creat-tables.js";
import userRouter from "./routes/users-route.js";
import accountsRouter from "./routes/accounts-route.js";

dotenv.config();


const main = async () => {
    try {
        const {
            PORT = 8080,
            MYSQL_HOST = "localhost",
            MYSQL_PORT,
            MYSQL_USER,
            MYSQL_PW,
            MYSQL_DB
        } = process.env;
        
        const app = express();
        app.use(express.json());
        app.use(cors());
        app.use(morgan("dev"));
        
        console.log("Mysql connecting...");
        
        const connection = await mysql.createConnection({
            host: MYSQL_HOST,
            port: MYSQL_PORT,
            user: MYSQL_USER,
            password: MYSQL_PW,
            database: MYSQL_DB
        });
        
        app.mysql = connection;
        
        console.log("Mysql connected successfull");
     
        await creatTableUsers(connection);
        await creatTableGroups(connection);
        await creatTableBills(connection);
        await creatTableAccounts(connection);
 
        app.use("/auth", userRouter);
        app.use("/accounts", accountsRouter);

        
        app.listen(PORT, () => {
            console.log(`App runnig on: http://localhost/${PORT}`);
        });
        
        process.on("exit", async () => {
            connection.end();
        });
        
    } catch (error) {
        console.error(error);  
    }
};

main();

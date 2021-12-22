import {Router} from 'express';
import {body, param} from "express-validator";
import { sendError } from "../utils/error.js";
import {validateErrorsMidleware} from "../utils/validateErrorsMidleware.js"
import { loggedInValidator, idValidator } from "../utils/validators.js";

import {BILLS_TABLE} from "../utils/creat-tables.js"

const router = Router();    

router.get("/id/:id",
    loggedInValidator,
    param("id").custom(idValidator).notEmpty(),
    validateErrorsMidleware, 
    async (req, res) => {
        const {mysql} = req.app;
        const group_id = Number(req.params.id);
        
        try {
            const query = `SELECT amount, description FROM ${BILLS_TABLE} 
            WHERE group_id = ?`;
            
            const [bills] = await mysql.query(query, [group_id]);
            
            res.status(200).send({bills});
            
        } catch (error) {
            sendError(error, res);
        }
    });
 
    router.post("/",  
        loggedInValidator,
        body(["group_id", "amount", "description"], "Missing param").exists().notEmpty(),
        body(["group_id"]).isFloat(),
        validateErrorsMidleware,
        async (req, res) => {
            const {mysql} = req.app;
            const {description} = req.body;
            const group_id = Number(req.body.group_id);
            const amount = Number(req.body.amount);
            
            try {
                
                const [{insertId}] = await mysql.query(`
                INSERT INTO ${BILLS_TABLE} (group_id, amount, description) VALUES(?, ?, ?)
                `, [group_id, amount, description]);
                
                res.status(200).send({
                    added: {...req.body, id: insertId}}
                );
                
            } catch (error) {
                sendError(error, res);
            }
    
        });

export default router;

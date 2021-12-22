
import {Router} from 'express';
import {body, param} from "express-validator";
import { sendError } from "../utils/error.js";
import {validateErrorsMidleware} from "../utils/validateErrorsMidleware.js"
import { loggedInValidator } from "../utils/validators.js";

import {GROUPS_TABLE, ACCOUNTS_TABLE} from "../utils/creat-tables.js"

const router = Router();    

router.get("/",
    loggedInValidator,
    async (req, res) => {
        const {mysql} = req.app;
        const {user_id} = req.token;
        
        try {
            const query = `SELECT gr.id, gr.name FROM ${ACCOUNTS_TABLE} ac
                LEFT JOIN \`${GROUPS_TABLE}\` gr ON ac.group2_id = gr.id
            WHERE ac.user_id = ?`;
            
            const [groups] = await mysql.query(query, [user_id]);
            
            res.status(200).send({groups});
            console.log(groups);
        } catch (error) {
            sendError(error, res);
        }
    });
 
router.get("/groups",
    loggedInValidator,
    async (req, res) => {
        const {mysql} = req.app;
        const {user_id} = req.token;
        
        try {
            const query = `SELECT gr.id, gr.name FROM \`${GROUPS_TABLE}\` gr WHERE gr.id NOT IN (SELECT ac.group2_id FROM ${ACCOUNTS_TABLE} ac WHERE ac.user_id = ?)`;
             
            const [groups] = await mysql.query(query, [user_id]);
            
            res.status(200).send({groups});
            
        } catch (error) {
            sendError(error, res);
        }
    });
 
router.post("/",  
    loggedInValidator,
    body(["group_id"], "Missing param").exists().notEmpty(),
    body(["group_id"]).isFloat(),
    validateErrorsMidleware,
    async (req, res) => {
        const {mysql} = req.app;
        const {user_id} = req.token;
        const group_id = Number(req.body.group_id);
        
        try {
            
            // insertedId - objektas su insertId, affectedRows ir t.t. properties:
            const [{insertId}] = await mysql.query(`
            INSERT INTO ${ACCOUNTS_TABLE} (group2_id, user_id) VALUES(?, ?)
            `, [group_id, user_id]);
            
            res.status(200).send({
                added: {group_id, user_id, id: insertId}}
            );
            
        } catch (error) {
            sendError(error, res);
        }
 
    });
 
    export default router;
    
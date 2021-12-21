import {Router} from 'express';
import {body, param} from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import joi from "joi";
import dotenv from "dotenv";

import {USERS_TABLE} from "../utils/creat-tables.js"

const router = Router();
dotenv.config();

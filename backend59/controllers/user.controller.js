import { compareHash, hashPassword } from "../crypt/password.crypt.js";
import jwt from 'jsonwebtoken';
import { GeneralServerError } from "../exceptions/GeneralErrors.js";
import { createTransport } from "nodemailer";
import { sendEmail } from "../transporter/index.js";
import fs from 'fs';
import path from 'path';
import { renderHTML } from "../handlebars/index.js";
import { fileURLToPath } from "url";
import * as userService from '../services/user.service.js'
import * as categoriesService from '../services/categories.service.js'
import {DEFAULT_CATEGORIES} from '../consts/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//  GET /user
export const getInfo = async (req, res, next) => {
    // req.user has been created by token checking middleware
    const user = await userService.getExtendedByEmail(req.user.email);
    if (user) {
        res.status(200).json({
            status: 'OK',
            user
        });
    } else {
        next(new GeneralServerError(401, 'Unauthorized access'))
    }
}

const activationCode = 2323232323;

//  GET /user/activate
export const activate = async (req, res, next) => {
    const user = await userService.getByEmail(req.query.email);
    if (!!user && req.query.code == user._id.toString()) {
        //change status of user as Activated in the database
        await userService.setActive(req.query.email)
        //respond with page
        const messageHTML = renderHTML(path.join(__dirname, '../views/activation_ok.handlebars'), {});
        res.send(messageHTML);
    }
    else {
        next(new GeneralServerError(400, 'Activation error'))
    }
}

//  POST /user/login
export const login = async (req, res, next) => {
    //check password
    const user = await userService.getByEmail(req.body.email);
    const isAuth = (user) && compareHash(req.body.password, user.hashedPassword);

    if (isAuth) {       
        //create a token for the user
        const token = jwt.sign({ email: req.body.email, id: user._id.toString() }, process.env.SECRET_KEY_TOKEN, { expiresIn: '48h' });
        //get extended user data
        const userExtended = await userService.getExtendedByEmail(req.body.email); 
        res.status(200).json({
            status: 'OK',
            message: 'Login successful',
            user: userExtended,
            token: token,
        });
    } else {
        next(new GeneralServerError(401, 'Unauthorized access'))
    }
}

// POST /user/register
export const register = async (req, res, next) => {
    console.log('register is being processed');
    var messageHTML = null;
    try {
        //check email in database; reject if email exists
        const user = await userService.getByEmail(req.body.email);
        const userExists = !!user;
        if (userExists) {
            if (!user.activated) {
                messageHTML = renderHTML(path.join(__dirname, '../views/activation.handlebars'),
                    { link: `http://localhost:3000/api/user/activate?code=${user._id.toString()}&email=${user.email}` })
                await sendEmail(user.email, 'Activation confirmation', '', messageHTML);
                next(new GeneralServerError(409, 'User already exists. Proceed with activation'));
            } else {
                next(new GeneralServerError(409, 'User already exists'));
            }
            return;
        }

        console.log('email is not found in db')

        //hash and erase password
        req.body.hashedPassword = await hashPassword(req.body.password);
        req.body.password = 'xxxxxxxx';
        if (!req.body.hashedPassword) {
            next(new GeneralServerError(500, 'Hashing error'))
        }

        console.log('password is hashed:', req.body.hashedPassword)

        //add user to the database (non-activated at this stage)
        const userData = {
            name: req.body.name,
            email: req.body.email,
            image: "",
            hashedPassword: req.body.hashedPassword,
            startBalance: req.body.startBalance,
            activated: false
        };

        console.log('userService.add.userData=', userData)
        const addResult = await userService.add(userData);//addResult.insertedId is the id of added user
        console.log('addResult=', addResult);
        if (!addResult.acknowledged) {
            next(new GeneralServerError(500, 'Database error'))
        }


        //create default categories for the user
        const defaultCategories = DEFAULT_CATEGORIES.map((item)=>{
            return {
                ...item,
                userId: addResult.insertedId,
                default : true
            }
        })
        await categoriesService.addMany(defaultCategories);

        //send invitation to activate email to the user
        // messageHTML = renderHTML(path.join(__dirname, '../views/activation.handlebars'),
        //     { link: `http://localhost:3000/api/user/activate?code=${addResult.insertedId}&email=${req.body.email}` })
        // await sendEmail(req.body.email, 'Activation confirmation', '', messageHTML);

        //get extended user data
        const userExtended = await userService.getExtendedByEmail(req.body.email); 

        //create a token for the user
        const token = jwt.sign({ email: req.body.email, id: addResult.insertedId.toString() }, process.env.SECRET_KEY_TOKEN, { expiresIn: '48h' });
        res.status(200).json({
            status: 'OK',
            message: 'Proceed with activation',
            user: userExtended,
            token: token,
        });
    } catch (error) {
        next(new GeneralServerError(500, error.message))
    }
}

export const authGoogle = (req, res) => {
}
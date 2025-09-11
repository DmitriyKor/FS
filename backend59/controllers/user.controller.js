import { hashPassword } from "../crypt/password.crypt.js";
import jwt from 'jsonwebtoken';
import { GeneralServerError } from "../exceptions/GeneralErrors.js";
import { createTransport } from "nodemailer";
import { sendEmail } from "../transporter/index.js";
import fs from 'fs';
import path from 'path';
import { renderHTML } from "../handlebars/index.js";
import { fileURLToPath } from "url";
import * as userService from '../services/user.services.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//  GET /user
export const getInfo = async (req, res, next) => {
    // req.user has been created by token checking middleware
    const user = await userService.getByEmail(req.user.email);
    const userExists = !!(user);

    if (userExists) {
        const { hashedPassword, _id, ...userPublicInfo } = user;
        res.status(200).json({
            status: 'OK',
            user: userPublicInfo,
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
    console.log('login is being processed')
    req.body.hashedPassword = await hashPassword(req.body.password);
    if (!req.body.hashedPassword) {
        next(new GeneralServerError(500, 'Hashing error'))
    }
    //check email and hash of password in database
    const user = await userService.getByEmail(req.body.email);
    const isAuthentificated = (!!user) && user.hashedPassword == req.body.hashedPassword;

    if (isAuthentificated) {
        //create a token for the user
        const token = jwt.sign({ email: body.email }, process.env.SECRET_KEY_TOKEN, { expiresIn: '12h' });
        res.status(200).json({
            status: 'OK',
            message: 'Login successful',
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

        //hash and erase password
        req.body.hashedPassword = await hashPassword(req.body.password);
        req.body.password = 'xxxxxxxx';
        if (!req.body.hashedPassword) {
            next(new GeneralServerError(500, 'Hashing error'))
        }

        //add user to the database (non-activated at this stage)
        const userData = {
            name: req.body.name,
            email: req.body.email,
            hashedPassword: req.body.hashedPassword,
            startBalance: req.body.startBalance,
            activated: false
        };
        const addResult = await userService.add(userData);//addResult.resultId is the id of added user
        if (!addResult.acknowledged) {
            next(new GeneralServerError(500, 'Database error'))
        }

        //send invitation to activate email to the user
        messageHTML = renderHTML(path.join(__dirname, '../views/activation.handlebars'),
            { link: `http://localhost:3000/api/user/activate?code=${addResult.resultId}&email=${req.body.email}` })
        await sendEmail(req.body.email, 'Activation confirmation', '', messageHTML);

        //create a token for the user
        const token = jwt.sign({ email: req.body.email }, process.env.SECRET_KEY_TOKEN, { expiresIn: '1h' });
        res.status(200).json({
            status: 'OK',
            message: 'Proceed with activation',
            token: token,
        });
    } catch (error) {

    }
}

export const authGoogle = (req, res) => {
}
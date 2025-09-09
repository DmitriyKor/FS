import { hashPassword } from "../crypt/password.crypt.js";
import jwt from 'jsonwebtoken';
import { GeneralServerError } from "../exceptions/GeneralErrors.js";
import { createTransport } from "nodemailer";
import { sendEmail } from "../transporter/index.js";
import {Handlebars} from 'express-handlebars'
import fs from 'fs';

///mock functions
const getUserByEmail = (email) => {
    if (email=='johndeere@gmail.com') {
        return {
            name: 'John Deere',
            email: 'johndeere@gmail.com',
            startBalance: 0,
            hashedPassword : 'qwqw'
        }
    }
    else if (email=='crazyfrog@gmail.com') {
        return {
            name: 'Crazy Frog',
            email: 'crazyfrog@gmail.com',
            startBalance: 0,
            hashedPassword : 'qwqw'
        }
    }
    else return undefined;
}

const addUser = (user) => {

}


//  GET /user
export const getInfo = (req, res, next) => {
    // req.user has been created by token checking middleware
    const user = getUserByEmail(req.user.email);
    const userExists = !!(user);

    if (userExists) {
        const { hashedPassword, ...userPublic } = user;
        res.status(200).json({
            status: 'OK',
            user: userPublic,
        });  
    } else {
        next(new GeneralServerError(401, 'Unauthorized access'))
    }  
}

//  GET /user/activate
export const activate = (req, res, next) => {
    res.status(200).json({
        status: 'OK',
        message: 'Registration completed',
        token: token,
    });
}


//  POST /user/login
export const login = (req, res, next) => {
    console.log('login is being processed')
    req.body.hashedPassword = hashPassword(req.body.password);
    if (!req.body.hashedPassword) {
        next(new GeneralServerError(500, 'Hashing error'))
    }
    //check email and hash of password in database
    const user = getUserByEmail(req.body.email);
    const isAuthenticated = !!(user) && true//user.hashedPassword == req.body.hashedPassword;  

    if (isAuthenticated) {
        //create a token for the user
        const token = jwt.sign({ email: body.email }, process.env.SECRET_KEY_TOKEN, { expiresIn: '1h' }); 
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
export const register = (req, res, next) => {

    console.log('register is being processed')
    //check email in database; reject if email exists
    const user = getUserByEmail(req.body.email);
    const userExists = !!(user); 
    if (userExists) {
         next(new GeneralServerError(409, 'User already exists'));
         return;
    }

    req.body.hashedPassword = hashPassword(req.body.password);
    if (!req.body.hashedPassword) {
        next(new GeneralServerError(500, 'Hashing error'))
    }

    //add user to the database
    addUser(req.body);

    //send email to the user
    


    sendEmail(req.body.email, 'Email confirmation', 'This is the test message', '<a href= ><a>');

    //create a token for the user
    const token = jwt.sign({ email: req.body.email }, process.env.SECRET_KEY_TOKEN, { expiresIn: '1h' }); 
    res.status(200).json({
        status: 'OK',
        message: 'Registration in process. Proceed with activation',
        token: token,
    });
}

export const authGoogle = (req, res) => {
}
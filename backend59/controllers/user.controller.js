import { hashPassword } from "../crypt/password.crypt";
import {jwt} from 'jsonwebtoken';

const SECRET_KEY_TOKEN = process.env.SECRET_KEY_TOKEN;

export const getInfo = (req, res) => {
}

export const login = (req, res, next) => {
    console.log('login is being processed')
    
    req.body.hashedPassword = hashPassword(req.body.password);
    if (!req.body.hashedPassword) {
        next(new GeneralServerError(500, 'Hashing errors'))
    }
    
    //check email and hash of password in database
    const isAuthenticated = true;//mock

    if (isAuthenticated) {
        //create token for the user
        const token = jwt.sign({ email: body.email }, SECRET_KEY_TOKEN, { expiresIn: '1h' }); 

        res.status(200).json({
            message: 'Login successful',
            token: token,
        });

    } else {
         next(new GeneralServerError(401, 'Unauthorized access'))
    }
}

export const register = (req, res) => {
}

export const authGoogle = (req, res) => {
}

//     res.send('getUserInfo. query='+JSON.stringify(req.query));
// const userId = req.params.id;
//    res.send('User Id '+userId);
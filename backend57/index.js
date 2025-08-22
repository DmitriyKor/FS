import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const password = 'eofh2oiejzn397n';

const salt = crypto.randomBytes(16).toString('hex');

const hash = crypto.pbkdf2Sync(password, salt, 1000,64, 'sha512').toString('hex');

//checking password

const inputPassword = 'eofh2oiejzn397n';
const salt2 = crypto.randomBytes(16).toString('hex');
const inputHash = crypto.pbkdf2Sync(inputPassword, salt, 1000,64, 'sha512').toString('hex');

if (hash==inputHash) {
    console.log('Access granted');
} else {
    console.log('Access denied');
}

//generating web-token

const secretWord = 'secret_secret_secret';//from ENV

const payload = {
    "sub": "123456789", 
    "name": "John Coltraine",
    "admin": true
};

const token = jwt.sign(payload, secretWord, {'algorithm': 'HS256', 'expiresIn': '2 days'});
console.log(token);

const res = jwt.verify(token, secretWord);
console.log(res);

//https://medium.com/@dhananjay_yadav/implementing-google-authentication-with-react-js-and-node-js-f72e306f26c9


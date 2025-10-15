import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import crypto from 'crypto';
import session from 'express-session';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = 3000;
const SECRET = 'mysecretkey'

const USERS = [
    { id: 1, email: "john@gmail.com", salt: "kejfg", hashedPassword: bcrypt.hashSync("123", 10) },
    { id: 2, email: "peter@gmail.com", salt: "kejfg", hashedPassword: bcrypt.hashSync("123", 10) },
];

const app = express();
app.set('view engine', 'ejs');
app.set('views', './ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,                
        maxAge: 1000 * 60 * 15     
        // secure: true,               // uncomment if using HTTPS
    }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    { usernameField: "email" },
    function (email, password, done) {
        console.log('Search for user');
        console.log(email, password);
        const user = USERS.find(u => u.email === email);
        if (!user) return done(null, false, { message: "User not found" });

        // Check password
        if (!bcrypt.compareSync(password, user.hashedPassword)) {
            return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const user = USERS.find(u => u.id === id);
    done(null, user);
});

app.get('/login', function (req, res, next) {
    res.render('login');
});

app.get("/logout", (req, res, next) => {
    req.logout(err => {
        if (err) return next(err);
        res.redirect("/");
    });
});

app.post('/login/password', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

app.get("/", (req, res) => {
    if (req.isAuthenticated()) {return res.render('home', { user: req.user })
    } else { return res.redirect("/login")};
});

app.get("/profile", (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/login");
    }
    res.render('profile', { user: req.user });
});


app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})


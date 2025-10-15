import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import pug from 'pug';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = 3000;

const USERS = [
    { id: 1, name: "John D", email: "john3556@gmail.com" },
    { id: 2, name: "Peter T", email: "pete556@gmail.com" },
    { id: 3, name: "Felicity G", email: "ghfeh56@gmail.com" },
];

const ARTICLES = [
    {id: 1, title: 'jgjgujg dsds', text: 'skjfhkeshfkewfkebf aekfbesjkfsejf ejkfbewjkfbjewh ejfbjewfbjhew ejfbjwefb'},
    {id: 2, title: 'dfkj9ri jgjgujg', text: 'skjfhkeshfkewfkebf aekfbesjkfsejf ejkfbewjkfbjewh ejfbjewfbjhew ejfbjwefb'},
]

const app = express();
//app.set('view engine', 'pug'); // Set Pug as the view engine
//app.set('views', './pug');   // Specify the directory for Pug templates

app.set('view engine', 'ejs');
app.set('views', './ejs'); 

app.get('/users', (req, res) => {
    res.render('users', { usersArray: USERS });
});

app.get('/users/:id', (req, res) => {
    const user = USERS.find(element => element.id == req.params.id);
    if (user) {
        res.render('userById', { user});
    }
});

app.get('/articles', (req, res) => {
    res.render('articles', { articlesArray: ARTICLES });
});

app.get('/articles/:id', (req, res) => {
    const article = ARTICLES.find(element => element.id == req.params.id);
    if (article) {
        res.render('article', { article});
    }
});

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})


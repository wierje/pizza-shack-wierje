'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const cookieParser = require('cookie-parser');
const { cyan, red } = require('chalk');
const flash = require('express-flash');
const { knex } = require('./db/database');
const knexMigrate = require('knex-migrate');
const routes = require('./routes/');

// pug config
app.set('view engine', 'pug');

app.locals.company = "Pizza Shack";
app.locals.errors = {};
app.locals.body = {};
app.locals.body.magic = "Pizza!";

// middleware
app.use(cookieParser('secretpizza'));
app.use(session({
    cookie: { maxAge: 60000 },
    secret: 'secretpizza',
    resave: true,
    saveUninitialized: false
}));
app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    store: new KnexSessionStore({
        knex,
        tablename: 'sessions'
    }),
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET || 'pizzashacksupersecretkey'
}));

require('./lib/passport-strategies');
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    app.locals.emails = req.user && req.user.email;
    next();
});

app.use(express.static('public'));
app.use(routes);

app.use((req, res) => {
    res.render('404');
});

app.use((err, { method, url, headers: { 'user-agent': agent } }, res, next) => {
            if (process.env.NODE_ENV === 'production') {
                res.sendStatus(err.status || 500);
            } else {
                // Send the stack trace as a response, for debugging purposes
                res.set('Content-Type', 'text/plain').send(err.stack);
            }

            const timeStamp = new Date();
            const statusCode = res.statusCode;
            const statusMessage = res.statusMessage;

            console.error(
                    `[${timeStamp}] "${red(`${method} ${url}`)}" Error (${statusCode}): "${statusMessage}"`
  );
  console.error("Oh, f**k!", err.stack);
});



// End of middleware

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
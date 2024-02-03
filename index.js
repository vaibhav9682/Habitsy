require('dotenv').config();
const express = require('express')
const app = express();
const port = process.env.portEnv;
const expressLayouts = require('express-ejs-layouts')
const db = require('./config/mongoose')
const cookieParser = require('cookie-parser');
// for static files



// session and authentication
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session);

const passport = require('passport')
const passportLocal = require('./config/passport-local-auth');



app.use(cookieParser());
app.use(express.urlencoded())
// ejs layouts

app.use(express.static('./assets'))
app.use(expressLayouts);


// extract styles and scripts for layout
app.set('layout extractStyles', true)
app.set("layout extractScripts", true)


// express server setup

// setup views
app.set('view engine', 'ejs');
app.set('views', './views');




// mongo store is used to store the session cookie in db
app.use(session({
    name: process.env.session_cookie_name,
    // todo change secret before deploying on server
    secret: process.env.session_cookie_secret,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
    ,

    store: new MongoStore(
        {

            uri: process.env.mongoDb_url,
            autoRemove: 'disabled'

        },
        function (err) {
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


app.use('/', require('./routes'))



app.listen(port, (err) => {

    if (err) {
        console.log('error in starting the server');
    }

    console.log(`express server is running on port ${port}`)
})
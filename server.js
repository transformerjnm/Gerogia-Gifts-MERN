const express = require("express");
const session = require('express-session');
const mongoose = require('mongoose');
const getProducts = require('./routes/getProducts');
const login = require('./routes/login');
const logout = require('./routes/logout');
const register = require('./routes/register');
const payment = require('./routes/payment');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv/config');


const app = express();
const PORT = process.env.PORT || 3001;

if( process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'));
}

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true,  useUnifiedTopology: true }, () => {
    console.log(" Connected to the database");
});

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
    // react app location -- for testing on localhost - http://localhost:3000
    origin: "http://localhost:3000", 
    credentials: true
}))
app.use(session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
    unset: 'destroy'
}))
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require('./passport.config')(passport);

//routes
app.use('/getProduct', getProducts);
app.use('/login', login);
app.use('/logout', logout);
app.use('/register', register);
app.use('/payment', payment);




//if page reloads on heroku and is on a route(about, contact, cart) heroku will not send it to react router. so we redirect to prevent error can not get(404)
app.get('/*', (req, res) => {
   res.redirect('/');
})

//start server
app.listen( PORT, () => {
    console.log(`API Server is now available on port ${PORT}`);
});
const express = require("express");
const session = require('express-session');
const mongoose = require('mongoose');
const getProducts = require('./routes/getProducts');
const cors = require('cors');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const User = require("./models/user");
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

app.post('/login', (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.json({"body": "No User Exists"});
        else {
          req.logIn(user, (err) => {
            if (err) throw err;
            res.json({ "body": "Successfully Authenticated"});
          });
        }
      })(req, res, next);
});

app.get('/logout',  (req, res) => {
      req.logout();
      req.session.destroy(() => {
        console.log('session destroyed');
      });
      res.json({"body": "You have logged out"});
});

app.post('/register', (req, res) => {
    User.findOne({username: req.body.username}, async (err, doc) => {
        if(err) { throw err; } 
        else if(doc) {
            res.json({"body": "User already exist"});
        } else {
            const hashPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = new User({
                username: req.body.username,
                password: hashPassword
            });
            await newUser.save();
            res.json({"body": "User Created"});
        }
    });
});

app.get('/*', (req, res) => {
   res.redirect('/');
})

//start server
app.listen( PORT, () => {
    console.log(`API Server is now available on port ${PORT}`);
});
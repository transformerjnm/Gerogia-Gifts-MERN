const User = require("./models/user");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
	passport.use(
		new localStrategy((username, password, next) => {
			User.findOne({ username: username },
				(err, user) => {
					if (err) { throw err };
					//if username not found
					if (!user) { return next(null, false); }

					bcrypt.compare(password, user.password, (err, result) => {
					if (err) {throw err; }
					if (result === true) {
						//user enter pwd is same as db pwd return user
						return next(null, user);
					} else {
						//pwd incorrect
						return next(null, false);
					}
				});
			});
		})
	);

	//creates a cookie inside the browser with the user id
	passport.serializeUser((user, next) => {
		next(null, user.id);
	});

	//takes the cookie and gets a user based on the user ID
	passport.deserializeUser((id, next) => {
		User.findOne({ _id: id }, 
		(err, user) => {
			const userInformation = {
				username: user.username,
			};
			next(err, userInformation);
		});
	});
};
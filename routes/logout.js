const express = require('express');
const LogoutRouter = express.Router();

LogoutRouter.route('/')
.get((req, res) => {
	req.logout();
	req.session.destroy(() => {
	  console.log('session destroyed');
	});
	res.json({"body": "You have logged out"});
});

module.exports = LogoutRouter;
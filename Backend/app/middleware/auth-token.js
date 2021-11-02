const nJwt = require('njwt');
const config = require('../config/key');

let njwtAuth = (req, res, next) => {
	if (!req.header('Authorization')) {
	return res.status(403).send({ auth: false, message: 'No token provided' });
	}
	let sub = req.header('Authorization').split(' ')
	let token = sub[1];
	nJwt.verify(token, config.SIGNING_KEY, function(err, decoded) {
	if (err) {
		return res.status(500).send({ auth: false, message: err });
	}
		return res.status(200).json({
			"Status": "Token ok",
		});
	});
};

module.exports = {
  njwtAuth
};
const jwt = require('jsonwebtoken');
const errorCodes = require('../config/errorCodes.json');

module.exports = function isAuthenticated(req, res, next) {
    if (typeof req.headers.authorization == "undefined") {
        res
            .status(errorCodes.unauthorized.code)
            .json({ msg: errorCodes.unauthorized.message });
        return;
    }

    let token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, process.env.SECRET, { algorithm: "HS256" }, (err, data) => {
        if (err || !data.id) {
            req.userId = null;
            res
                .status(errorCodes.unauthorized.code)
                .json({ msg: "Token is not valid" });
            return;
        }
        req.userId = data.id;
        return next();
    });
}

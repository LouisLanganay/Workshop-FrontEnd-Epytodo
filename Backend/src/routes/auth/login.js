const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

const error = require('../../config/errorCodes.json');

const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const db = require('../../config/db');

function handleErrors(req, res) {
    if (!req.body) {
        res
            .status(error.badRequest.code)
            .json({ msg: error.badRequest.message });
        return 1;
    }
    if (!req.body.email) {
        res
            .status(error.badRequest.code)
            .json({ msg: "Email is required" });
        return 1;
    }
    if (!req.body.password) {
        res
            .status(error.badRequest.code)
            .json({ msg: "Password is required" });
        return 1;
    }
    return 0;
}

function isAlreadyLoggedIn(req, res) {
    if (!req.cookies)
        return 0;
    if (req.cookies.token) {
        res
            .status(error.badRequest.code)
            .json({ msg: "You are already logged in" });
        return 1;
    }
    return 0;
}

router.post('/', (req, res) => {
    if (handleErrors(req, res) != 0)
        return;
    if (isAlreadyLoggedIn(req, res) != 0)
        return;

    const selectQuery = `SELECT * FROM user WHERE email = ?`;

    db.query(selectQuery, req.body.email, (err, rows) => {
        if (err) throw err;

        if (rows.length == 0) {
            res
                .status(error.unauthorized.code)
                .json({ msg: "Invalid Credentials" });
            return;
        }

        bcrypt.compare(req.body.password, rows[0].password, (err, result) => {
            if (err) throw err;
            if (!result) {
                res
                    .status(error.unauthorized.code)
                    .json({ msg: "Invalid Credentials" });
                return;
            }
            const token = jwt.sign({
                    id: rows[0].id
                }, process.env.SECRET, {
                    expiresIn: '1h',
                    algorithm: 'HS256'
                });
            res
                .status(200)
                .json({ token: token });
        });
    });
});

module.exports = router;

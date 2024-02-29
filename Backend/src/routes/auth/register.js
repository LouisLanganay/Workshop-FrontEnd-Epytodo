const express = require('express');
const router = express.Router();
const connection = require('../../config/db');

const jwt = require('jsonwebtoken');

const err = require('../../config/errorCodes.json');

const bcrypt = require('bcryptjs');

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

function handleError(body, res) {
    if (!body) {
        res
            .status(err.badRequest.code)
            .json({ error: err.badRequest.message });
        return 1;
    }
    if (!body.email || !body.password || !body.name || !body.firstname) {
        res
            .status(err.badRequest.code)
            .json({ error: err.badRequest.message});
        return 1;
    }
    return 0;
}

function createUser(user, res, req) {
    const insertQuery = 'INSERT INTO user (email, password, name, firstname) VALUES (?, ?, ?, ?)';
    const selectQuery = 'SELECT * FROM user WHERE email = ?';

    bcrypt.hash(user.password, 10, (error, hash) => {
        if (error) throw error;
        connection.query(insertQuery, [user.email, hash, user.name, user.firstname], (error, rows) => {
            if (error) throw error;

            connection.query(selectQuery, user.email, (error, rows) => {
                if (error) throw error;
                if (rows.length < 0)
                    res
                        .status(err.internalServerError.code)
                        .json({ error: err.internalServerError.message });
                const token = jwt.sign({
                    id: rows[0].id
                }, process.env.SECRET, {
                    expiresIn: '1h',
                    algorithm: 'HS256'
                });
                res
                    .status(err.created.code)
                    .json({ token: token });
            });
        });
    });
}

router.post('/', async(req, res) => {
    if (handleError(req.body, res) != 0)
        return;
    const user = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        firstname: req.body.firstname
    };

    const selectQuery = 'SELECT * FROM user WHERE email = ?';

    connection.query(selectQuery, user.email, (error, rows) => {
        if (error) throw error;
        if (rows.length > 0)
            res
                .status(err.conflict.code)
                .json({ msg: "Account already exists" });
        else
            createUser(user, res, req);
    });
});

module.exports = router;

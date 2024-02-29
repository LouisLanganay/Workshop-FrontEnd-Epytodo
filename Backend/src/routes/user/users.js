const express = require('express');
const router = express.Router();

const db = require('../../config/db');

const error = require('../../config/errorCodes.json');

const isAuthenticated = require('../../middleware/auth');

const bcrypt = require('bcryptjs');

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', isAuthenticated, async(req, res) => {
    const selectQuery = `SELECT * FROM user`;

    db.query(selectQuery, (err, rows) => {
        if (err) throw err;

        res
            .status(error.ok.code)
            .json(rows);
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const selectQueryId = 'SELECT * FROM user WHERE id = ?';
    const selectQueryEmail = 'SELECT * FROM user WHERE email = ?';

    db.query(selectQueryId, id, (err, rows) => {
        if (err) throw err;
        if (rows.length > 0) {
            res
                .status(error.ok.code)
                .json(rows[0]);
            return;
        }
        db.query(selectQueryEmail, id, (err, rows) => {
            if (err) throw err;
            if (rows.length > 0) {
                res
                    .status(error.ok.code)
                    .json(rows[0]);
                return;
            }
            res
                .status(error.notFound.code)
                .json({ msg: error.notFound.message });
        });
    });
});

function handleErrors(req, res) {
    if (!req.body) {
        res
            .status(error.badRequest.code)
            .json({ msg: error.badRequest.message });
        return 1;
    };
    if (!req.body.email || !req.body.password || !req.body.name || !req.body.firstname) {
        res
            .status(error.badRequest.code)
            .json({ msg: error.badRequest.message });
        return 1;
    };
    return 0;
}

router.put('/:id', (req, res) => {
    if (handleErrors(req, res) != 0)
        return;

    const { email, password, firstname, name } = req.body;
    const id = req.params.id;
    const updateQuery = 'UPDATE user SET email = ?, password = ?, firstname = ?, name = ? WHERE id = ?';
    const selectQuery = 'SELECT * FROM user WHERE email = ?';

    db.query(selectQuery, email, (err, rows) => {
        if (err) throw err;
        for (let i = 0; i < rows.length; i++) {
            if (rows[i].id != id) {
                res
                    .status(error.conflict.code)
                    .json({ msg: "Email already used" });
                return;
            }
        }

        bcrypt.hash(password, 10, (err, hash) => {
            if (err) throw err;
            db.query(updateQuery, [email, hash, firstname, name, id], (err, rows) => {
                if (err) throw err;
                db.query(selectQuery, email, (err, rows) => {
                    if (err) throw err;
                    if (rows.length <= 0) {
                        res
                            .status(error.internalServerError.code)
                            .json({ msg: error.internalServerError.message });
                        return;
                    }
                    res
                        .status(error.ok.code)
                        .json(rows[0]);
                });
            });
        });
    });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const selectQuery = 'SELECT * FROM user WHERE id = ?';
    const deleteQuery = 'DELETE FROM user WHERE id = ?';

    db.query(selectQuery, id, (err, rows) => {
        if (err) throw err;
        if (rows.length == 0) {
            res
                .status(error.notFound.code)
                .json({ msg: error.notFound.message });
            return;
        }
        db.query(deleteQuery, id, (err, rows) => {
            if (err) throw err;
            res
            .status(error.ok.code)
            .json({ msg: `Successfully deleted record number: ${id}` });
        });
    });
});

module.exports = router;

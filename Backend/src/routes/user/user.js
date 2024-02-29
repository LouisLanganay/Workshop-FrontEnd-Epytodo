const express = require('express');
const router = express.Router();

const db = require('../../config/db');

const error = require('../../config/errorCodes.json');

const isAuthenticated = require('../../middleware/auth');

router.get('/', isAuthenticated, async(req, res) => {

    const selectQuery = `SELECT * FROM user WHERE id = ?`;

    db.query(selectQuery, req.userId, (err, result) => {
        if (err) throw err;

        if (result.length == 0) {
            res
                .status(error.notFound.code)
                .json({ msg: error.notFound.message });
            return;
        }

        res.json(result[0]);
    });
});

router.get('/todos', isAuthenticated, async(req, res) => {
    const selectQuery = `SELECT * FROM todo WHERE user_id = ?`;

    db.query(selectQuery, req.userId, (err, result) => {
        if (err) throw err;

        if (result.length == 0) {
            res
                .status(error.notFound.code)
                .json({ msg: error.notFound.message });
            return;
        }

        res.json(result);
    });
});

module.exports = router;

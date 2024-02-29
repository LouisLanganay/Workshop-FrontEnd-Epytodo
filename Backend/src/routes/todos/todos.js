const express = require('express');
const router = express.Router();

const db = require('../../config/db');

const error = require('../../config/errorCodes.json');

const isAuthenticated = require('../../middleware/auth');

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', isAuthenticated, async(req, res) => {
    const selectQuery = `SELECT * FROM todo`;

    db.query(selectQuery, (err, rows) => {
        if (err) throw err;
        res
            .status(error.ok.code)
            .json(rows);
    });
});

router.get('/:id', isAuthenticated, (req, res) => {
    const id = req.params.id;
    const selectQuery = 'SELECT * FROM todo WHERE id = ?';

    db.query(selectQuery, id, (err, rows) => {
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

function handleErrors(req, res) {
    if (!req.body) {
        res
            .status(error.badRequest.code)
            .json({ msg: error.badRequest.message });
        return 1;
    }
    if (!req.body.title || !req.body.description || !req.body.due_time || !req.body.user_id || !req.body.status) {
        res
            .status(error.badRequest.code)
            .json({ msg: error.badRequest.message });
        return 1;
    }
    return 0;
}

router.post('/', isAuthenticated, (req, res) => {
    if (handleErrors(req, res) != 0)
        return;

    const selectQuery = `SELECT * FROM user WHERE id = ?`;
    const insertQuery = `INSERT INTO todo (title, description, due_time, user_id, status) VALUES (?, ?, ?, ?, ?)`;
    const select2Query = 'SELECT * FROM todo WHERE id = ?';

    db.query(selectQuery, req.body.user_id, (err, result) => {
        if (err) throw err;

        if (result.length == 0) {
            res
                .status(error.notFound.code)
                .json({ msg: `User not found: ${req.body.user_id}` });
            return;
        };
        db.query(insertQuery, [req.body.title, req.body.description, req.body.due_time, req.body.user_id, req.body.status], (err, result) => {
            if (err) throw err;
            db.query(select2Query, result.insertId, (err, result) => {
                if (err) throw err;
                if (result.length <= 0) {
                    res
                        .status(error.internalServerError.code)
                        .json({ msg: error.internalServerError.message });
                } else {
                    res
                        .status(error.created.code)
                        .json(result[0]);
                }
            });
        });
    });
});

router.put('/:id', isAuthenticated, (req, res) => {
    if (handleErrors(req, res) != 0)
        return;

    const id = req.params.id;
    const selectQuery = `SELECT * FROM todo WHERE id = ?`;
    const updateQuery = `UPDATE todo SET title = ?, description = ?, due_time = ?, user_id = ?, status = ? WHERE id = ?`;

    db.query(selectQuery, id, (err, result) => {
        if (err) throw err;

        if (result.length == 0) {
            res
                .status(error.notFound.code)
                .json({ msg: `Todo not found: ${id}` });
            return;
        };
        db.query(updateQuery, [req.body.title, req.body.description, req.body.due_time, req.body.user_id, req.body.status, id], (err, result) => {
            if (err) throw err;
            db.query(selectQuery, id, (err, result) => {
                if (err) throw err;
                if (result.length <= 0) {
                    res
                        .status(error.internalServerError.code)
                        .json({ msg: error.internalServerError.message });
                } else {
                    res
                        .status(error.ok.code)
                        .json(result[0]);
                }
            });
        });
    });
});

router.delete('/:id', isAuthenticated, (req, res) => {
    const id = req.params.id;
    const selectQuery = `SELECT * FROM todo WHERE id = ?`;
    const deleteQuery = `DELETE FROM todo WHERE id = ?`;

    db.query(selectQuery, id, (err, result) => {
        if (err) throw err;

        if (result.length == 0) {
            res
                .status(error.notFound.code)
                .json({ msg: `Todo not found: ${id}` });
            return;
        }
        db.query(deleteQuery, id, (err, result) => {
            if (err) throw err;
            res
                .status(error.ok.code)
                .json({ msg: `Successfully deleted record number: ${id}` });
        });
    });
});

module.exports = router;

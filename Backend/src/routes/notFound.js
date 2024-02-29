const express = require('express');
const router = express.Router();

const err = require('../config/errorCodes.json');

router.use((req, res) => {
    res
        .status(err.notFound.code)
        .json({ msg: err.notFound.message });
});

module.exports = router;

require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT;
const cors = require('cors');

app.use(cors());

require('./routes/router')(app);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
    console.log(`http://localhost:${port}`);
});
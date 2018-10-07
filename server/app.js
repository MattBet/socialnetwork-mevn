const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middlewares
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/', (req, res, next) => {
    res.json({
        message: "Success"
    });
});

const port = process.env.PORT || 8081;

// Starting the server
app.listen(port, () => {
   console.log(`Starting server on port ${port}`)
});
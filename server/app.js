const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Connection to DB
mongoose.connect('mongodb://localhost/socialnetwork', { useNewUrlParser: true,
    useCreateIndex: true });
mongoose.Promis = global.Promise;

// Initialize Routes
const posts = require('./routes/posts');
const users = require('./routes/users');
const auth = require('./routes/auth');

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

app.use('/posts', posts);
app.use('/users', users);
app.use('/auth', auth);

const port = process.env.PORT || 8081;

// Starting the server
app.listen(port, () => {
   console.log(`Starting server on port ${port}`)
});
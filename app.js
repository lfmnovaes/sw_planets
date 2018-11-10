const express = require('express');
const app = express();
const morgan = require('morgan');

const planetRoutes = require('./api/routes/planets');

app.use(morgan('dev'));

// Routes
app.use('/planets', planetRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
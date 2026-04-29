require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 5500;

// 1. Define the connection function
const connectDB = () => {
    if (!process.env.DB_URL) {
        console.error("DB_URL is not defined in environment variables!");
        return;
    }
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    const db = mongoose.connection;
    db.on('error', (error) => console.log(error));
    db.once('open', () => console.log('Db Connection established successfully'));
};

// 2. Middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(session({
    secret: 'my secreat key',
    saveUninitialized: true,
    resave: false
}));

app.use(express.static('uploads'));
app.use((req, res, next) => {
    res.locals.message = req.session.message; 
    delete req.session.message;
    next();
});

app.set('view engine', 'ejs');
app.use("", require('./routes/routes'));

// 3. Execution guards
if (process.env.NODE_ENV !== 'test') {
    connectDB();
    app.listen(PORT, () => {
        console.log(`Server Started. Url: http://localhost:${PORT}`);
    });
}

module.exports = app;
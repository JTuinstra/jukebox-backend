const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require("cors");

const port = process.env.PORT || 3000;
const app = express();

async function connect() {
    try {
        await mongoose.connect("mongodb+srv://jouke:5kG6HeZ444X7XzaX@database.0g46892.mongodb.net/jukebox\n");
    } catch (err) {
        console.error(err);
    }
}

connect().then(() => {
    console.log("Connected to database");
});

app.use(cors());
app.use(express.json());

app.use(session({
    secret: 'your_secret_key',
    reSave: false,
    saveUninitialized: false
}));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


app.use('/login', require('./routes/loginRoutes'));
app.use('/session', require('./routes/sessionRoutes'));
app.use('/spotify', require('./routes/spotifyRoutes'));



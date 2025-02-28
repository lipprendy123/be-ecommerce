const express = require('express');
const port = 5000;
const connectDb = require('./config/db')
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoute = require('./routes/authRoute');

const app = express();

app.use(cookieParser());
app.use('/public', express.static('public'));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDb()

// route
app.use('/api/auth', authRoute)

app.listen(port, () => {
    console.log(`Server run on port ${port}`);
})
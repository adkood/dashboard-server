const express = require("express");
const cors = require('cors');
const redis = require('redis');
const cookieParser = require("cookie-parser")
// for environment variable
require('dotenv').config();

//routes
const homeRoutes = require("./routes/homeRoutes");
const authRoutes = require("./routes/authRoutes");
//errorHandler
const errorHandler = require("./utils/errorHandler");

const app = express();

//middlewares
app.use(cookieParser());
app.use(express.json());
app.use(cors());

// routes
app.use('/api', authRoutes);
app.use('/api', homeRoutes);

// Cache middleware
app.use((req, res, next) => {
    console.log('middleware');
    next();
});

// global error handling 
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}...`);
});

module.exports = app;

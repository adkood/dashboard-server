const express = require("express");

const cors = require('cors');

// for environment variable
require('dotenv').config();

//routes
const homeRoutes = require("./routes/homeRoutes");

//errorHandler
const errorHandler = require("./utils/errorHandler");

const app = express();

//middlewares
app.use(cors());

app.use('/api', homeRoutes);

// global error handling 
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT,() => {
    console.log(`server is listening at port ${PORT}...`);
});
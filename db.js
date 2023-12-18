const mysql2 = require("mysql2");

const pool = mysql2.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.SQL_DATABASE,
    connectionLimit: 10
});

pool.getConnection((err,connection) => {

    if(err)
    {
        console.log("cannot connect to sql !");
        return;
    }

    console.log("connected to database");
});

module.exports = pool;
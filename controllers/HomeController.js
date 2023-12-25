const pool = require('../db');

exports.getDataPerMonth = (req, res) => {
    const { meatId, outletId, year, month } = req.query;

    let params = [month];
    let sql = `select * from soldValue where month(soldOn) = ?`;

    if (meatId != 'all') {
        sql = sql + ` and meatId = ?`;
        params = [...params, meatId];
    }
    if (outletId != 'all') {
        sql = sql + ` and outletId = ?`;
        params = [...params, outletId];
    }
    if (year != 'all') {
        sql = sql + ` and year(soldOn) = ?`;
        params = [...params, year];
    }

    pool.query(sql, params, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
        console.log(results);
        res.status(201).json({ messgae: `Data fetched!`, data: results });
    })
}

exports.getRefillDataPerMonth = (req, res) => {
    const { meatId, outletId, year, month } = req.query;
    let inventoryId = outletId;

    let params = [month];
    let sql = `select * from refillHistory where month(soldOn) = ?`;

    if (meatId != 'all') {
        sql = sql + ` and meatId = ?`;
        params = [...params, meatId];
    }
    if (inventoryId != 'all') {
        sql = sql + ` and outletId = ?`;
        params = [...params, inventoryId];
    }
    if (year != 'all') {
        sql = sql + ` and year(soldOn) = ?`;
        params = [...params, year];
    }

    pool.query(sql, params, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }

        res.status(201).json({ message: `Refill data Fetched`, data: results });
    })
}

exports.getPopularity = (req, res) => {

    let sql = `select * from meatType`;

    pool.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }

        return res.status(201).json({ message: `Popularity Fetched!`, data: results });
    });

}
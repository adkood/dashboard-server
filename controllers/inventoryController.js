const pool = require('../db');

exports.addToInventory = (req, res) => {
    const { inventoryId, meatId, quantity } = req.body;

    //validation
    if (!inventoryId || !meatId || !quantity) {
        return res.status(400).json({ error: "missing required information" });
    }

    // parameterized querying
    const sql = `insert into inventoryMeat (inventoryId, meatId, quantity) values (?,?,?)`;
    const params = [inventoryId, meatId, quantity];
    pool.query(sql, params, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json({ message: "Added to Inventory" });
    });
}

exports.getQuantityPerMonth = (req, res) => {
    const { meatId, outletId, year, month} = req.query;

    console.log(meatId,outletId,year,month);

    const sql = `select * from soldValue where meatId = ? and outletId = ? and year(soldOn) = ? and month(soldOn) = ?`;
    const params = [meatId,outletId,year,month];
    pool.query(sql, params, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
        console.log(results);
        res.status(201).json({ messgae: `Data fetched!`, data: results });
    })
}
const db = require('../config/database');

exports.getreports = (req, res) => {
    db.query('SELECT itemName, SUM(quantity) as totalQuantity FROM shop_orders_include GROUP BY itemName', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({ error: 'Error retrieving data' });
        } else {
            res.send(result);
        }
    });
};

exports.getreports1 = (req, res) => {
    db.query('SELECT itemName, SUM(quantity) as totalQuantity FROM shop_orders_include GROUP BY itemName', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({ error: 'Error retrieving data' });
        } else {
            res.send(result);
        }
    });
};

exports.getreports2 = (req, res) => {
    db.query('SELECT itemName, SUM(quantity) AS totalQuantity FROM shop_orders_include GROUP BY itemName ORDER BY totalQuantity DESC LIMIT 3', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({ error: 'Error retrieving data' });
        } else {
            res.send(result);
        }
    });
};

// get total sales
exports.getreports3 = (req, res) => {
    db.query('SELECT SUM(unitPrice * quantity) as totalSalesValue FROM shop_orders_include', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({ error: 'Error retrieving data' });
        } else {
            res.send(result);
        }
    });
};

// get stock value
exports.getreports4 = (req, res) => {
    db.query('SELECT SUM(quantity * unitPrice) as StockValue FROM items01', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({ error: 'Error retrieving data' });
        } else {
            res.send(result);
        }
    });
};




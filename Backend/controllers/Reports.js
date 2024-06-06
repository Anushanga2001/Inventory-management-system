const db = require('../config/database');


exports.getreports = (req, res) => {
    db.query(`SELECT shop_orders_include.itemName, SUM(shop_orders_include.quantity) as totalQuantity FROM
shop_orders_include
  INNER JOIN shop_orders1 ON shop_orders_include.orderNo = shop_orders1.orderNo
WHERE
  shop_orders1.orderDate >= DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY
  shop_orders_include.itemName;`,
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send({ error: 'Error retrieving data' });
            } else {
                res.send(result);
            }
        });
};


// get each item sales  and show it in bar char last 30 days
exports.getreports1 = (req, res) => {
    db.query(
      `SELECT shop_orders_include.itemName, SUM(shop_orders_include.quantity) as totalQuantity FROM shop_orders_include 
        INNER JOIN shop_orders1 ON shop_orders_include.orderNo = shop_orders1.orderNo 
      WHERE 
        shop_orders1.orderDate >= DATE_SUB(NOW(), INTERVAL 30 DAY) 
      GROUP BY 
        shop_orders_include.itemName`,
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send({ error: 'Error retrieving data' });
        } else {
          res.send(result);
        }
      }
    );
  };
  

//   get top 3 items sales
  exports.getreports2 = (req, res) => {
    db.query(
      `SELECT shop_orders_include.itemName, SUM(shop_orders_include.quantity) as totalQuantity FROM shop_orders_include 
      INNER JOIN 
        shop_orders1 ON shop_orders_include.orderNo = shop_orders1.orderNo WHERE shop_orders1.orderDate >= DATE_SUB(NOW(), INTERVAL 30 DAY) 
      GROUP BY 
        shop_orders_include.itemName ORDER BY totalQuantity DESC LIMIT 3`,
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send({ error: 'Error retrieving data' });
        } else {
          res.send(result);
        }
      }
    );
  };  


// get total sales
exports.getreports3 = (req, res) => {
    db.query(
      `SELECT SUM(shop_orders_include.unitPrice * shop_orders_include.quantity) as totalSalesValue FROM shop_orders_include 
        INNER JOIN 
    shop_orders1 ON shop_orders_include.orderNo = shop_orders1.orderNo 
      WHERE 
    shop_orders1.orderDate >= DATE_SUB(NOW(), INTERVAL 30 DAY)`,
    
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send({ error: 'Error retrieving data' });
        } else {
          res.send(result);
        }
      }
    );
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

// get available stock value 
exports.getreports5 = (req, res) => {
    db.query('SELECT itemName, SUM(quantity) AS totalQuantity FROM items01 WHERE quantity > 0 GROUP BY itemName', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({ error: 'Error retrieving data' });
        } else {
            res.send(result);
        }
    });
};




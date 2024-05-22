const db = require('../config/database');

exports.addShopOrders = (req, res) => {
  const { orderNo, shopName, address, items } = req.body;

  // Begin a database transaction
  db.beginTransaction((err) => {
    if (err) {
      console.error('Error beginning transaction:', err);
      res.status(500).json({ error: 'Error beginning transaction' });
      return;
    }

    // Insert the order into the shop_orders1 table
    const orderSql = 'INSERT INTO shop_orders1 (orderNo, shopName, address) VALUES (?, ?, ?)';
    db.query(orderSql, [orderNo, shopName, address], (err, result1) => {
      if (err) {
        console.error('Error adding order:', err);
        db.rollback(() => {
          res.status(500).json({ error: 'Error adding order' });
        });
        return;
      }

      console.log('Order added:', result1);
      const generatedOrderNo = result1.insertId;

      // Insert the order items into the shop_orders_include table
      const itemSql = 'INSERT INTO shop_orders_include (orderNo, itemNo, itemName, unitPrice, quantity) VALUES ?';
      const itemValues = items.map((item) => [generatedOrderNo, item.itemNo, item.itemName, item.unitPrice, item.enterquantity]);
      db.query(itemSql, [itemValues], (err, result2) => {
        if (err) {
          console.error('Error adding order items:', err);
          db.rollback(() => {
            res.status(500).json({ error: 'Error adding order items' });
          });
          return;
        }

        console.log('Order items added:', result2);

        // Update the quantity in the items01 table
        const updateQuantityPromises = items.map((item) => {
          return new Promise((resolve, reject) => {
            const updateQuantitySql = 'UPDATE items01 SET quantity = IF(quantity >= ?, quantity - ?, 0) WHERE itemNo = ?';
            db.query(updateQuantitySql, [item.enterquantity, item.enterquantity, item.itemNo], (err, result3) => {
              if (err) {
                console.error('Error updating quantity:', err);
                reject(err);
              } else {
                // Retrieve the updated quantity
                const selectQuantitySql = 'SELECT quantity FROM items01 WHERE itemNo = ?';
                db.query(selectQuantitySql, [item.itemNo], (err, result4) => {
                  if (err) {
                    console.error('Error retrieving updated quantity:', err);
                    reject(err);
                  } else {
                    // Replace the entered quantity with the updated quantity
                    item.enterquantity = result4[0].quantity;
                    console.log('Quantity updated:', result4[0].quantity);
                    resolve();
                  }
                });
              }
            });
          });
        });

        Promise.all(updateQuantityPromises)
          .then(() => {
            // Commit the transaction
            db.commit(() => {
              res.json({ message: 'Order added successfully' });
            });
          })
          .catch((err) => {
            db.rollback(() => {
              res.status(500).json({ error: 'Error updating quantity' });
            });
          });
      });
    });
  });
};

exports.getShopOrders = (req, res) => {
  const sql = 'SELECT * FROM shop_orders1';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching orders:', err);
      res.status(500).json({ error: 'Error fetching orders' });
      return;
    }
    res.json(result);
  });
};

exports.getshopOrderByOrderNo = (req, res) => {
  const { orderNo } = req.params;
  const sql = 'SELECT * FROM shop_orders1 WHERE orderNo = ?';
  db.query(sql, [orderNo], (err, result) => {
    if (err) {
      console.error('Error fetching orders:', err);
      res.status(500).json({ error: 'Error fetching orders' });
      return;
    }
    res.json(result);
  });
}

exports.getshopOrdersByOrderNo = (req, res) => {
  const { orderNo } = req.params;
  const sql = 'SELECT * FROM shop_orders_include WHERE orderNo = ?';
  db.query(sql, [orderNo], (err, result) => {
    if (err) {
      console.error('Error fetching orders:', err);
      res.status(500).json({ error: 'Error fetching orders' });
      return;
    }
    res.json(result);
  });
};

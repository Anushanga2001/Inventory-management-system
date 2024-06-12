const db = require('../config/database');

exports.addCompanyOrders = (req, res) => {
  const { orderDate, orderTime, orderItems } = req.body;

  // Begin a database transaction
  db.beginTransaction((err) => {
    if (err) {
      console.error('Error beginning transaction:', err);
      res.status(500).json({ error: 'Error beginning transaction' });
      return;
    }

    // Insert the order into the company_orders1 table
    const orderSql = 'INSERT INTO company_orders1 (orderDate, orderTime) VALUES (?, ?)';
    db.query(orderSql, [orderDate, orderTime], (err, result1) => {
      if (err) {
        console.error('Error adding order:', err);
        db.rollback(() => {
          res.status(500).json({ error: 'Error adding order' });
        });
        return;
      }

      console.log('Order added:', result1);
      const generatedOrderNo = result1.insertId;

      // Insert the order items into the company_orders_include table
      const itemSql = 'INSERT INTO company_orders_include (orderNo, itemId, itemName, unitPrice, quantity, userID) VALUES ?';
      const itemValues = orderItems.map((item) => [generatedOrderNo, item.itemId, item.itemName, item.unitPrice, item.quantity, item.userID]);
      db.query(itemSql, [itemValues], (err, result2) => {
        if (err) {
          console.error('Error adding order items:', err);
          db.rollback(() => {
            res.status(500).json({ error: 'Error adding order items' });
          });
          return;
        }
        
        console.log('Order items added:', result2);

        // Commit the transaction
        db.commit(() => {
          res.json({ message: 'Order and order items added successfully' });
        });
      });
    });
  });
};


// last moment change
exports.getCompanyOrders = (req, res) => {
  const sql = 'SELECT * FROM company_orders1 ORDER BY orderNo DESC';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching orders:', err);
      res.status(500).json({ error: 'Error fetching orders' });
      return;
    }
    res.json(result);
  });
};

exports.getCompanyOrdersByOrderNo = (req, res) => {
  const { orderno } = req.params;
  const sql = `SELECT company_orders_include.*, company_orders1.orderDate FROM company_orders_include RIGHT JOIN company_orders1 
  ON company_orders_include.orderno = company_orders1.orderno WHERE company_orders_include.orderno = ?`;
  db.query(sql, [orderno], (err, result) => {
    if (err) {
      console.error('Error fetching orders:', err);
      res.status(500).json({ error: 'Error fetching orders' });
      return;
    }
    res.json(result);
  });
}

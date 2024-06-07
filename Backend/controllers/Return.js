const db = require('../config/database');

exports.addReturn = (req, res) => {
  const { shopName, address, items } = req.body;

  // Create an array of arrays, where each inner array contains the values for a single item
  const values = items.map(item => [shopName, address, item.itemName, item.quantity]);

  // Use the ? placeholder for each inner array of values
  const sql = 'INSERT INTO returns (shopName, address, itemName, quantity) VALUES ?';

  db.query(sql, [values], (err, result) => {
    if (err) {
      console.error('Error inserting returns:', err);
      res.status(500).json({ error: 'Error inserting returns' });
      return;
    }
    console.log('Returns inserted:', result);
    res.json({ message: 'Returns inserted successfully' });
  });
};

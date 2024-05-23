const db = require('../config/database');

exports.addnotifications = (req, res) => {
  const response = req.body;

  if(!Array.isArray(response) || response.length === 0) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  const values = response.map(response => [
    response.itemNo,
    response.batchNo,
    response.itemName,
    response.expireDate,
    response.quantity
  ])

  const sql = 'INSERT INTO notifications (itemNo, batchNo, itemName, expireDate, quantity) VALUES ?';

  db.query(sql, [values], (err, result) => {
    if (err) {
      console.error('Error adding notifications:', err);
      res.status(500).json({ error: 'Error adding notifications' });
      return;
    }
    res.status(201).json({ message: 'Notifications added successfully' });
  });
};
  
  exports.deletenotifications = (req, res) => {
    const itemNo = req.params.itemNo;
    const batchNo = req.params.batchNo;

  const sql = 'DELETE FROM notifications WHERE itemNo = ? AND batchNo = ?';
  const values = [itemNo, batchNo];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error deleting notification:', err);
      res.status(500).json({ error: 'Error deleting notification' });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Notification not found' });
      return;
    }

    res.status(200).json({ message: 'Notification deleted successfully' });
  });
  };
  


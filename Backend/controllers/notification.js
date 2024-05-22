const db = require('../config/database');

exports.addnotifications = (req, res) => {
    const { itemNo, itemName, batchNo, expireDate, quantity } = req.body;
    let statusMessage = '';
    if (quantity <= 10) {
      statusMessage = 'Low stock!';
    }
    const currentDate = new Date();
    const expiryDate = new Date(expireDate);
    if (expiryDate <= currentDate.setDate(currentDate.getDate() + 7)) {
      statusMessage = 'Expiring soon!';
    }
  
    const values = [itemNo, itemName, batchNo, expireDate, quantity, statusMessage];
    if (values.includes(null) || values.includes(undefined)) {
      res.status(400).json({ error: 'Missing or invalid data in request body' });
      return;
    }
  
    const sql = 'INSERT INTO notifications (itemNo, itemName, batchNo, expireDate, quantity, statusMessage) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error adding notification:', err);
        res.status(500).json({ error: 'Error adding notification' });
        return;
      }
      res.status(201).json({ message: 'Notification added successfully' });
      console.log('Notification added:', result);
    });
  };
  
  exports.getnotifications = (req, res) => {
    const sql = 'SELECT * FROM notifications';
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error fetching notifications:', err);
        res.status(500).json({ error: 'Error fetching notifications' });
        return;
      }
      res.json(result);
    });
  };
  


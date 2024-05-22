const db = require('../config/database');
const upload = require('../multer');

// backend for add new items
exports.addItem = (req, res) => {
  upload.single('itemImage')(req, res, (err) => {
    if (err) {
      console.error('Error uploading image:', err);
      res.status(500).json({ error: 'Error uploading image' });
      return;
    }

    const formData = req.body;
    formData.itemImage = req.file.filename;

    // Set batchNo to 1
    formData.batchNo = 1;

    const sql = 'INSERT INTO items01 SET ?';
    db.query(sql, formData, (err, result) => {
      if (err) {
        console.error('Error adding item:', err);
        res.status(500).json({ error: 'Error adding item' });
        return;
      }
      res.status(201).json({ message: 'Item added successfully' });
    });
  });
};

// available table delete
exports.deleteItem = (req, res) => {
  
  const itemNo = req.params.itemNo;
  const batchNo = req.params.batchNo;

  const sql = `DELETE FROM items01 WHERE itemNo = ? AND batchNo = ?`;

  db.query(sql, [itemNo, batchNo], (err, result) => {
    if (err) {
      console.error('Error deleting item:', err);
      res.status(500).json({ error: 'Error deleting item' });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }

    res.json({ message: 'Item deleted successfully' });
  });
};

// this function for adding exist items to the system
exports.addItem00 = (req, res) => {
  const { itemNo, itemName, unitPrice, quantity, expireDate } = req.body;

  // SQL query to get the current highest batchNo for the given itemNo
  const getMaxBatchNoSql = 'SELECT MAX(batchNo) AS maxBatchNo FROM items01 WHERE itemNo = ?';

  db.query(getMaxBatchNoSql, [itemNo], (err, results) => {
    if (err) {
      console.error('Error fetching max batchNo:', err);
      res.status(500).json({ error: 'Error fetching max batchNo' });
      return;
    }

    // Determine the new batchNo
    const maxBatchNo = results[0].maxBatchNo;
    const newBatchNo = maxBatchNo ? maxBatchNo + 1 : 1;

    // SQL query to insert the new item with the incremented batchNo
    const insertItemSql = 'INSERT INTO items01 (itemNo, itemName, unitPrice, quantity, expireDate, batchNo) VALUES (?, ?, ?, ?, ?, ?)';

    db.query(insertItemSql, [itemNo, itemName, unitPrice, quantity, expireDate, newBatchNo], (err, result) => {
      if (err) {
        console.error('Error adding item:', err);
        res.status(500).json({ error: 'Error adding item' });
        return;
      }
      res.status(201).json({ message: 'Item added successfully' });
    });
  });
};

// item retreview and display in the sales rep interface
exports.getItems90 = (req, res) => {
  const sql = `SELECT itemNo, itemName, unitPrice, quantity, itemImage, batchNo
  FROM items01
  WHERE quantity > 0
  GROUP BY itemNo, batchNo
  ORDER BY batchNo`;
  
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching items:', err);
      res.status(500).json({ error: 'Error fetching items' });
      return;
    }
    res.json(result);
  });
};

exports.getItems01 = (req, res) => {
  const sql = 'SELECT * FROM items01 GROUP BY itemNo, batchNo';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching items:', err);
      res.status(500).json({ error: 'Error fetching items' });
      return;
    }
    res.json(result);
  });
};

exports.getItem = (req, res) => {
  const {ItemNo}  = req.params;
  const sql = 'SELECT * FROM items01 where itemNo = ?';
  db.query(sql, [ItemNo],(err, result) => {
    if (err) {
      console.error('Error fetching items:', err);
      res.status(500).json({ error: 'Error fetching items' });
      return;
    }
    const x = result[0];
    res.json(x);
  });
};

exports.getsItems = (req, res) => {
  const { itemName } = req.params;
  const sql = 'SELECT * FROM items01 WHERE itemName = ?';
  db.query(sql, [itemName], (err, result) => {
    if (err) {
      console.error('Error getting item:', err);
      res.status(500).json({ error: 'Error getting item' });
      return;
    }
    if (result.length > 0) {
      res.json(result[0]); // return the first matching item
    } else {
      res.status(404).json(); // return a 404 error if no matching item is found
    }
  });
};

// declare another function to retrieve items from the database when the expire date is less than 7 days
exports.getItemszz = (req, res) => {
  const sql = 'SELECT itemNo, itemName, batchNo, expireDate, quantity FROM items01 WHERE (expireDate <= DATE_ADD(CURDATE(), INTERVAL 7 DAY) AND quantity > 0) OR (quantity < 10 AND quantity > 0)';
  // const sql = 'SELECT itemNo, itemName, batchNo FROM items01 GROUP BY itemNo';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching items:', err);
      res.status(500).json({ error: 'Error fetching items' });
      return;
    }
    // Send the result back to the client
    const x = result;
    res.status(200).json(result);
  });
};



const db = require('../config/database');
const upload = require('../multer');

// add new items
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
  upload.single('itemImage')(req, res, (err) => {
    if (err) {
      console.error('Error uploading image:', err);
      res.status(500).json({ error: 'Error uploading image' });
      return;
    }

    const { itemNo, itemName, unitPrice, quantity, expireDate, noOfQuantity } = req.body;
    const itemImage = req.file ? req.file.filename : ''; 
    // Set itemImage to an empty string if no file is uploaded

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

      // SQL query to insert the new item with the incremented batchNo and itemImage
      const insertItemSql = 'INSERT INTO items01 (itemNo, itemName, unitPrice, quantity, expireDate, batchNo, noOfQuantity, itemImage) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

      db.query(insertItemSql, [itemNo, itemName, unitPrice, quantity, expireDate, newBatchNo, noOfQuantity, itemImage], (err, result) => { // Include itemImage in the query parameters
        if (err) {
          console.error('Error adding item:', err);
          res.status(500).json({ error: 'Error adding item' });
          return;
        }
        res.status(201).json({ message: 'Item added successfully' });
      });
    });
  });
};

// item retreview and display in the sales rep interface
exports.getItems90 = (req, res) => {
  const sql = `SELECT itemNo, itemName, unitPrice, quantity, itemImage, batchNo FROM items01 WHERE quantity > 0`;
  
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
      res.json(result[0]); 
    } else {
      res.status(404).json(); 
    }
  });
};

// notification
exports.getItem040 = (req, res) => {
  const sql = `SELECT itemNo, batchNo, itemName, expireDate, quantity, noOfQuantity FROM items01 
  WHERE ( expireDate between CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 60 DAY)) OR (quantity < noOfQuantity  AND quantity >= 0)`;
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching items:', err);
      res.status(500).json({ error: 'Error fetching items' });
      return;
    }
    res.json(result);
  });
};

// get items to edit
exports.geteditItem = (req, res) => {
  const { itemNo, batchNo } = req.params;
  const sql = `SELECT itemName, unitPrice, quantity, expireDate FROM items01 WHERE itemNo = ? AND batchNo = ?`;
  db.query(sql, [itemNo, batchNo], (err, result) => {
    if (err) {
      console.error('Error fetching items:', err);
      res.status(500).json({ error: 'Error fetching items' });
      return;
    }
    const x = result[0];
    res.json(x);
  });
};

// update item
exports.updateItem = (req, res) => {
  const { itemNo, batchNo } = req.params;
  const { itemName, unitPrice, quantity, expireDate } = req.body;
  const sql = `UPDATE items01 SET itemName = ?, unitPrice = ?, quantity = ?, expireDate = ? WHERE itemNo = ? AND batchNo = ?`;
  db.query(sql, [itemName, unitPrice, quantity, expireDate, itemNo, batchNo], (err, result) => {
    if (err) {
      console.error('Error updating item:', err);
      res.status(500).json({ error: 'Error updating item' });
      return;
    }
    res.json({ message: 'Item updated successfully' });
  });
};

// declarin a function for get detasils
exports.getItemDetails = (req, res) => {
  const { itemNo } = req.params;
  const sql = 'SELECT * FROM items01 WHERE itemNo = ?';
  db.query(sql, [itemNo], (err, result) => {
    if (err) {
      console.error('Error fetching items:', err);
      res.status(500).json({ error: 'Error fetching items' });
      return;
    }
    res.json(result);
  });
};

// to get the items for the forecasting
exports.getItemsForForecasting = (req, res) => {
  const sql = `SELECT ROUND(SUM(sii.unitPrice * sii.quantity), 2) AS totalSales
FROM shop_orders_include sii JOIN shop_orders1 so ON sii.orderNo = so.orderNo
WHERE so.orderDate BETWEEN DATE_SUB(CURDATE(), INTERVAL 3 MONTH) AND CURDATE();`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching items', err);
      res.status(500).json({ error: 'Error fetching items' });
      return;
    }

    const totalSales = result.length > 0 ? result[0].totalSales : 0;
    
    res.json({ totalSales });
  });
};


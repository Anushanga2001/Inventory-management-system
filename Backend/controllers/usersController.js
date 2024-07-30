const db = require('../config/database');

exports.addUser = (req, res) => {
  const { firstName, lastName, userName, password, dob, jobPosition } = req.body;
  const sql = 'INSERT INTO users01 (firstName, lastName, userName, password, dob, jobPosition) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [firstName, lastName, userName, password, dob, jobPosition];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting user:', err);
      res.status(500).json({ error: 'Error inserting user' });
      return;
    }
    console.log('User inserted:', result);
    res.json({ message: 'User inserted successfully' });
  });
};

exports.updateUserss = (req, res) => {
  const { userName, password } = req.body;
  const { userID } = req.params;

  const sql = 'UPDATE users01 SET userName = ?, password = ? WHERE userID = ?';
  const values = [userName, password, userID];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating user:', err);
      res.status(500).json({ error: 'Error updating user' });
      return;
    }
    console.log('User updated:', result);
    res.json({ message: 'User updated successfully' });
  });
};


exports.getUsers = (req, res) => {
  const sql = 'SELECT * FROM users01';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'Error fetching users' });
      return;
    }
    res.json(result);
  });
};

exports.getUser = (req, res) => {
  const sql = 'SELECT * FROM users01 WHERE userID = ?';
  const { userID } = req.params;
  db.query(sql, [userID], (err, result) => { // Pass userId as a parameter
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'Error fetching users' });
      return;
    }
    const x = result[0];
    res.json(x);
  });
};

exports.updateUser = (req, res) => {
  const { firstName, lastName, dob } = req.body;
  const { userId } = req.params;

  const sql = 'UPDATE users01 SET firstName = ?, lastName = ?, dob = ? WHERE userID = ?';
  const values = [firstName, lastName, dob, userId];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating user:', err);
      res.status(500).json({ error: 'Error updating user' });
      return;
    }

    // Check if any rows were affected
    if (result.affectedRows === 0) {
      // If no rows were affected, user with the specified userID was not found
      res.status(404).json({ error: 'User not found' });
      return;
    }

    console.log('User updated:', result);
    res.json({ message: 'User updated successfully' });
  });
};

exports.updateUsers = (req, res) => {
  const { firstName, lastName, userName, password, jobPosition } = req.body;
  const { userID } = req.params;

  const sql = 'UPDATE users01 SET firstName = ?, lastName = ?, userName = ?, password = ?, jobPosition = ? WHERE userID = ?';
  const values = [firstName, lastName, userName, password, jobPosition, userID];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating user:', err);
      res.status(500).json({ error: 'Error updating user' });
      return;
    }
    console.log('User updated:', result);
    res.json({ message: 'User updated successfully' });
  });
};

exports.updateUser1 = (req, res) => {
  const sql = 'UPDATE users01 SET status = ? WHERE userID = ?';
  const { userID } = req.params;
  const newStatus = 'invalid'; 

  db.query(sql, [newStatus, userID], (err, result) => {
    if (err) {
      console.error('Error updating user:', err);
      res.status(500).json({ error: 'Error updating user' });
      return;
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User updated successfully' });
  });
};

exports.deleteUsers = (req, res) => {
  const sql = 'DELETE FROM users01 WHERE userID = ?';
  const { userID } = req.params;

  db.query(sql, [userID], (err, result) => {
    if (err) {
      console.error('Error deleting user:', err);
      res.status(500).json({ error: 'Error deleting user' });
      return;
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  });
};

const db = require('../config/database');
const jwt = require('jsonwebtoken');

exports.signIn = (req, res) => {
    const { userName, password } = req.body;
    const sql = 'SELECT * FROM users01 WHERE userName = ? AND password = ?';
    const values = [userName, password];
  
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error authenticating user:', err);
            res.status(500).json({ error: 'Error authenticating user' });
            return;
        }

        if (result.length === 0) {
            // User not found or incorrect password
            res.status(401).json({ message: 'Invalid username or password' });
        }
        else {

            // Extract user's job position from the result
            const userJobPosition = result[0].jobPosition;
            const userFirstName = result[0].firstName;
            const userID = result[0].userID;

            // Generate JWT token
            const token = jwt.sign(
                { userName: userName, jobPosition: userJobPosition}, 
                'your_secret_key',
                { expiresIn: '30m' } 
            );
              
            // Send success response with user's job position and token
            res.status(200).json({ 
                message: 'User authenticated successfully',
                jobPosition: userJobPosition,
                firstName: userFirstName,
                userID: userID,
                token: token
            });
        }
    });
};

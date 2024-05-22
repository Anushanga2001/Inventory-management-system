const db = require('../config/database');

exports.getdisplay = (req, res) => {
    const sql = 'SELECT id, name, unitPrice, TO_BASE64(image) AS image FROM manufacture_company_display';
    db.query(sql, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  };  
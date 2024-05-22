
const express = require('express');
const cors = require('cors');
const app = express();
const usersRoutes = require('./routes/usersRoutes');
const path = require('path');

app.use(express.json());
app.use(cors());
app.use(usersRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
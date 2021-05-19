const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes

app.use('/api/milk', require('./Routes/Milk'));

app.use('/api/products', require('./Routes/Products'));
app.use('/api/sells', require('./Routes/Sells'));
app.use('/api/Historymilk', require('./Routes/mh'));
app.use('/api/delsells', require('./Routes/sh'));
app.use('/api/customers/customers', require('./Routes/Customers'));
app.use('/api/rate', require('./Routes/Rate'));

// app.use('/api/products', require('./Routes/Product'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

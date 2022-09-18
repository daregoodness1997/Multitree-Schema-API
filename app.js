require('express-async-errors');
require('dotenv').config();

const express = require('express');
const app = express();

// connect DB
const connectDB = require('./db/connect');

const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');

app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(cors());

// routes

const categoryRoutes = require('./routes/category');

app.get('/', (req, res) => {
  res.send('Category API');
});

app.use('/api/v1/category', categoryRoutes);

const PORT = process.env.PORT || 9000;
const start = async () => {
  try {
    app.listen(PORT, console.log('Server started at port 7000'));

    await connectDB(process.env.MONGO_URL);
  } catch (err) {
    console.error(err);
  }
};

start();

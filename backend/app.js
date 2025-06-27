const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const todoRoutes = require('./routes/todoRoutes');
const authRoutes = require('./routes/auth');
const cors = require("cors");

const app = express();
app.use(express.json());


app.use(cors({
  origin: "https://mern-todo-app-gursnehs-projects.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('ToDo API working!');
});

app.use('/api/todos', todoRoutes); 
app.use('/api/auth', authRoutes);

module.exports = app;
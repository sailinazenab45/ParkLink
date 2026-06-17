require('dotenv').config();

const authRoutes = require('./routes/auth');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const complaintRoutes = require('./routes/complaint');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api', complaintRoutes);
mongoose.connect(process.env.MONGO_URI, {
    family: 4
})
.then(() => {
    console.log('✅ MongoDB Connected');
})
.catch((err) => {
    console.log('❌ MongoDB Error:', err);
});

app.get('/', (req, res) => {
    res.send('Parklink Backend Running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server Running on Port ${PORT}`);
});
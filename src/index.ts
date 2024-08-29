import express from 'express';
import dotenv from 'dotenv';
import connectDb from './db/db';

dotenv.config();

connectDb();

const app = express()
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send("Ionic Backend Working Correctly")
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
import express from 'express';
import dotenv from 'dotenv';
import connectDb from './db/db';
import bodyParser from 'body-parser';
import cors from 'cors';

import { AuthRouter } from './routes/AuthRouter';
import { CompanyAuthRouter } from './routes/CompanyAuthRouter';
import { CompanyRouter } from './routes/CompanyRouter';

dotenv.config();

connectDb();

const app = express()
app.use(bodyParser.json());
app.use(cors());
const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send("Ionic Backend Working Correctly")
})

app.use('/auth', AuthRouter);
app.use('/auth-company', CompanyAuthRouter);
app.use('/company', CompanyRouter);

app.listen(PORT as number, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
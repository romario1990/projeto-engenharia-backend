
// file server.js
import dotenv from 'dotenv';
import express from 'express';
import rotas from './rotas';
import Dao from './dao';
import cors from 'cors';

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());
app.use(rotas);

Dao.config().then(() => {
  app.listen(port, () => {
    console.log(`started in port: ${port}`);
  });
});

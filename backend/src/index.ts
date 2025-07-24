
import express from 'express';
import cors from 'cors';
import path from 'path';
import alunoRoutes from './routes/alunoRoutes.js';
import professorRoutes from './routes/professorRoutes.js';
import postRoutes from './routes/postRoutes.js';

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

import { dirname } from 'path';
const __dirname = dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());

app.use(alunoRoutes);
app.use(professorRoutes);
app.use(postRoutes);

app.listen(3001, '0.0.0.0', () => {
  console.log('Servidor http://100.64.15.120:3001');
});

console.log("BACKEND INICIANDO");

const express = require('express');
const cors = require('cors');
const path = require("path");

const alunoRoutes = require('./routes/alunoRoutes');
const professorRoutes = require('./routes/professorRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

// Servir uploads como estático
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Configuração do CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

// Body parser
app.use(express.json());

// Rotas
app.use('/acessoaluno', alunoRoutes);
app.use('/acessoprofessor', professorRoutes);
app.use('/posts', postRoutes);

// Start server
app.listen(3001, '0.0.0.0', () => {
  console.log('Servidor rodando em http://192.168.1.111:3001');
});

module.exports = app;

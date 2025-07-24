
console.log("BACKEND INICIANDO")

const express = require('express');
const cors = require('cors');
const alunoRoutes = require('./routes/alunoRoutes');
const professorRoutes = require('./routes/professorRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

const path = require("path");


app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json());

app.use('/acessoaluno', alunoRoutes);
app.use('/acessoprofessor', professorRoutes);
app.use('/posts', postRoutes);

app.listen(3001, '0.0.0.0', () => {
  console.log('Servidor http://100.64.15.120:3001');
});

module.exports = app;
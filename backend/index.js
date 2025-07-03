
const express = require('express');
const cors = require('cors');
const alunoRoutes = require('./routes/alunoRoutes');
const professorRoutes = require('./routes/professorRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

const path = require("path");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));


app.use(express.json());

app.use('/acessoaluno', alunoRoutes);
app.use('/acessoprofessor', professorRoutes);
app.use('/posts', postRoutes);

app.listen(3001, '0.0.0.0', () => {
  console.log('Servidor rodando em http://100.64.15.109:3001');
});



module.exports = app;
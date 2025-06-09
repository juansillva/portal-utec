
const express = require('express');
const cors = require('cors');
const alunoRoutes = require('./routes/alunoRoutes');
const professorRoutes = require('./routes/professorRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

app.use(cors({ origin: ['http://localhost:5173', 'http://100.64.15.113:5173'] }));
app.use(express.json());

app.use('/acesso', alunoRoutes);
app.use('/login', professorRoutes);
app.use('/posts', postRoutes);

app.listen(3001, '0.0.0.0', () => {
  console.log('Servidor rodando na porta 3001');
  console.log('Acesse http://localhost:3001/acesso para validar o acesso do aluno');
});


module.exports = app;
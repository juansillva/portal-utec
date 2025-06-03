const express = require('express');
const cors = require('cors');
const alunoRoutes = require('./routes/alunoRoutes');
const professorRoutes = require('./routes/professorRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

app.use(cors({ origin: ['http://localhost:5173'] }));
app.use(express.json());

app.use('/acesso', alunoRoutes);
app.use('/login', professorRoutes);
app.use('/posts', postRoutes);

app.listen(3001, () => {
  console.log('Backend rodando em http://localhost:3001');
});

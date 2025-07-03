const db = require('../database/db');

exports.criarPost = (req, res) => {
  const { titulo, conteudo, turma, professor_nome, avatar } = req.body;

  if (!titulo || !turma || !professor_nome) {
    return res.status(400).json({ message: 'Campos obrigatórios: título, turma e professor.' });
  }

  const sql = `
    INSERT INTO posts (titulo, conteudo, turma_id, professor_nome, avatar, data_criacao)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const values = [
    titulo,
    conteudo || '',
    turma,
    professor_nome,
    avatar || '', 
    new Date().toISOString()
  ];

  db.run(sql, values, function (err) {
    if (err) {
      console.log('Erro ao criar o post')
      return res.status(500).json({ message: 'Erro ao criar post', error: err.message });
    }

    res.status(201).json({
      message: 'Post criado com sucesso',
      post: {
        id: this.lastID,
        titulo,
        conteudo,
        turma_id: turma,
        professor_nome,
        avatar
      }
    });
  });
};


exports.listarPosts = (req, res) => {
  db.all(
    `SELECT posts.*, turmas.nome as turma_nome
     FROM posts
     LEFT JOIN turmas ON posts.turma_id = turmas.id
     ORDER BY data_criacao DESC`,
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao buscar posts', error: err.message });
      }
      res.json(rows);
    }
  );
};
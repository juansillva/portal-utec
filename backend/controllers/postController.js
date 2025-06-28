const db = require('../database/db');

exports.criarPost = (req, res) => {
  const { titulo, conteudo, turma, professor_nome } = req.body;

if (!titulo || !turma || !professor_nome) {
  return res.status(400).json({ message: 'Campos obrigatórios: título, turma e professor.' });
}

 const sql = `
  INSERT INTO posts (titulo, conteudo, turma_id, professor_nome, data_criacao)
  VALUES (?, ?, ?, ?, ?)
`;

const values = [
  titulo,
  conteudo || '',
  turma,
  professor_nome,
  new Date().toISOString()
];


 db.run(sql, values, function (err) {
    if (err) {
      return res.status(500).json({ message: 'Erro ao criar post', error: err.message });
    }

    res.status(201).json({
      message: 'Post criado com sucesso',
      post: {
        id: this.lastID,
        titulo,
        conteudo,
        turma_id: turma,
        professor_nome: professor_nome
      }
    });
  });

};

exports.listarPostsPorTurma = (req, res) => {
  const { turma } = req.params;
  db.all(
    'SELECT * FROM posts WHERE turma = ? ORDER BY data_criacao DESC',
    [turma],
    (err, rows) => {
      if (err) return res.status(500).json({ message: 'Erro ao buscar posts', error: err.message });


      const posts = rows.map((post) => ({
        ...post,
        anexos: post.anexos ? JSON.parse(post.anexos) : [],
        imagens: post.imagens ? JSON.parse(post.imagens) : [],
      }));

      res.json(posts);
    }
  );
};

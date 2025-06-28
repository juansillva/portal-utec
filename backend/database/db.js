const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const bcrypt = require("bcrypt");

const db = new sqlite3.Database(path.resolve(__dirname, "uconnect.db"));

const saltRounds = 10;

const initDB = async () => { 
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS turmas (
      id INTEGER PRIMARY KEY,
      nome TEXT UNIQUE
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS professores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      avatar TEXT,
      nome TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      senha TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      conteudo TEXT,
      data_criacao TEXT DEFAULT CURRENT_TIMESTAMP,
      professor_nome TEXT,
      turma_id INTEGER,
      FOREIGN KEY (professor_nome) REFERENCES professores(nome),
      FOREIGN KEY (turma_id) REFERENCES turmas(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS professor_turma (
      professor_id INTEGER,
      turma_id INTEGER,
      PRIMARY KEY (professor_id, turma_id),
      FOREIGN KEY (professor_id) REFERENCES professores(id),
      FOREIGN KEY (turma_id) REFERENCES turmas(id)
    )`);
  });

  const turmas = [
    { id: 1, nome: "IA, Fake News e Redes Sociais" },
    { id: 2, nome: "Transformando Lixo em Vida" },
    { id: 3, nome: "SustentaTech - AF" },
    { id: 4, nome: "SustentaTech - AI" },
    { id: 5, nome: "EcoBots" },
  ];

  for (const turma of turmas) {
    db.run(`INSERT OR IGNORE INTO turmas (id, nome) VALUES (?, ?)`, [
      turma.id,
      turma.nome,
    ]);
  }


  const professores = [
    {
      nome: "Kleber Alberto",
      email: "kleber@utec.com",
      senha: "123456",
      turmas: [1, 3],
    },
    {
      nome: "Hylka Waleska",
      email: "hylka@utec.com",
      senha: "123456",
      turmas: [2, 4],
    },
    {
      nome: "Paulo Deywson",
      email: "paulo@utec.com",
      senha: "123456",
      turmas: [5],
    },
  ];

  for (const prof of professores) {
    const senhaHash = await bcrypt.hash(prof.senha, saltRounds);

    db.run(
      `INSERT OR IGNORE INTO professores (nome, email, senha) VALUES (?, ?, ?)`,
      [prof.nome, prof.email, senhaHash],
      function (err) {
        if (err) {
          console.error("Erro ao inserir professor:", err.message);
        } else {
          const professorId = this.lastID;

          for (const turmaId of prof.turmas) {
            db.run(
              `INSERT OR IGNORE INTO professor_turma (professor_id, turma_id) VALUES (?, ?)`,
              [professorId, turmaId]
            );
          }
        }
      }
    );
  }

  console.log("Banco inicializado com tabelas e dados fixos.");
};

initDB();

module.exports = db;

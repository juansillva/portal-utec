const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  const turmas = [
    { id: 1, nome: "T13 - Criatividade na Ponta da Caneta", icon: "iconGloboMini.svg" },
    { id: 2, nome: "T14 - Conexões Sustentáveis ", icon: "iconGloboMini.svg" },
    { id: 3, nome: "T12 - Transforma Info", icon: "iconEcoBotsMini.svg" },
    { id: 4, nome: "T11 - Transforma Info", icon: "iconEcoBotsMini.svg" },
  ];

  for (const t of turmas) {
    await prisma.turma.upsert({
      where: { nome: t.nome },
      update: {},
      create: t,
    });
  }

  const professores = [
    { nome: "Kleber Alberto", email: "kleber@utec.com", senha: "123456", avatar: "kleber_avatar.jpg", turmas: [1,3] },
    { nome: "Hylka Waleska", email: "hylka@utec.com", senha: "123456", avatar: "hylka_avatar.jpg", turmas: [2,4] },
    { nome: "Paulo Deywson", email: "paulo@utec.com", senha: "123456", avatar: "paulo_avatar.jpg", turmas: [5] },
  ];

  for (const p of professores) {
    const senhaHash = await bcrypt.hash(p.senha, 10);

    const professor = await prisma.professor.upsert({
      where: { email: p.email },
      update: {},
      create: {
        nome: p.nome,
        email: p.email,
        senha: senhaHash,
        avatar: p.avatar,
      },
    });

    for (const turmaId of p.turmas) {
      await prisma.professorTurma.upsert({
        where: { professor_id_turma_id: { professor_id: professor.id, turma_id: turmaId } },
        update: {},
        create: { professor_id: professor.id, turma_id: turmaId },
      });
    }
  }

  console.log("Seed completa!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

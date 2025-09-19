const prisma = require("../prisma/prismaClient");

exports.criarPost = async (req, res) => {
  const { titulo, conteudo, turma_id, professor_email } = req.body;

  if (!titulo || !turma_id || !professor_email) {
    return res.status(400).json({ message: 'Campos obrigatórios: título, turma e professor.' });
  }

  try {
    // Buscar o professor pelo email
    const professor = await prisma.professor.findUnique({
      where: { email: professor_email }
    });

    if (!professor) {
      return res.status(404).json({ message: 'Professor não encontrado' });
    }

    // Criar o post conectando ao professor e à turma
    const post = await prisma.post.create({
      data: {
        titulo,
        conteudo: conteudo || '',
        professor: { connect: { id: professor.id } },
        turma: { connect: { id: Number(turma_id) } }
      },
      include: {
        professor: {
          select: { id: true, nome: true, email: true, avatar: true }
        },
        turma: {
          select: { id: true, nome: true, icon: true }
        }
      }
    });

    // CORREÇÃO: Gerar URL completa APENAS se avatar existe e não é uma URL completa
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const postJson = {
      ...post,
      professor: {
        ...post.professor,
        avatarUrl: post.professor.avatar && !post.professor.avatar.startsWith('http')
          ? `${baseUrl}/uploads/${post.professor.avatar}`
          : post.professor.avatar
      }
    };

    console.log('Post criado com dados da turma:', postJson.turma);
    console.log('Avatar URL gerada:', postJson.professor.avatarUrl);
    res.status(201).json({ message: "Post criado com sucesso", post: postJson });
  } catch (err) {
    console.error('Erro ao criar post:', err);
    res.status(500).json({ message: 'Erro ao criar post', error: err.message });
  }
};

exports.listarPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { data_criacao: 'desc' },
      include: {
        professor: {
          select: { id: true, nome: true, email: true, avatar: true }
        },
        turma: {
          select: { id: true, nome: true, icon: true }
        },
      },
    });

    console.log('Posts encontrados:', posts.length);
    if (posts[0]) {
      console.log('Primeiro post com turma:', posts[0].turma);
      console.log('Avatar do primeiro post:', posts[0].professor?.avatar);
    }

    const baseUrl = `${req.protocol}://${req.get('host')}`;

    const postsComAvatarUrl = posts.map(post => {
      const prof = post.professor || null;
      return {
        ...post,
        professor: prof ? {
          ...prof,
          // CORREÇÃO: Só adicionar baseUrl se o avatar não for uma URL completa
          avatarUrl: prof.avatar && !prof.avatar.startsWith('http')
            ? `${baseUrl}/uploads/${prof.avatar}`
            : prof.avatar
        } : null
      };
    });

    console.log('Avatar URL final do primeiro post:', postsComAvatarUrl[0]?.professor?.avatarUrl);
    res.json(postsComAvatarUrl);
  } catch (err) {
    console.error('Erro ao listar posts:', err);
    res.status(500).json({ message: 'Erro ao buscar posts', error: err.message });
  }
};
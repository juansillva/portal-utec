const prisma = require("../../prisma/prismaClient");

exports.criarPost = async (req, res) => {
  const { titulo, conteudo, turma_id, professor_email } = req.body;

  if (!titulo || !turma_id || !professor_email) {
    return res.status(400).json({ message: 'Campos obrigatórios: título, turma e professor.' });
  }

  try {

    const professor = await prisma.professor.findUnique({
      where: { email: professor_email }
    });

    if (!professor) {
      return res.status(404).json({ message: 'Professor não encontrado' });
    }

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

exports.excluirPost = async (req, res) => {
  const { id, idUser } = req.params;

  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(id) }
    });

    if (!post) {
      return res.status(404).json({ message: 'Post não encontrado' });
    }

    await prisma.post.delete({
      where: { id: Number(id) }
    });

    res.json({ message: 'Post excluído com sucesso' });
  } catch (err) {
    console.error('Erro ao excluir post:', err);
    res.status(500).json({ message: 'Erro ao excluir post', error: err.message });
  }
}

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

exports.listarPostsPorID = async (req, res) => {
  const { id } = req.params; 

  try {
    const post = await prisma.post.findUnique({
      where: { 
        id: Number(id) 
      },
      include: {
        professor: {
          select: {
            id: true,       
            nome: true,
            avatar: true,
          }
        },
        turma: {
          select: {
            id: true,
            nome: true,
          }
        }
      }
    });

    if (!post) {
      return res.status(404).json({ 
        message: "Post não encontrado" 
      });
    }

    return res.status(200).json({
      id: post.id,
      titulo: post.titulo,
      conteudo: post.conteudo,
      professor_id: post.professor_id, 
      professor_nome: post.professor.nome,
      avatar: post.professor.avatar,
      turma_id: post.turma_id,
      turma_nome: post.turma.nome,
      data_criacao: post.data_criacao,
    });

  } catch (error) {
    console.error("Erro ao buscar post:", error);
    return res.status(500).json({ 
      message: "Erro ao buscar post" 
    });
  }
};

exports.atualizarPost = async (req, res) => {
  const { id } = req.params;
  const { titulo, conteudo, turma_id } = req.body;

  if (!titulo || !conteudo || !turma_id) {
    return res.status(400).json({
      message: 'Campos obrigatórios: título, conteúdo e turma.'
    });
  }

  try {
    const postAtualizado = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        titulo,
        conteudo,
        turma_id: Number(turma_id),
      },
    });

    return res.status(200).json({
      message: 'Post atualizado com sucesso!',
      post: postAtualizado
    });

  } catch (error) {
    console.error("Erro ao atualizar post:", error);
    return res.status(500).json({
      message: "Erro ao atualizar post",
      error: error.message
    });
  }
};

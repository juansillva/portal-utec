import api from "./api";

export async function atualizarPost(
  id: number,
  titulo: string,
  conteudo: string,
  turma: string
) {
  try {
    const response = await api.put(`/posts/${id}`, {
      titulo,
      conteudo,
      turma_id: Number(turma), 
    });

    console.log("Post atualizado com sucesso:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar post:", error);
    throw error;
  }
}

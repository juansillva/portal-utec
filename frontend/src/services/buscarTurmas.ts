import api from './api';

export async function buscarTurmas() {
try {
   const turmas = await api.get('/turmas')
    return turmas.data
} catch (error) {
    console.error('Erro ao buscar a turma:', error);
    throw error;
}
}
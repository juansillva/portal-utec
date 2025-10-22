import api from './api';

export async function excluirPost(id: number){

    const response = api(`/posts/${id}`)

    return (await response).data
}
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import HeaderUconnect from '../../components/uconnect/HeaderUconnect'
import CreatePost from '../../components/uconnect/CriarPost'
import Sidebar from '../../components/uconnect/Sidebar'
import SidebarRight from '../../components/uconnect/SidebarRight'
import axios from 'axios';


import '../../styles/uconnect/_FeedAluno.scss'

const FeedAluno = () => {

  useEffect(() => {
    document.body.classList.add('feed-aluno')
    return () => {
      document.body.classList.remove('feed-aluno')
    }
  }, [])

  const { turma } = useParams(); 
  const [posts, setPosts] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/feed/${turma}`);
        setPosts(res.data);
        console.log(res.data)
      } catch (err) {
        console.error("Erro ao carregar feed:", err);
        setPosts([]);
      } finally {
        setCarregando(false);
      }
    };

    if (turma) {
      fetchPosts();
    }
  }, [turma]);

  if (carregando) return <p>Carregando conteúdo da turma {turma}...</p>;

  return (
    <div>
      <HeaderUconnect />
      <Sidebar />
      <SidebarRight />
      <CreatePost />
    </div>
  );
};

export default FeedAluno;

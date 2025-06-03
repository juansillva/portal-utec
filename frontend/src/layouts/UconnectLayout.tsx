import HeaderUconnect from '../components/uconnect/HeaderUconnect'
import FeedAluno from '../components/uconnect/FeedAluno'
import FeedProfessor from '../components/uconnect/FeedProfessor'
import CreatePost from '../components/uconnect/CriarPost'
import Sidebar from '../components/uconnect/Sidebar'
import SidebarRight from '../components/uconnect/SidebarRight'

const UconnectLayout = () => {
  return (
    <div className="uconnect">
      <HeaderUconnect />
      <Sidebar />
      <SidebarRight />
      <FeedAluno />
      <FeedProfessor />
      <CreatePost />
    </div>
  )
}

export default UconnectLayout

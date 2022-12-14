import {
  faGlobe,
  faHome,
  faLock,
  faNoteSticky,
  faRightFromBracket,
  faTimes,
  faUser,
  faUsers
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import Logo from '../../assets/logo.jpg'
import { AuthContext } from '../../context/auth'
import './Sidebar.css'

type Props = {
  sidebarOpen: boolean
  handleSidebarOpen: () => void
}

export const SideBar = ({ sidebarOpen, handleSidebarOpen }: Props) => {
  const { logout } = useContext<any>(AuthContext)

  return (
    <>
      <div className={sidebarOpen ? 'sidebar-responsive' : ''} id="sidebar">
        <div className="sidebar__title">
          <div className="sidebar__img">
            <img src={Logo} alt="logo" />
            <h1>Notes Dashboard</h1>
            <FontAwesomeIcon
              onClick={handleSidebarOpen}
              icon={faTimes}
              id="sidebarIcon"
              aria-hidden="true"
            />
          </div>
        </div>
        <div className="sidebar__menu">
          <div className="sidebar__link active_menu_link">
            <FontAwesomeIcon icon={faHome} />
            <a href="/dashboard">Home</a>
          </div>

          <h2>MEU PAINEL</h2>
          <div className="sidebar__link">
            <FontAwesomeIcon icon={faNoteSticky} />
            <a href="#">Minhas Anotações</a>
          </div>
          <div className="sidebar__link">
            <FontAwesomeIcon icon={faUser} />
            <a href="#">Meus Dados</a>
          </div>
          <div className="sidebar__link">
            <FontAwesomeIcon icon={faLock} />
            <a href="#">Alterar Senha</a>
          </div>

          <h2>ADMIN</h2>
          <div className="sidebar__link">
            <FontAwesomeIcon icon={faGlobe} />
            <a href="#">Área Administrativa</a>
          </div>
          <div className="sidebar__link">
            <FontAwesomeIcon icon={faUsers} />
            <a href="#">Gerenciar Usuários</a>
          </div>
          <div className="sidebar__link">
            <FontAwesomeIcon icon={faNoteSticky} />
            <a href="#">Gerenciar Anotações</a>
          </div>
          <div className="sidebar__link sidebar__logout">
            <FontAwesomeIcon icon={faRightFromBracket} />
            <a href="#" onClick={logout}>
              Logout
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

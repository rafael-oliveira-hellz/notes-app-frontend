import { Main } from 'components/Main'
import { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Navbar } from '../../components/Navbar'
import { SideBar } from '../../components/SideBar'
import { AuthContext } from '../../context/auth'
import { ViewUsers } from '../../pages/Admin/Users/ViewUsers'
import api from '../../utils/api'

export const Dashboard = () => {
  const { authenticated } = useContext<any>(AuthContext)
  const [user, setUser] = useState<any>({})
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const location = useLocation()
  const [token] = useState(sessionStorage.getItem('access_token') || '')

  const handleSidebarOpen = () => {
    setSidebarOpen(!sidebarOpen)
    console.log(sidebarOpen)
  }

  useEffect(() => {
    console.log(authenticated)
    if (!authenticated) {
      navigate('/login')
    }

    api
      .get('/auth/verify-user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        sessionStorage.setItem(
          'user_verified',
          JSON.stringify(response.data.user)
        )
        console.log(response.data.user)
        setUser(response.data.user)
      })
  }, [authenticated, navigate, token])
  return (
    <>
      <div className="container">
        <SideBar
          sidebarOpen={sidebarOpen}
          handleSidebarOpen={handleSidebarOpen}
        />

        {location.pathname === '/dashboard' && <Main user={user} />}

        {location.pathname === '/dashboard/users' && <ViewUsers user={user} />}

        <Navbar
          handleSidebarOpen={handleSidebarOpen}
          sidebarOpen={sidebarOpen}
        />
      </div>
    </>
  )
}

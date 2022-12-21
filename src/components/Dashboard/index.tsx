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
  const [access_token] = useState(sessionStorage.getItem('access_token') || '')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const location = useLocation()

  const handleSidebarOpen = () => {
    setSidebarOpen(!sidebarOpen)
    console.log(sidebarOpen)
  }

  useEffect(() => {
    console.log(authenticated)
    if (!authenticated) {
      navigate('/login')
    }

    if (access_token) {
      api
        .get('/auth/verify-user', {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        })
        .then((response) => {
          console.log(response.data)
          setUser(response.data.user)
        })
    }
  }, [authenticated, access_token, navigate])
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

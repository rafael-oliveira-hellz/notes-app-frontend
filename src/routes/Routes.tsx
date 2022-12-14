import { useContext, useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Dashboard } from '../components/Dashboard'
import { AuthContext } from '../context/auth'
import LoginPage from '../pages/Login'
import SignupPage from '../pages/Signup'
import api from '../utils/api'

function AllRoutes() {
  const [user, setUser] = useState<any>({})
  const [access_token] = useState(sessionStorage.getItem('access_token') || '')

  useEffect(() => {
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
  }, [access_token])

  const Private = ({ children }: any) => {
    const { authenticated, loading } = useContext<any>(AuthContext)
    if (loading) {
      return <div id="loading">Carregando...</div>
    }
    if (!authenticated) {
      return <Navigate to="/login" />
    }

    return children
  }
  return (
    <Routes>
      <Route index element={<LoginPage />} /> {/* default route */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      {/* <Route path="/profile" component={Profile} /> */}
      <Route
        path="/dashboard"
        element={
          <Private>
            <Dashboard />
          </Private>
        }
      />
      {/* <<Route path="/create-profile" component={CreateProfile} />
      <Route path="/edit-profile" component={EditProfile} />
      <Route path="/add-experience" component={AddExperience} />
      <Route path="/add-education" component={AddEducation} />
      <Route path="/posts" component={Posts} />
      <Route path="/post/:id" component={Post} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" /> */}
    </Routes>
  )
}

export default AllRoutes

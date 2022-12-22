import { Route, Routes } from 'react-router-dom'
import { Dashboard } from '../components/Dashboard'
import { ViewUsers } from '../pages/Admin/Users/ViewUsers'
import { ViewUser } from '../pages/Admin/Users/view-user'
import LoginPage from '../pages/Login'
import SignupPage from '../pages/Signup'

function AllRoutes() {
  return (
    <Routes>
      <Route element={<LoginPage />} /> {/* default route */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      {/* <Route path="/profile" component={Profile} /> */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/management/users" element={<ViewUsers />} />
      <Route path="/dashboard/*" element={<Dashboard />}>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<ViewUsers />}>
          <Route path=":id" element={<ViewUser />} />
        </Route>
      </Route>
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

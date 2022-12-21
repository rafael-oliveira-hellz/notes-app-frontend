import { useEffect, useState } from 'react'
import api from '../../../../utils/api'
import './ViewUsers.css'

export const ViewUsers = ({ user }: any) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<any>(null)
  const [data, setData] = useState<any>(null)

  // const columns: GridColDef[] = [
  //   { field: 'id', headerName: 'ID', width: 70 },
  //   { field: 'name', headerName: 'Usuário', width: 130 },
  //   { field: 'email', headerName: 'E-mail', width: 130 },
  //   {
  //     field: 'email_verified_at',
  //     headerName: 'E-mail Verificado Em:',
  //     width: 130
  //   },
  //   {
  //     field: 'role',
  //     headerName: 'Role',
  //     width: 90
  //   },
  //   {
  //     field: 'currentLoginDate',
  //     headerName: 'Login Atual',
  //     width: 90
  //   },
  //   {
  //     field: 'lastLoginDate',
  //     headerName: 'Último Login',
  //     width: 90
  //   },
  //   {
  //     field: 'status',
  //     headerName: 'Status',
  //     width: 90
  //   }
  // ]

  useEffect(() => {
    api
      .get('/users', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
        }
      })
      .then((res) => res.data)
      .then((data) => {
        setLoading(false)
        setData(data.data)
      })
      .catch((err) => {
        setLoading(false)
        setError(err.response.data.message)
      })
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  console.log(data)

  return (
    <>
      <main className="main__container">
        <div className="main__title">
          <img width="60" src="https://i.imgur.com/6VBx3io.png" alt="avatar" />
          <div className="main__greetings">
            <h1>Olá, {user.name.split(' ')[0]}!</h1>
            <p>Bem vindo ao painel de gerenciamento de usuários!</p>
          </div>
        </div>

        <ul>
          {data.map((user: any) => {
            return (
              <li key={user.id}>
                Nome: {user.name}
                <ul>
                  <li>E-mail: {user.email}</li>
                  <li>Role: {user.role}</li>
                  <br />
                </ul>
              </li>
            )
          })}
        </ul>
      </main>
    </>
  )
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  faChevronDown,
  faEdit,
  faEye,
  faTimes,
  faTrash
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import api from '../../../../utils/api'
import './ViewUsers.css'

export const ViewUsers = ({ user }: any) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<any>(null)
  const [data, setData] = useState<any>(null)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(10)
  const [totalDocuments, setTotalDocuments] = useState<number>(0)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [previousPage, setPreviousPage] = useState<number>(0)
  const [nextPage, setNextPage] = useState<number>(0)

  const showUser = (user: any) => {
    // send the user data to the edit endpoint
    // set the user data to the form
    // open the dialog
    console.log(user)
    // setSelectedUser(user)
    setShowModal(true)
  }

  const editUser = (user: any) => {
    // send the user data to the edit endpoint
    // set the user data to the form
    // open the dialog
  }

  const confirmDeleteUser = (user: any) => {
    // send the user data to the delete endpoint
    // set the user data to the form
    // open the dialog
  }

  // Search component
  const [query, setQuery] = useState('')
  const keys = ['name', 'email', 'role', 'status']
  const [filteredResults, setFilteredResults] = useState([])
  const pageLimit = ['5', '10', '15', '25', '50', '75', '100']

  const searchItems = (searchValue: any) => {
    setQuery(searchValue)
    if (query !== '') {
      const filteredData = data.filter((item: any) => {
        return keys.some((key) =>
          item[key]
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .includes(query.toLowerCase())
        )
      })
      setFilteredResults(filteredData)
    } else {
      setFilteredResults(data)
    }
  }

  const searchItemsByName = (searchValue: any) => {
    setQuery(searchValue)
    if (query !== '') {
      const filteredData = data.filter((item: any) => {
        return keys.some(() =>
          item['name']
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .includes(query.toLowerCase())
        )
      })
      setFilteredResults(filteredData)
    } else {
      setFilteredResults(data)
    }
  }

  const searchItemsByEmail = (searchValue: any) => {
    setQuery(searchValue)
    if (query !== '') {
      const filteredData = data.filter((item: any) => {
        return keys.some(() =>
          item['email']
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .includes(query.toLowerCase())
        )
      })
      setFilteredResults(filteredData)
    } else {
      setFilteredResults(data)
    }
  }

  const searchItemsByRole = (searchValue: any) => {
    setQuery(searchValue)
    if (query !== '') {
      const filteredData = data.filter((item: any) => {
        return keys.some(() =>
          item['role']
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .includes(query.toLowerCase())
        )
      })
      setFilteredResults(filteredData)
    } else {
      setFilteredResults(data)
    }
  }

  const searchItemsByStatus = (searchValue: any) => {
    setQuery(searchValue)
    if (query !== '') {
      const filteredData = data.filter((item: any) => {
        return keys.some(() =>
          item['status']
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .includes(query.toLowerCase())
        )
      })
      setFilteredResults(filteredData)
    } else {
      setFilteredResults(data)
    }
  }

  const changePageLimit = (pageParam: number) => {
    setLimit(pageParam)
  }

  const onNext = () => {
    if (page < totalPages) {
      setPreviousPage(page)
      setPage(page + 1)
    }
  }

  const onPrevious = () => {
    if (page > 1) {
      setNextPage(page)
      setPage(page - 1)
    }
  }

  // End of search component

  useEffect(() => {
    api
      .get(`/users?page=${page}&limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
        }
      })
      .then((res) => res.data)
      .then(
        (data) => {
          setData(data.data)
          setTotalPages(data.totalPages)
          setTotalDocuments(data.totalDocuments)
          setLoading(false)
        },
        (err) => {
          setError(err.response.data.message)
          setLoading(false)
        }
      )
  }, [limit, page])

  const closeModal = () => {
    setShowModal(false)
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <>
      <main className="main__container">
        <div className="main__title">
          <img width="60" src="https://i.imgur.com/6VBx3io.png" alt="avatar" />
          <div className="main__greetings">
            <h1>Olá, {user ? user.name.split(' ')[0].trim() : 'Visitante'}!</h1>
            <p>Bem vindo ao painel de gerenciamento de usuários!</p>
          </div>
        </div>

        {/* Novo datatable */}

        <div className="wrapper">
          <div className="card-grid">
            <div className="card">
              <div className="card-header">
                <h3>Usuários</h3>
                <button className="btn btn-primary">Novo usuário</button>

                {/* Search Button */}

                <div className="search-wrapper">
                  <label htmlFor="search-form">
                    <input
                      type="search"
                      name="search-form"
                      id="search-form"
                      className="search-input"
                      placeholder="Buscar por nome, email, função ou status"
                      onChange={(e) => searchItems(e.target.value)}
                    />
                    <span className="sr-only">Search data here</span>
                  </label>
                </div>

                {/* End of search button */}

                <div className="card-body">
                  <div className="table-responsive">
                    <table>
                      <thead>
                        <tr>
                          <th>
                            Usuário
                            <div className="search-wrapper">
                              <label htmlFor="search-form">
                                <input
                                  type="search"
                                  name="search-form"
                                  id="search-form"
                                  className="search-input"
                                  placeholder="Buscar por usuário"
                                  onChange={(e) =>
                                    searchItemsByName(e.target.value)
                                  }
                                />
                                <span className="sr-only">
                                  Search names here
                                </span>
                              </label>
                            </div>
                          </th>
                          <th>
                            E-mail
                            <div className="search-wrapper">
                              <label htmlFor="search-form">
                                <input
                                  type="search"
                                  name="search-form"
                                  id="search-form"
                                  className="search-input"
                                  placeholder="Buscar por e-mail"
                                  onChange={(e) =>
                                    searchItemsByEmail(e.target.value)
                                  }
                                />
                                <span className="sr-only">
                                  Search email here
                                </span>
                              </label>
                            </div>
                          </th>
                          <th>
                            Status
                            <div className="search-wrapper">
                              <label htmlFor="search-form">
                                <input
                                  type="search"
                                  name="search-form"
                                  id="search-form"
                                  className="search-input"
                                  placeholder="Buscar por status (active | inactive)"
                                  onChange={(e) =>
                                    searchItemsByStatus(e.target.value)
                                  }
                                />
                                <span className="sr-only">
                                  Search status here
                                </span>
                              </label>
                            </div>
                          </th>
                          <th>
                            Função
                            <div className="search-wrapper">
                              <label htmlFor="search-form">
                                <input
                                  type="search"
                                  name="search-form"
                                  id="search-form"
                                  className="search-input"
                                  placeholder="Buscar por função (user | admin)"
                                  onChange={(e) =>
                                    searchItemsByRole(e.target.value)
                                  }
                                />
                                <span className="sr-only">
                                  Search roles here
                                </span>
                              </label>
                            </div>
                          </th>
                          <th>Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {query.length > 1
                          ? filteredResults.map((item: any) => {
                              return (
                                <tr key={item.id}>
                                  <td>{item.name}</td>
                                  <td>{item.email}</td>
                                  <td>
                                    <span
                                      className={`user-badge status-${item.status}`}
                                    >
                                      {item.status}
                                    </span>
                                  </td>
                                  <td>
                                    <span
                                      className={`user-badge role-${item.role}`}
                                    >
                                      {item.role}
                                    </span>
                                  </td>
                                  <td>
                                    <FontAwesomeIcon
                                      icon={faEye}
                                      className="p-button-info mr-2"
                                      onClick={() => showUser(item)}
                                    />
                                    <FontAwesomeIcon
                                      icon={faEdit}
                                      className="p-button-success mr-2"
                                    />
                                    <FontAwesomeIcon
                                      icon={faTrash}
                                      className="p-button-danger"
                                    />
                                  </td>
                                </tr>
                              )
                            })
                          : data.map((user: any) => (
                              <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                  <span
                                    className={`user-badge status-${user.status}`}
                                  >
                                    {user.status}
                                  </span>
                                </td>
                                <td>
                                  <span
                                    className={`user-badge role-${user.role}`}
                                  >
                                    {user.role}
                                  </span>
                                </td>
                                <td>
                                  <FontAwesomeIcon
                                    icon={faEye}
                                    className="p-button-info mr-2"
                                    onClick={() => showUser(user)}
                                  />
                                  <FontAwesomeIcon
                                    icon={faEdit}
                                    className="p-button-success mr-2"
                                  />
                                  <FontAwesomeIcon
                                    icon={faTrash}
                                    className="p-button-danger"
                                  />
                                </td>
                              </tr>
                            ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="pagination">
                    <button className="btn btn-primary" onClick={onPrevious}>
                      Anterior
                    </button>
                    <button className="btn btn-primary" onClick={onNext}>
                      Próximo
                    </button>

                    <div className="page-info">
                      <span>
                        {page}-{totalPages} de {totalDocuments}
                      </span>

                      <div className="select">
                        <select
                          name="users"
                          id="users"
                          onChange={(e) =>
                            changePageLimit(parseInt(e.target.value))
                          }
                        >
                          {pageLimit.map((limit) => {
                            return (
                              <option value={limit} key={limit}>
                                {limit}
                              </option>
                            )
                          })}
                        </select>

                        <FontAwesomeIcon icon={faChevronDown} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`modal ${showModal ? 'isVisible' : 'isClosed'}`}>
          <div className="modal__content">
            <div className="modal__header">
              <h2>Visualizar Usuário</h2>
              <FontAwesomeIcon
                icon={faTimes}
                className="modal__close"
                onClick={closeModal}
              />

              <div className="modal__body">
                <div className="modal__body__left">
                  <img src={user.avatar} alt="avatar" />

                  <div className="modal__body__left__info">
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>

                    <div className="modal__body__left__info__status">
                      <span
                        className={`user-badge status-${user.status}`}
                        style={{ marginRight: '1rem' }}
                      >
                        {user.status}
                      </span>
                      <span className={`user-badge role-${user.role}`}>
                        {user.role}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

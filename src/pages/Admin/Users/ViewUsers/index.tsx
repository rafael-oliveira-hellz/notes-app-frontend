/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterMatchMode } from 'primereact/api'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { InputText } from 'primereact/inputtext'
import React, { useEffect, useState } from 'react'
import api from '../../../../utils/api'
// import { Toast } from 'primereact/toast';
// import { FileUpload } from 'primereact/fileupload';
// import { Rating } from 'primereact/rating';
// import { Toolbar } from 'primereact/toolbar';
// import { InputTextarea } from 'primereact/inputtextarea';
// import { RadioButton } from 'primereact/radiobutton';
// import { InputNumber } from 'primereact/inputnumber';
// import { Dialog } from 'primereact/dialog';
import { faEdit, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './ViewUsers.css'

export const ViewUsers = ({ user }: any) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<any>(null)
  const [data, setData] = useState<any>(null)

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    role: { value: null, matchMode: FilterMatchMode.EQUALS },
    status: { value: null, matchMode: FilterMatchMode.EQUALS }
  })

  const [globalFilterValue, setGlobalFilterValue] = useState('')
  const roles = ['admin', 'user']
  const statuses = ['active', 'inactive']

  const getUsers = (data: any) => {
    return [...(data || [])].map((d) => {
      return d
    })
  }

  const onGlobalFilterChange = (e: any) => {
    const value = e.target.value
    const _filters = { ...filters }
    _filters['global'].value = value

    setFilters(_filters)
    setGlobalFilterValue(value)
  }

  const renderHeader = () => {
    return (
      <div className="justify-content-end flex">
        <span className="p-input-icon-left">
          <FontAwesomeIcon icon={faSearch} />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Buscar por palavra-chave"
          />
        </span>
      </div>
    )
  }

  const emailBodyTemplate = (rowData: any) => {
    return (
      <React.Fragment>
        <span className="image-text">{rowData.email}</span>
      </React.Fragment>
    )
  }

  const statusBodyTemplate = (rowData: any) => {
    return (
      <span className={`customer-badge status-${rowData.status}`}>
        {rowData.status}
      </span>
    )
  }

  const statusItemTemplate = (option: any) => {
    return <span className={`customer-badge status-${option}`}>{option}</span>
  }

  const roleBodyTemplate = (rowData: any) => {
    return (
      <span className={`customer-badge status-${rowData.role}`}>
        {rowData.role}
      </span>
    )
  }

  const actionBodyTemplate = (rowData: any) => {
    return (
      <React.Fragment>
        <FontAwesomeIcon icon={faEdit} className="p-button-success mr-2" />
        <FontAwesomeIcon icon={faTrash} className="p-button-danger" />
      </React.Fragment>
    )
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

  // const roleItemTemplate = (option: any) => {
  //   return <span className={`customer-badge status-${option}`}>{option}</span>
  // }

  // const statusRowFilterTemplate = (options: any) => {
  //   return (
  //     <Dropdown
  //       value={options}
  //       options={statuses}
  //       onChange={(e) => options.filterApplyCallback(e.value)}
  //       itemTemplate={statusItemTemplate}
  //       placeholder="Select a Status"
  //       className="p-column-filter"
  //       showClear
  //     />
  //   )
  // }

  // const roleRowFilterTemplate = (options: any) => {
  //   return (
  //     <Dropdown
  //       value={options}
  //       options={roles}
  //       onChange={(e) => options.filterApplyCallback(e.value)}
  //       itemTemplate={roleItemTemplate}
  //       placeholder="Select a Role"
  //       className="p-column-filter"
  //       showClear
  //     />
  //   )
  // }

  const header = renderHeader()

  useEffect(() => {
    api
      .get('/users', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
        }
      })
      .then((res) => res.data)
      .then((data) => {
        setData(getUsers(data.data))
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        setError(err.response.data.message)
      })
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

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

        <div className="datatable-filter">
          <div className="card">
            <DataTable
              value={data}
              paginator
              className="p-datatable-users"
              rows={10}
              dataKey="id"
              filters={filters}
              filterDisplay="row"
              loading={loading}
              responsiveLayout="scroll"
              globalFilterFields={['name', 'email', 'role', 'status']}
              header={header}
              emptyMessage="No customers found."
            >
              <Column
                field="name"
                header="Usuário"
                filter
                filterPlaceholder="Buscar por nome..."
                style={{ minWidth: '16rem' }}
              />
              <Column
                header="E-mail"
                filterField="email"
                style={{ minWidth: '16rem' }}
                body={emailBodyTemplate}
                filter
                filterPlaceholder="Buscar por e-mail..."
              />
              <Column
                field="role"
                header="Role"
                className="p-column-filter"
                showFilterMenu={true}
                filterMenuStyle={{ width: '14rem' }}
                style={{ minWidth: '12rem' }}
                body={roleBodyTemplate}
              />
              <Column
                field="status"
                header="Status"
                className="p-column-filter"
                showFilterMenu={false}
                filterMenuStyle={{ width: '14rem' }}
                style={{ minWidth: '12rem' }}
                body={statusBodyTemplate}
              />
              <Column
                header="Ações"
                body={actionBodyTemplate}
                exportable={false}
                style={{ minWidth: '4rem' }}
              />
            </DataTable>
          </div>
        </div>
      </main>
    </>
  )
}

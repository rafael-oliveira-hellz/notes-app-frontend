import { faUser } from '@fortawesome/free-regular-svg-icons'
import {
  faAreaChart,
  faNoteSticky,
  faUsers
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { Charts } from '../../components/Charts'
import api from '../../utils/api'
import './Main.css'

export const Main = ({ user }: any) => {
  const [totalUsers, setTotalUsers] = useState<number>(0)
  const [userAvatar, setUserAvatar] = useState<string>()
  const [svgIcon, setSvgIcon] = useState<any>(faUser)

  let userName = ''
  const avatar = ''

  if (user) {
    if (typeof user !== 'undefined') {
      userName = user.name?.split(' ')[0]
    } else {
      userName = 'Visitante'
    }
  } else {
    userName = 'Visitante'
  }

  useEffect(() => {
    api
      .get('/users', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
        }
      })
      .then((response) => {
        setTotalUsers(response.data.totalDocuments)
      })
  }, [user])

  return (
    <main className="main__container">
      <div className="main__title">
        <img width="60" src="https://i.imgur.com/6VBx3io.png" alt="avatar" />
        <div className="main__greeting">
          <h1>Olá, {userName}!</h1>
          <p>Bem vindo ao seu painel!</p>
        </div>
      </div>

      <div className="main__cards">
        <div className="card">
          <FontAwesomeIcon icon={faUsers} className="text-lightblue" />
          <div className="card_inner">
            <p className="text-primary-p">Usuários Cadastrados</p>
            <span className="text-title font-bold">{totalUsers}</span>
          </div>
        </div>

        <div className="card">
          <FontAwesomeIcon icon={faUsers} className="text-lightblue" />
          <div className="card_inner">
            <p className="text-primary-p">Usuários Ativos</p>
            <span className="text-title font-bold">{totalUsers}</span>
          </div>
        </div>

        <div className="card">
          <FontAwesomeIcon icon={faUser} className="text-red" />
          <div className="card_inner">
            <p className="text-primary-p">Usuários Inativos</p>
            <span className="text-title font-bold">{totalUsers}</span>
          </div>
        </div>

        <div className="card">
          <FontAwesomeIcon icon={faNoteSticky} className="text-yellow" />
          <div className="card_inner">
            <p className="text-primary-p">Anotações Criadas</p>
            <span className="text-title font-bold">{totalUsers}</span>
          </div>
        </div>

        <div className="card">
          <FontAwesomeIcon icon={faNoteSticky} className="text-green" />
          <div className="card_inner">
            <p className="text-primary-p">Anotações (S/ Data)</p>
            <span className="text-title font-bold">{totalUsers}</span>
          </div>
        </div>

        <div className="card">
          <FontAwesomeIcon icon={faNoteSticky} className="text-purple" />
          <div className="card_inner">
            <p className="text-primary-p">Anotações (Pendentes)</p>
            <span className="text-title font-bold">{totalUsers}</span>
          </div>
        </div>

        <div className="card">
          <FontAwesomeIcon icon={faNoteSticky} className="text-cyan" />
          <div className="card_inner">
            <p className="text-primary-p">Anotações (Concluídas)</p>
            <span className="text-title font-bold">{totalUsers}</span>
          </div>
        </div>

        <div className="card">
          <FontAwesomeIcon icon={faNoteSticky} className="text-scarlet" />
          <div className="card_inner">
            <p className="text-primary-p">Anotações (Atrasadas)</p>
            <span className="text-title font-bold">{totalUsers}</span>
          </div>
        </div>
      </div>

      <div className="charts">
        <div className="charts__left">
          <div className="charts__left__title">
            <div>
              <h1>Daily Reports</h1>
              <p>São Bernardo do Campo, São Paulo, SP</p>
            </div>
            <FontAwesomeIcon icon={faNoteSticky} />
          </div>
          <div id="apex1"></div>
          <Charts />
        </div>

        <div className="charts__right">
          <div className="charts__right__title">
            <div>
              <h1>Daily Reports</h1>
              <p>São Bernardo do Campo, São Paulo, SP</p>
            </div>
            <FontAwesomeIcon icon={faAreaChart} />
          </div>
          <div id="apex1"></div>

          <div className="charts__right__cards">
            <div className="card0">
              <h1>Usuários Cadastrados</h1>
              <p>285</p>
            </div>

            <div className="card1">
              <h1>Usuários Ativos</h1>
              <p>285</p>
            </div>

            <div className="card2">
              <h1>Usuários Inativos</h1>
              <p>400</p>
            </div>

            <div className="card3">
              <h1>Anotações Criadas</h1>
              <p>3900</p>
            </div>

            <div className="card4">
              <h1>Anotações (S/ Data)</h1>
              <p>1881</p>
            </div>

            <div className="card5">
              <h1>Anotações (Pendentes)</h1>
              <p>1203</p>
            </div>

            <div className="card6">
              <h1>Anotações (Concluídas)</h1>
              <p>1099</p>
            </div>

            <div className="card7">
              <h1>Anotações (Atrasadas)</h1>
              <p>1099</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

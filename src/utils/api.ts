import axios from 'axios'

export default axios.create({
  baseURL: 'http://localhost:3333/api/v1'
})

//'https://notes-app-mvp.herokuapp.com/api/v1'

import axios from 'axios'


const instance = axios.create({
    baseURL: 'http://localhost:3000',
    // baseURL:'https://xazerly.biz.id'
  });

  export default instance
import axios from 'axios';

const BASE_URL = 'https://randomuser.me/api/';

const api = axios.create({
  baseURL: 'https://randomuser.me/api/?inc=picture,name,email,phone,location&'
})

const getNRandomUsers = (n) => {
  return api.get(`/&results=${n}`);
}

export { getNRandomUsers };
import axios from 'axios';

// const BASE_URL = 'https://randomuser.me/api/';
const BASE_URL = 'https://randomuser.me/api/?inc=picture,name,email,phone,location,gender,dob&';

const api = axios.create({
  baseURL: 'https://randomuser.me/api/?inc=picture,name,email,phone,location,gender,dob&'
})

const getNRandomUsers = (n, filterParams) => {
  let url = '';
  for (const [key, value] of Object.entries(filterParams)) {
    url += `&${key}=${value}`;
  }
  url = `&results=${n}${url}`;
  // console.log(BASE_URL + url);

  return api.get(url);
}

export { getNRandomUsers };
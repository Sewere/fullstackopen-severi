import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `${newToken}`;
}

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
}

const getById = (userId) => {
  const request = axios.get(`${baseUrl}/users/${userId}/blogs`);
  return request.then((response) => response.data);
}


const create = async (newObject) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  console.log("WOTT", baseUrl, newObject, config)
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
}

const destroy = (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.delete(`${baseUrl}/${id}`, config);
  return request.then((response) => response.data);
}

export default { getAll, create, update, destroy, setToken };

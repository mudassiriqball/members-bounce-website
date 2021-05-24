import axios from "axios"
import { getBearerToken } from "./authentication";

//pass new generated access token here
const token = getBearerToken();

const axiosApi = axios.create({})

axiosApi.defaults.headers.common["authorization"] = token;

axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)

export async function getRequest(url, config = {}) {
  return await axiosApi.get(url, { ...config }).then(response => response.data.data)
}

export async function postRequest(url, data, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then(response => response.data);
}

export async function putRequest(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function deleteRequest(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response.data)
}

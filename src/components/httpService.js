import axios from "axios";
// const baseURL = "http://localhost:2410";
// this component is build for configureing http services for CURD operations
const baseURL = "https://database-c772.onrender.com"; // database api
function get(url) {
  return axios.get(baseURL + url);
}

function post(url, obj) {
  return axios.post(baseURL + url, obj);
}

function put(url, obj) {
  return axios.put(baseURL + url, obj);
}

function deleteApi(url) {
  return axios.delete(baseURL + url);
}

export default {
  get,
  post,
  put,
  deleteApi,
};

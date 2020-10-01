import axios from "axios";
const baseUrl = "http://localhost:5000";

export function apiGetUsers() {
  return axios.get(`${baseUrl}/users`);
}

export function apiGetUser(id) {
  return axios.get(`${baseUrl}/users/${id}`);
}

export function apiPostUser(data) {
  return axios.post(`${baseUrl}/users/`, data);
}

export function apiUpdateUser(id, data) {
  return axios.put(`${baseUrl}/users/${id}`, data);
}

export function apiDeleteUser(id) {
  return axios.delete(`${baseUrl}/users/${id}`);
}

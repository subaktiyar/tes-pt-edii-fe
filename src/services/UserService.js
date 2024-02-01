import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.REACT_APP_API;

const readAll = async (query) => {
	return axios
		.get(`${API_URL}user`, {
			headers: await authHeader(),
			params: query,
		})
		.then((response) => {
			return Promise.resolve(response.data, response.data.message);
		})
		.catch((error) => {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();
			return Promise.reject(message);
		});
};

const readByID = async (id, query) => {
	return axios
		.get(`${API_URL}user/${id}`, {
			headers: await authHeader(),
			params: query,
		})
		.then((response) => {
			return Promise.resolve(response.data, response.data.message);
		})
		.catch((error) => {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();
			return Promise.reject(message);
		});
};

const updateByID = async (id, payload) => {
	return axios
		.put(`${API_URL}user/${id}`, payload, {
			headers: await authHeader(),
		})
		.then((response) => {
			return Promise.resolve(response.data, response.data.message);
		})
		.catch((error) => {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();
			return Promise.reject(message);
		});
};

const deleteByID = async (id, payload) => {
	return axios
		.delete(`${API_URL}user/${id}`, {
			headers: await authHeader(),
			data: payload,
		})
		.then((response) => {
			return Promise.resolve(response.data, response.data.message);
		})
		.catch((error) => {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();
			return Promise.reject(message);
		});
};

export default { readAll, readByID, updateByID, deleteByID };

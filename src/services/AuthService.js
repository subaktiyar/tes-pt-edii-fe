import axios from 'axios';
import authHeader from './auth-header';
import history from '../helpers/history';

const API_URL = process.env.REACT_APP_API;

const login = async (payload) => {
	return axios
		.post(`${API_URL}auth/login`, payload, { headers: await authHeader() })
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

const register = async (payload) => {
	return axios
		.post(`${API_URL}auth/register`, payload, { headers: await authHeader() })
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

const logout = () => {
	localStorage.clear();
	history.push('/login');
	return window.location.reload();
};

const generateToken = async (payload) => {
	return axios
		.post(`${API_URL}auth/app-token`, payload, { headers: await authHeader() })
		.then((response) => {
			localStorage.setItem('appToken', JSON.stringify(response.data));
			return Promise.resolve(response.data);
		});
};

const getMenuByRole = async (role) => {
	return axios
		.get(`${API_URL}/authorization/${role}`, { headers: await authHeader() })
		.then((response) => {
			localStorage.setItem('menu', JSON.stringify(response.data));
			return Promise.resolve(response.data);
		});
};

export default { login, register, logout, generateToken, getMenuByRole };

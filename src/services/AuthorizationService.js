import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.REACT_APP_API;

const getMenuByRole = async (role) => {
	return axios
		.get(`${API_URL}authorization/${role}`, { headers: await authHeader() })
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

export default { getMenuByRole };

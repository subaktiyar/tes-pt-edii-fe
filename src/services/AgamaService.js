import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.REACT_APP_API;

const read = async (query) => {
	return axios
		.get(`${API_URL}agama`, { headers: await authHeader(), params: query })
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

export default { read };

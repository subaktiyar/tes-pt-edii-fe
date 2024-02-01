const authHeader = async () => {
	const appToken = JSON.parse(localStorage.getItem('appToken'));
	const accessToken = JSON.parse(localStorage.getItem('accessToken'));

	if (!appToken) {
		return {
			'x-app-name': process.env.REACT_APP_NAME,
			'x-public-key': process.env.REACT_APP_PUBLIC_KEY,
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		};
	}

	if (!accessToken) {
		return {
			'x-public-key': process.env.REACT_APP_PUBLIC_KEY,
			'x-application-token': `Bearer ${appToken.appToken}`,
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		};
	}

	return {
		'x-public-key': process.env.REACT_APP_PUBLIC_KEY,
		'x-application-token': `Bearer ${appToken.appToken}`,
		'x-user-token': `Bearer ${accessToken.accessToken}`,
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
	};
};

export default authHeader;

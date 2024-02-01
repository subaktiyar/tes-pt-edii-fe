import React, { lazy } from 'react';
import { defaultMenu } from '../menu';

const PAGE = {
	Login: lazy(() => import('../views/Login')),
	Home: lazy(() => import('../views/Home')),
	Biodata: lazy(() => import('../views/Biodata')),
	DataUser: lazy(() => import('../views/DataUser')),
};

const contents = [
	{
		path: '/login',
		element: <PAGE.Login />,
		exact: true,
		index: 'Login',
	},

	{
		path: defaultMenu.home.path,
		element: <PAGE.Home />,
		exact: true,
		index: 'Home',
	},
	{
		path: defaultMenu.biodata.path,
		element: <PAGE.Biodata />,
		exact: true,
		index: 'Biodata',
	},
	{
		path: defaultMenu.dataUser.path,
		element: <PAGE.DataUser />,
		exact: true,
		index: 'DataUser',
	},
];

export default contents;

import React from 'react';
import { defaultMenu } from '../menu';
import DefaultHeader from '../pages/common/Headers/DefaultHeader';
import CustomHeader from '../pages/common/Headers/CustomHeader';

const headers = [
	{ path: defaultMenu.home.path, element: <CustomHeader />, exact: true },
	{ path: defaultMenu.biodata.path, element: <CustomHeader />, exact: true },
	{ path: defaultMenu.dataUser.path, element: <CustomHeader />, exact: true },
	{ path: '/login', element: null, exact: true },
	{ path: `*`, element: <DefaultHeader /> },
];

export default headers;

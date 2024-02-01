import React from 'react';
import Footer from '../layout/Footer/Footer';

const footers = [
	{ path: '/login', element: null, exact: true },
	{ path: '*', element: <Footer /> },
];

export default footers;

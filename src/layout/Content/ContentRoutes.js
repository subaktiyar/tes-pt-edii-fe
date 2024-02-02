import React, { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import contents from '../../routes/customRoutes';
import { decodeToken, getItemsStorage, getRouting } from '../../helpers/helpers';

const PAGE_404 = lazy(() => import('../../pages/presentation/auth/Page404'));
const Login = lazy(() => import('../../views/Login'));

const token = getItemsStorage('accessToken');
const menu = getItemsStorage('menu');

const menuDraft = getRouting(menu);
const menuComponents = menuDraft.map((item) => {
	const findComp = contents.find((f) => f.index === item?.element);
	return { element: findComp?.element || PAGE_404, path: item.path };
});

const menuContents = menuComponents.map((item) => {
	return {
		element: item?.element || null,
		path: item?.path || null,
		key: `${item?.path}press`,
	};
});

const ContentRoutes = () => {
	const decode = decodeToken(token?.accessToken);

	return (
		<Routes>
			{/* static route */}
			<Route exact path='/login' element={<Login />} />

			{/* dynamic route from authorization menu */}
			{['user'].includes(decode?.type) &&
				menuContents.map((page) => (
					// eslint-disable-next-line react/jsx-props-no-spreading
					<Route key={page.path} {...page} />
				))}

			{/* handle blank route */}
			<Route
				exact
				path='/'
				element={
					['user'].includes(decode?.type) ? (
						<Navigate to='/home' replace />
					) : (
						<Navigate to='/login' replace />
					)
				}
			/>

			<Route path='*' element={<PAGE_404 />} />
		</Routes>
	);
};

export default ContentRoutes;

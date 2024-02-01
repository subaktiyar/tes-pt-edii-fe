import React, { useContext, useEffect, useLayoutEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import { ThemeProvider } from 'react-jss';
import { ReactNotifications } from 'react-notifications-component';
import { useEffectOnce, useFullscreen } from 'react-use';
import { Route, Routes } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import { TourProvider } from '@reactour/tour';
import ThemeContext from '../contexts/themeContext';

import Aside from '../layout/Aside/Aside';
import Wrapper from '../layout/Wrapper/Wrapper';
import Portal from '../layout/Portal/Portal';
import { demoPages, layoutMenu } from '../menu';
import { Toast, ToastContainer } from '../components/bootstrap/Toasts';
import useDarkMode from '../hooks/useDarkMode';
import COLORS from '../common/data/enumColors';
import { getOS } from '../helpers/helpers';
import steps, { styles } from '../steps';
import showNotification from '../components/extras/showNotification';
import AuthService from '../services/AuthService';

const appToken = localStorage.getItem('appToken') || null;

const App = () => {
	getOS();

	/**
	 * Dark Mode
	 */
	const { themeStatus, darkModeStatus } = useDarkMode();
	const theme = {
		theme: themeStatus,
		primary: COLORS.PRIMARY.code,
		secondary: COLORS.SECONDARY.code,
		success: COLORS.SUCCESS.code,
		info: COLORS.INFO.code,
		warning: COLORS.WARNING.code,
		danger: COLORS.DANGER.code,
		dark: COLORS.DARK.code,
		light: COLORS.LIGHT.code,
	};

	useEffectOnce(() => {
		const isLogin = async () => {
			try {
				if (!appToken) {
					AuthService.generateToken()
						.then(() => {
							window.location.reload();
						})
						.catch(() => {
							showNotification('Warning!', 'Invalid Token', 'danger');
						});

					return;
				}
			} catch (err) {
				Swal.fire({
					heightAuto: false,
					title: 'Warning!',
					text: err,
					icon: 'info',
				});
			}
		};
		isLogin();
	});

	useEffect(() => {
		if (darkModeStatus) {
			document.documentElement.setAttribute('theme', 'dark');
		}
		return () => {
			document.documentElement.removeAttribute('theme');
		};
	}, [darkModeStatus]);

	/**
	 * Full Screen
	 */
	const { fullScreenStatus, setFullScreenStatus } = useContext(ThemeContext);
	const ref = useRef(null);
	useFullscreen(ref, fullScreenStatus, {
		onClose: () => setFullScreenStatus(false),
	});

	/**
	 * Modern Design
	 */
	useLayoutEffect(() => {
		if (process.env.REACT_APP_MODERN_DESGIN === 'true') {
			document.body.classList.add('modern-design');
		} else {
			document.body.classList.remove('modern-design');
		}
	});

	//	Add paths to the array that you don't want to be "Aside".
	const withOutAsidePages = [
		demoPages.login.path,
		demoPages.signUp.path,
		layoutMenu.blank.path,
		'/login',
	];

	return (
		<ThemeProvider theme={theme}>
			<ToastProvider components={{ ToastContainer, Toast }}>
				<TourProvider
					steps={steps}
					styles={styles}
					showNavigation={false}
					showBadge={false}>
					<div
						ref={ref}
						className='app'
						style={{
							backgroundColor: fullScreenStatus && 'var(--bs-body-bg)',
							zIndex: fullScreenStatus && 1,
							overflow: fullScreenStatus && 'scroll',
						}}>
						<Routes>
							{withOutAsidePages.map((path) => (
								<Route key={path} path={path} />
							))}
							<Route path='*' element={<Aside />} />
						</Routes>
						<Wrapper />
					</div>
					<Portal id='portal-notification'>
						<ReactNotifications />
					</Portal>
				</TourProvider>
			</ToastProvider>
		</ThemeProvider>
	);
};

export default App;

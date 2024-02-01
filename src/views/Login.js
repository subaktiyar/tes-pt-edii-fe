import React, { useState } from 'react';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { jwtDecode } from 'jwt-decode';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useDarkMode from '../hooks/useDarkMode';
import PageWrapper from '../layout/PageWrapper/PageWrapper';
import Page from '../layout/Page/Page';
import Card, { CardBody } from '../components/bootstrap/Card';
import Logo from '../components/Logo';
import Button from '../components/bootstrap/Button';
import FormGroup from '../components/bootstrap/forms/FormGroup';
import Input from '../components/bootstrap/forms/Input';
import AuthService from '../services/AuthService';
import AuthorizationService from '../services/AuthorizationService';

// eslint-disable-next-line react/prop-types
const LoginHeader = ({ isNewUser }) => {
	if (isNewUser) {
		return (
			<>
				<div className='text-center h1 fw-bold mt-5'>Create Account,</div>
				<div className='text-center h4 text-muted mb-5'>Sign up to get started!</div>
			</>
		);
	}
	return (
		<>
			<div className='text-center h1 fw-bold mt-5'>Welcome,</div>
			<div className='text-center h4 text-muted mb-5'>Sign in to continue!</div>
		</>
	);
};

const Login = ({ isSignUp }) => {
	const { darkModeStatus } = useDarkMode();

	const [isNewUser, setIsNewUser] = useState(isSignUp);

	const formikLogin = useFormik({
		initialValues: { email: '', password: '' },
		validationSchema: Yup.object({
			email: Yup.string().email().required('Required'),
			password: Yup.string().required('Required'),
		}),
		onSubmit: (values) => {
			try {
				AuthService.login({
					email: values.email,
					password: values.password,
				})
					.then(async (res) => {
						const token = jwtDecode(res?.accessToken);
						await AuthorizationService.getMenuByRole(token?.role)
							.then((menu) => {
								localStorage.setItem('menu', JSON.stringify(menu));
								localStorage.setItem('accessToken', JSON.stringify(res));
								window.location.href = '/';
							})
							.catch((err) => {
								Swal.fire({
									heightAuto: false,
									title: 'Warning!',
									text: err,
									icon: 'info',
								});
							})
							.finally(() => {});
					})
					.catch(() => {})
					.finally(() => {});
			} catch (err) {
				Swal.fire({
					heightAuto: false,
					title: 'Warning!',
					text: err,
					icon: 'info',
				});
			}
		},
	});

	const formikSignUp = useFormik({
		initialValues: { email: '', password: '' },
		validationSchema: Yup.object({
			email: Yup.string().email().required('Required'),
			password: Yup.string().required('Required'),
		}),
		onSubmit: (values, { resetForm }) => {
			try {
				AuthService.register({
					email: values.email,
					password: values.password,
				})
					.then(() => {
						Swal.fire({
							heightAuto: false,
							title: 'Information!',
							text: 'Register successfull',
							icon: 'info',
						});
					})
					.catch(() => {})
					.finally(() => {
						resetForm();
						formikLogin.resetForm();
						setIsNewUser(!isNewUser);
					});
			} catch (err) {
				//
			}
		},
	});

	// const navigate = useNavigate();
	// const handleOnClick = useCallback(() => navigate('/'), [navigate]);

	const loginComponent = (
		<div tag='form' noValidate onSubmit={formikLogin.handleSubmit}>
			<div className='col-12 my-2'>
				<FormGroup id='email' isFloating label='Your email'>
					<Input
						autoComplete='off'
						onChange={formikLogin.handleChange}
						onBlur={formikLogin.handleBlur}
						value={formikLogin.values.email}
						isValid={formikLogin.isValid}
						isTouched={formikLogin.touched.email}
						invalidFeedback={formikLogin.errors.email}
					/>
				</FormGroup>
			</div>
			<div className='col-12 my-2'>
				<FormGroup id='password' isFloating label='Password'>
					<Input
						type='password'
						autoComplete='off'
						onChange={formikLogin.handleChange}
						onBlur={formikLogin.handleBlur}
						value={formikLogin.values.password}
						isValid={formikLogin.isValid}
						isTouched={formikLogin.touched.password}
						invalidFeedback={formikLogin.errors.password}
					/>
				</FormGroup>
			</div>
			<div className='col-12 my-2'>
				<Button
					color='warning'
					className='w-100 py-3'
					type='submit'
					onClick={formikLogin.handleSubmit}>
					Login
				</Button>
			</div>
		</div>
	);

	const signupComponent = (
		<div tag='form' noValidate onSubmit={formikSignUp.handleSubmit}>
			<div className='col-12 my-2'>
				<FormGroup id='email' isFloating label='Your email'>
					<Input
						type='email'
						autoComplete='off'
						onChange={formikSignUp.handleChange}
						onBlur={formikSignUp.handleBlur}
						value={formikSignUp.values.email}
						isValid={formikSignUp.isValid}
						isTouched={formikSignUp.touched.email}
						invalidFeedback={formikSignUp.errors.email}
					/>
				</FormGroup>
			</div>
			<div className='col-12 my-2'>
				<FormGroup id='password' isFloating label='Password'>
					<Input
						type='password'
						autoComplete='off'
						onChange={formikSignUp.handleChange}
						onBlur={formikSignUp.handleBlur}
						value={formikSignUp.values.password}
						isValid={formikSignUp.isValid}
						isTouched={formikSignUp.touched.password}
						invalidFeedback={formikSignUp.errors.password}
					/>
				</FormGroup>
			</div>
			<div className='col-12 my-2'>
				<Button
					color='info'
					className='w-100 py-3'
					type='submit'
					onClick={formikSignUp.handleSubmit}>
					Sign Up
				</Button>
			</div>
		</div>
	);

	return (
		<PageWrapper
			title={isNewUser ? 'Sign Up' : 'Login'}
			className={classNames({ 'bg-warning': !isNewUser, 'bg-info': !!isNewUser })}>
			<Page className='p-0'>
				<div className='row h-100 align-items-center justify-content-center'>
					<div className='col-xl-4 col-lg-6 col-md-8 shadow-3d-container'>
						<Card className='shadow-3d-dark' data-tour='login-page'>
							<CardBody>
								<div className='text-center my-5'>
									<Link
										to='/'
										className={classNames(
											'text-decoration-none  fw-bold display-2',
											{
												'text-dark': !darkModeStatus,
												'text-light': darkModeStatus,
											},
										)}>
										<Logo width={200} />
									</Link>
								</div>

								<div
									className={classNames('rounded-3', {
										'bg-l10-dark': !darkModeStatus,
										'bg-lo10-dark': darkModeStatus,
									})}>
									<div className='row row-cols-2 g-3 pb-3 px-3 mt-0'>
										<div className='col'>
											<Button
												color={darkModeStatus ? 'light' : 'dark'}
												isLight={!!isNewUser}
												className='rounded-1 w-100'
												size='lg'
												onClick={() => setIsNewUser(!isNewUser)}>
												Login
											</Button>
										</div>
										<div className='col'>
											<Button
												color={darkModeStatus ? 'light' : 'dark'}
												isLight={!isNewUser}
												className='rounded-1 w-100'
												size='lg'
												onClick={() => setIsNewUser(!isNewUser)}>
												Sign Up
											</Button>
										</div>
									</div>
								</div>

								<LoginHeader isNewUser={isNewUser} />

								{isNewUser ? signupComponent : loginComponent}
							</CardBody>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};
Login.propTypes = {
	isSignUp: PropTypes.bool,
};
Login.defaultProps = {
	isSignUp: false,
};

export default Login;

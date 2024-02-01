import React, { useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import { defaultMenu } from '../menu';
import PageWrapper from '../layout/PageWrapper/PageWrapper';
import Page from '../layout/Page/Page';
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '../components/bootstrap/Card';
import FormGroup from '../components/bootstrap/forms/FormGroup';
import Input from '../components/bootstrap/forms/Input';
import Select from '../components/bootstrap/forms/Select';
import Textarea from '../components/bootstrap/forms/Textarea';
import PendidikanForm from '../components/Biodata/PendidikanForm';
import PelatihanForm from '../components/Biodata/PelatihanForm';
import PekerjaanForm from '../components/Biodata/PekerjaanForm';
import UserService from '../services/UserService';
import AgamaService from '../services/AgamaService';
import GolonganDarahService from '../services/GolonganDarahService';
import JenisKelaminService from '../services/JenisKelaminService';
import PosisiService from '../services/PosisiService';
import Button from '../components/bootstrap/Button';
import { getUser } from '../helpers/helpers';
import TingkatPendidikanService from '../services/TingkatPendidikanService';

const handleUpdateById = (id, values) => {
	const newResponse = new Promise((resolve, reject) => {
		try {
			UserService.updateByID(id, values)
				.then((res) => {
					Swal.fire({
						heightAuto: false,
						title: 'Information!',
						text: res?.message ?? 'Data has been updated successfully',
						icon: 'success',
					});
					resolve({ error: false, message: 'successfully' });
				})
				.catch((err) => {
					Swal.fire({ heightAuto: false, title: 'Warning!', text: err, icon: 'error' });
					reject(new Error(err));
				});
		} catch (e) {
			reject(new Error(e.message));
		}
	});
	return newResponse;
};

export const FormBiodata = ({
	initialValues,
	listAgama,
	listGolonganDarah,
	listJenisKelamin,
	listPosisi,
	listTingkatPendidikan,
	onSubmit,
	loading,
}) => {
	const formik = useFormik({
		initialValues: { ...initialValues },
		validationSchema: Yup.object({
			nama: Yup.string().required('Required'),
			no_ktp: Yup.string().required('Required'),
			tempat_lahir: Yup.string().required('Required'),
			tanggal_lahir: Yup.string().required('Required'),
			jenis_kelamin: Yup.string().required('Required'),
			agama: Yup.string().required('Required'),
			golongan_darah: Yup.string().required('Required'),
			status: Yup.string().required('Required'),
			alamat_ktp: Yup.string().required('Required'),
			alamat_tinggal: Yup.string().required('Required'),
			no_telepon: Yup.string().required('Required'),
			posisi: Yup.string().required('Required'),
			//
			kontak_nama: Yup.string().required('Required'),
			kontak_alamat: Yup.string().required('Required'),
			kontak_no_telepon: Yup.string().required('Required'),
		}),
		onReset: () => {},
		onSubmit: (values, { setSubmitting, setErrors }) => {
			try {
				Swal.fire({
					heightAuto: false,
					title: 'Are you sure?',
					text: 'Please check your entries !',
					icon: 'question',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes',
					reverseButtons: true,
				}).then((result) => {
					if (result.isConfirmed) {
						const newValues = {};
						newValues.nama = values.nama;
						newValues.no_ktp = values.no_ktp;
						newValues.tempat_lahir = values.tempat_lahir;
						newValues.tanggal_lahir = values.tanggal_lahir;
						newValues.jenis_kelamin = values.jenis_kelamin;
						newValues.agama = values.agama;
						newValues.golongan_darah = values.golongan_darah;
						newValues.status = values.status;
						newValues.alamat_ktp = values.alamat_ktp;
						newValues.alamat_tinggal = values.alamat_tinggal;
						newValues.no_telepon = values.no_telepon;
						newValues.kontak_darurat = {
							nama: values.kontak_nama,
							alamat: values.kontak_alamat,
							no_telepon: values.kontak_no_telepon,
						};
						newValues.posisi = values.posisi;
						newValues.pendidikan = values.pendidikan;
						newValues.pelatihan = values.pelatihan;
						newValues.riwayat_pekerjaan = values.riwayat_pekerjaan;

						onSubmit(newValues);
					}
				});
			} catch (error) {
				setErrors({ submit: error.message });
				Swal.fire({
					heightAuto: false,
					title: 'Information!',
					text: 'Please check your entries again!',
					icon: 'error',
				});
			} finally {
				setSubmitting(false);
			}
		},
	});

	useEffect(() => {
		if (!loading) {
			formik.setValues(initialValues);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading]);

	const onChangePendidikan = useCallback(
		(e) => {
			formik.setFieldValue('pendidikan', e);
		},
		[formik],
	);

	const onChangePelatihan = useCallback(
		(e) => {
			formik.setFieldValue('pelatihan', e);
		},
		[formik],
	);
	const onChangePekerjaan = useCallback(
		(e) => {
			formik.setFieldValue('riwayat_pekerjaan', e);
		},
		[formik],
	);

	return (
		<div className='row' tag='form' noValidate onSubmit={formik.handleSubmit}>
			<div className='col-lg-4 col-sm-12'>
				<Card shadow='none' borderSize={1}>
					<CardHeader borderSize={1}>
						<CardLabel>
							<CardTitle>Profile</CardTitle>
						</CardLabel>
					</CardHeader>
					<CardBody>
						<div className='row'>
							<div className='col-lg-12 py-2'>
								<FormGroup id='nama' label='Nama'>
									<Input
										autoComplete='off'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.nama}
										isValid={formik.isValid}
										isTouched={formik.touched.nama}
										invalidFeedback={formik.errors.nama}
									/>
								</FormGroup>
							</div>
							<div className='col-lg-12 py-2'>
								<FormGroup id='no_ktp' label='No KTP'>
									<Input
										autoComplete='off'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.no_ktp}
										isValid={formik.isValid}
										isTouched={formik.touched.no_ktp}
										invalidFeedback={formik.errors.no_ktp}
									/>
								</FormGroup>
							</div>
							<div className='col-lg-6 col-sm-12 py-2'>
								<FormGroup id='tempat_lahir' label='Tempat Lahir'>
									<Input
										autoComplete='off'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.tempat_lahir}
										isValid={formik.isValid}
										isTouched={formik.touched.tempat_lahir}
										invalidFeedback={formik.errors.tempat_lahir}
									/>
								</FormGroup>
							</div>
							<div className='col-lg-6 col-sm-12 py-2'>
								<FormGroup id='tanggal_lahir' label='Tanggal Lahir'>
									<Input
										type='date'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.tanggal_lahir}
										isValid={formik.isValid}
										isTouched={formik.touched.tanggal_lahir}
										invalidFeedback={formik.errors.tanggal_lahir}
									/>
								</FormGroup>
							</div>
							<div className='col-lg-6 col-sm-12 py-2'>
								<FormGroup id='jenis_kelamin' label='Jenis Kelamin'>
									<Select
										list={listJenisKelamin}
										ariaLabel='Jenis Kelamin'
										placeholder='Choose...'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.jenis_kelamin}
										isValid={formik.isValid}
										isTouched={formik.touched.jenis_kelamin}
										invalidFeedback={formik.errors.jenis_kelamin}
									/>
								</FormGroup>
							</div>
							<div className='col-lg-6 col-sm-12 py-2'>
								<FormGroup id='status' label='Status'>
									<Input
										autoComplete='off'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.status}
										isValid={formik.isValid}
										isTouched={formik.touched.status}
										invalidFeedback={formik.errors.status}
									/>
								</FormGroup>
							</div>
							<div className='col-lg-6 col-sm-12 py-2'>
								<FormGroup id='agama' label='Agama'>
									<Select
										list={listAgama}
										ariaLabel='Agama'
										placeholder='Choose...'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.agama}
										isValid={formik.isValid}
										isTouched={formik.touched.agama}
										invalidFeedback={formik.errors.agama}
									/>
								</FormGroup>
							</div>
							<div className='col-lg-6 col-sm-12 py-2'>
								<FormGroup id='golongan_darah' label='Golongan Darah'>
									<Select
										list={listGolonganDarah}
										ariaLabel='Golongan Darah'
										placeholder='Choose...'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.golongan_darah}
										isValid={formik.isValid}
										isTouched={formik.touched.golongan_darah}
										invalidFeedback={formik.errors.golongan_darah}
									/>
								</FormGroup>
							</div>
							<div className='col-lg-12 py-2'>
								<FormGroup id='alamat_ktp' label='Alamat KTP'>
									<Textarea
										autoComplete='off'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.alamat_ktp}
										isValid={formik.isValid}
										isTouched={formik.touched.alamat_ktp}
										invalidFeedback={formik.errors.alamat_ktp}
									/>
								</FormGroup>
							</div>
							<div className='col-lg-12 py-2'>
								<FormGroup id='alamat_tinggal' label='Alamat Tinggal'>
									<Textarea
										autoComplete='off'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.alamat_tinggal}
										isValid={formik.isValid}
										isTouched={formik.touched.alamat_tinggal}
										invalidFeedback={formik.errors.alamat_tinggal}
									/>
								</FormGroup>
							</div>
							<div className='col-lg-12 py-2'>
								<FormGroup id='no_telepon' label='No Telepon'>
									<Input
										autoComplete='off'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.no_telepon}
										isValid={formik.isValid}
										isTouched={formik.touched.no_telepon}
										invalidFeedback={formik.errors.no_telepon}
									/>
								</FormGroup>
							</div>
							<div className='col-lg-12 py-2'>
								<FormGroup id='posisi' label='Posisi'>
									<Select
										list={listPosisi}
										ariaLabel='Posisi'
										placeholder='Choose...'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.posisi}
										isValid={formik.isValid}
										isTouched={formik.touched.posisi}
										invalidFeedback={formik.errors.posisi}
									/>
								</FormGroup>
							</div>
						</div>
					</CardBody>
				</Card>

				<Card shadow='none' borderSize={1}>
					<CardHeader borderSize={1}>
						<CardLabel>
							<CardTitle>Kontak Darurat</CardTitle>
						</CardLabel>
					</CardHeader>
					<CardBody>
						<div className='row'>
							<div className='col-lg-12 py-2'>
								<FormGroup id='kontak_nama' label='Nama'>
									<Input
										autoComplete='off'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.kontak_nama}
										isValid={formik.isValid}
										isTouched={formik.touched.kontak_nama}
										invalidFeedback={formik.errors.kontak_nama}
									/>
								</FormGroup>
							</div>
							<div className='col-lg-12 py-2'>
								<FormGroup id='kontak_alamat' label='Alamat'>
									<Textarea
										autoComplete='off'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.kontak_alamat}
										isValid={formik.isValid}
										isTouched={formik.touched.kontak_alamat}
										invalidFeedback={formik.errors.kontak_alamat}
									/>
								</FormGroup>
							</div>
							<div className='col-lg-12 py-2'>
								<FormGroup id='kontak_no_telepon' label='Kontak'>
									<Input
										autoComplete='off'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.kontak_no_telepon}
										isValid={formik.isValid}
										isTouched={formik.touched.kontak_no_telepon}
										invalidFeedback={formik.errors.kontak_no_telepon}
									/>
								</FormGroup>
							</div>
						</div>
					</CardBody>
				</Card>
			</div>
			<div className='col-lg-8 col-sm-12'>
				<PendidikanForm
					data={formik.values.pendidikan}
					listTingkatPendidikan={listTingkatPendidikan}
					onChange={onChangePendidikan}
				/>
				<PelatihanForm data={formik.values.pelatihan} onChange={onChangePelatihan} />
				<PekerjaanForm
					data={formik.values.riwayat_pekerjaan}
					onChange={onChangePekerjaan}
				/>
			</div>
			<div className='col-lg12'>
				<Button
					color='danger'
					type='reset'
					onClick={formik.handleReset}
					isLink
					className='m-1'>
					Clear
				</Button>
				<Button
					icon='Save'
					color='info'
					type='submit'
					onClick={formik.handleSubmit}
					className='m-1 float-end'>
					Save
				</Button>
			</div>
		</div>
	);
};

FormBiodata.propTypes = {
	initialValues: PropTypes.oneOfType([PropTypes.object]),
	listAgama: PropTypes.oneOfType([PropTypes.array]),
	listGolonganDarah: PropTypes.oneOfType([PropTypes.array]),
	listJenisKelamin: PropTypes.oneOfType([PropTypes.array]),
	listPosisi: PropTypes.oneOfType([PropTypes.array]),
	listTingkatPendidikan: PropTypes.oneOfType([PropTypes.array]),
	onSubmit: PropTypes.func,
	loading: PropTypes.bool,
};
FormBiodata.defaultProps = {
	initialValues: null,
	listAgama: [],
	listGolonganDarah: [],
	listJenisKelamin: [],
	listPosisi: [],
	listTingkatPendidikan: [],
	onSubmit: () => {},
	loading: true,
};

const Biodata = () => {
	const { _id } = getUser();

	const _init = {
		nama: '',
		no_ktp: '',
		tempat_lahir: '',
		tanggal_lahir: '',
		jenis_kelamin: '',
		agama: '',
		golongan_darah: '',
		status: '',
		alamat_ktp: '',
		alamat_tinggal: '',
		no_telepon: '',
		posisi: '',
		//
		kontak_nama: '',
		kontak_alamat: '',
		kontak_no_telepon: '',
		//
		pelatihan: [],
		pendidikan: [],
		riwayat_pekerjaan: [],
	};

	const [init, setInit] = useState(_init);
	const [listAgama, setListAgama] = useState([]);
	const [listGolonganDarah, setListGolonganDarah] = useState([]);
	const [listJenisKelamin, setListJenisKelamin] = useState([]);
	const [listPosisi, setLisPosisi] = useState([]);
	const [listTingkatPendidikan, setLisTingkatPendidikan] = useState([]);

	const [reload, setReload] = useState(true);

	const onHandleSubmit = (values) => {
		handleUpdateById(_id, values)
			.then(() => {
				setReload(true);
			})
			.catch(() => {})
			.finally(() => {});
	};

	useEffect(() => {
		const fetch = async () => {
			try {
				await fetchDataAgama();
				await fetchDataGolonganDarah();
				await fetchDataJenisKelamin();
				await fetchDataPosisi();
				await fetchDataTingkatPendidikan();
				await fetchData();

				setReload(false);
			} catch (err) {
				//
			}
		};

		if (reload) fetch();

		return () => {
			//
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reload]);

	const fetchData = async () => {
		const query = {};
		return UserService.readByID(_id, query)
			.then((res) => {
				const newValues = {
					nama: res.nama,
					no_ktp: res.no_ktp,
					tempat_lahir: res.tempat_lahir,
					tanggal_lahir: res.tanggal_lahir,
					jenis_kelamin: res.jenis_kelamin,
					agama: res.agama,
					golongan_darah: res.golongan_darah,
					status: res.status,
					alamat_ktp: res.alamat_ktp,
					alamat_tinggal: res.alamat_tinggal,
					no_telepon: res.no_telepon,
					posisi: res.posisi,

					kontak_nama: res.kontak_darurat?.nama,
					kontak_alamat: res.kontak_darurat?.alamat,
					kontak_no_telepon: res.kontak_darurat?.no_telepon,

					pendidikan: res.pendidikan,
					pelatihan: res.pelatihan,
					riwayat_pekerjaan: res.riwayat_pekerjaan,
				};
				setInit(newValues);
			})
			.catch(() => {
				setInit(_init);
			})
			.finally(() => {});
	};

	const fetchDataAgama = async () => {
		const query = {};
		return AgamaService.read(query)
			.then((res) => {
				const list = [...res.foundData].map((e) => ({ value: e?.agama, text: e?.agama }));
				setListAgama(list);
			})
			.catch(() => {
				setListAgama([]);
			})
			.finally(() => {});
	};

	const fetchDataGolonganDarah = async () => {
		const query = {};
		return GolonganDarahService.read(query)
			.then((res) => {
				const list = [...res.foundData].map((e) => ({
					value: e?.golongan_darah,
					text: e?.golongan_darah,
				}));
				setListGolonganDarah(list);
			})
			.catch(() => {
				setListGolonganDarah([]);
			})
			.finally(() => {});
	};

	const fetchDataJenisKelamin = async () => {
		const query = {};
		return JenisKelaminService.read(query)
			.then((res) => {
				const list = [...res.foundData].map((e) => ({
					value: e?.jenis_kelamin,
					text: e?.jenis_kelamin,
				}));
				setListJenisKelamin(list);
			})
			.catch(() => {
				setListJenisKelamin([]);
			})
			.finally(() => {});
	};

	const fetchDataPosisi = async () => {
		const query = {};
		return PosisiService.read(query)
			.then((res) => {
				const list = [...res.foundData].map((e) => ({
					value: e?.posisi,
					text: e?.posisi,
				}));
				setLisPosisi(list);
			})
			.catch(() => {
				setLisPosisi([]);
			})
			.finally(() => {});
	};

	const fetchDataTingkatPendidikan = async () => {
		const query = {};
		return TingkatPendidikanService.read(query)
			.then((res) => {
				const list = [...res.foundData].map((e) => ({
					value: e?.tingkat_pendidikan,
					text: e?.tingkat_pendidikan,
				}));
				setLisTingkatPendidikan(list);
			})
			.catch(() => {
				setLisTingkatPendidikan([]);
			})
			.finally(() => {});
	};

	return (
		<PageWrapper title={defaultMenu.biodata.text}>
			<Page container='fluid'>
				<Card shadow='sm' stretch>
					<CardHeader borderSize={1} size='sm'>
						<CardLabel>
							<CardTitle>{defaultMenu.biodata.text}</CardTitle>
						</CardLabel>
					</CardHeader>
					<CardBody>
						<FormBiodata
							initialValues={init}
							listAgama={listAgama}
							listGolonganDarah={listGolonganDarah}
							listJenisKelamin={listJenisKelamin}
							listPosisi={listPosisi}
							listTingkatPendidikan={listTingkatPendidikan}
							onSubmit={onHandleSubmit}
							loading={reload}
						/>
					</CardBody>
				</Card>
			</Page>
		</PageWrapper>
	);
};

Biodata.propTypes = {};
Biodata.defaultProps = {};

export default Biodata;

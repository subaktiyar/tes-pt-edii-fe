import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import { defaultMenu } from '../menu';
import PageWrapper from '../layout/PageWrapper/PageWrapper';
import Page from '../layout/Page/Page';
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '../components/bootstrap/Card';
import useDarkMode from '../hooks/useDarkMode';
import DarkDataTable from '../components/DarkDataTable';
import FormGroup from '../components/bootstrap/forms/FormGroup';
import Input from '../components/bootstrap/forms/Input';
import Select from '../components/bootstrap/forms/Select';
import Button from '../components/bootstrap/Button';
import Modal, { ModalBody, ModalHeader, ModalTitle } from '../components/bootstrap/Modal';
import UserService from '../services/UserService';
import TingkatPendidikanService from '../services/TingkatPendidikanService';
import PosisiService from '../services/PosisiService';
import { FormBiodata } from './Biodata';
import AgamaService from '../services/AgamaService';
import GolonganDarahService from '../services/GolonganDarahService';
import JenisKelaminService from '../services/JenisKelaminService';

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

const handleDeleteById = (id) => {
	// eslint-disable-next-line no-async-promise-executor
	const newResponse = new Promise(async (resolve, reject) => {
		try {
			Swal.fire({
				heightAuto: false,
				title: 'Are you sure?',
				text: "You won't be able to revert this!",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, delete it!',
				reverseButtons: true,
			}).then((result) => {
				if (result.isConfirmed) {
					UserService.deleteByID(id, {})
						.then((res) => {
							Swal.fire({
								heightAuto: false,
								title: 'Information!',
								text: res?.message ?? 'Data has been deleted successfully',
								icon: 'success',
							});
							resolve({ error: false, message: 'successfully' });
						})
						.catch((err) => {
							Swal.fire({
								heightAuto: false,
								title: 'Warning!',
								text: err,
								icon: 'error',
							});
							reject(new Error(err));
						});
				} else if (result.dismiss === Swal.DismissReason.cancel) {
					Swal.fire({
						heightAuto: false,
						title: 'Cancelled!',
						text: 'Your data is safe :)',
						icon: 'error',
					});
					reject(new Error('Cancelled'));
				}
			});
		} catch (e) {
			reject(new Error({ error: true }));
		}
	});
	return newResponse;
};

const ButtonCustom = ({
	data,
	listAgama,
	listGolonganDarah,
	listJenisKelamin,
	listPosisi,
	listTingkatPendidikan,
	onUpdate,
	onRemove,
}) => {
	const { darkModeStatus } = useDarkMode();

	const [isOpen, setIsOpen] = useState(false);

	const initBiodata = {
		nama: data.nama,
		no_ktp: data.no_ktp,
		tempat_lahir: data.tempat_lahir,
		tanggal_lahir: data.tanggal_lahir,
		jenis_kelamin: data.jenis_kelamin,
		agama: data.agama,
		golongan_darah: data.golongan_darah,
		status: data.status,
		alamat_ktp: data.alamat_ktp,
		alamat_tinggal: data.alamat_tinggal,
		no_telepon: data.no_telepon,
		posisi: data.posisi,

		kontak_nama: data.kontak_darurat?.nama,
		kontak_alamat: data.kontak_darurat?.alamat,
		kontak_no_telepon: data.kontak_darurat?.no_telepon,

		pendidikan: data.pendidikan,
		pelatihan: data.pelatihan,
		riwayat_pekerjaan: data.riwayat_pekerjaan,
	};

	return (
		<div>
			<Button
				icon='Edit'
				color='info'
				type='button'
				onClick={() => setIsOpen(true)}
				isLight={darkModeStatus}
				className='mx-1'
			/>

			<Button
				icon='Delete'
				color='danger'
				type='button'
				onClick={() => onRemove()}
				isLight={darkModeStatus}
				className='mx-1'
			/>

			<Modal
				titleId='form-detail'
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				size='xl'
				isCentered
				isStaticBackdrop>
				<ModalHeader setIsOpen={setIsOpen}>
					<ModalTitle id='form-detail'>Biodata</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<FormBiodata
						initialValues={initBiodata}
						listAgama={listAgama}
						listGolonganDarah={listGolonganDarah}
						listJenisKelamin={listJenisKelamin}
						listPosisi={listPosisi}
						listTingkatPendidikan={listTingkatPendidikan}
						onSubmit={onUpdate}
					/>
				</ModalBody>
			</Modal>
		</div>
	);
};

ButtonCustom.propTypes = {
	data: PropTypes.oneOfType([PropTypes.object]),
	listAgama: PropTypes.oneOfType([PropTypes.array]),
	listGolonganDarah: PropTypes.oneOfType([PropTypes.array]),
	listJenisKelamin: PropTypes.oneOfType([PropTypes.array]),
	listPosisi: PropTypes.oneOfType([PropTypes.array]),
	listTingkatPendidikan: PropTypes.oneOfType([PropTypes.array]),
	onUpdate: PropTypes.func,
	onRemove: PropTypes.func,
};
ButtonCustom.defaultProps = {
	data: null,
	listAgama: [],
	listGolonganDarah: [],
	listJenisKelamin: [],
	listPosisi: [],
	listTingkatPendidikan: [],
	onUpdate: () => {},
	onRemove: () => {},
};

const TableCustom = ({
	data,
	listAgama,
	listGolonganDarah,
	listJenisKelamin,
	listPosisi,
	listTingkatPendidikan,
	options,
	onChange,
	onUpdate,
	onRemove,
}) => {
	const { darkModeStatus } = useDarkMode();

	const handlePageChange = (page) => {
		onChange({ ...options, curPage: page });
	};

	const handlePerRowsChange = async (newPerPage, page) => {
		const all = newPerPage === options.totalRows;
		onChange({ ...options, curPage: page, perPage: newPerPage, showAll: all });
	};

	const paginationComponentOptions = {
		selectAllRowsItem: true,
		selectAllRowsItemText: 'ALL',
	};

	const columns = useMemo(
		() => [
			{
				name: ['Nama'],
				selector: (row) => row?.nama,
				sortable: false,
			},
			{
				name: ['Tempat Lahir'],
				selector: (row) => row?.tempat_lahir,
				sortable: false,
			},
			{
				name: ['Tanggal Lahir'],
				selector: (row) => row?.tanggal_lahir,
				sortable: false,
			},
			{
				name: ['Posisi'],
				selector: (row) => row?.posisi,
				sortable: false,
			},
			{
				name: ['Action'],
				width: '180px',
				// eslint-disable-next-line react/no-unstable-nested-components
				cell: (row) => {
					return (
						<ButtonCustom
							data={row}
							listAgama={listAgama}
							listGolonganDarah={listGolonganDarah}
							listJenisKelamin={listJenisKelamin}
							listPosisi={listPosisi}
							listTingkatPendidikan={listTingkatPendidikan}
							onUpdate={(values) => onUpdate(row?._id, values, options)}
							onRemove={() => onRemove(row?._id)}
						/>
					);
				},
			},
		],
		[
			listAgama,
			listGolonganDarah,
			listJenisKelamin,
			listPosisi,
			listTingkatPendidikan,
			options,
			onUpdate,
			onRemove,
		],
	);

	return (
		<DarkDataTable
			columns={columns}
			data={data}
			pagination
			paginationServer
			progressPending={options.loading}
			paginationTotalRows={options.totalRows}
			paginationResetDefaultPage={options.isReset}
			onChangeRowsPerPage={handlePerRowsChange}
			onChangePage={handlePageChange}
			paginationComponentOptions={paginationComponentOptions}
			theme={darkModeStatus ? 'custom_dark' : 'light'}
		/>
	);
};

TableCustom.propTypes = {
	data: PropTypes.oneOfType([PropTypes.array]),
	listAgama: PropTypes.oneOfType([PropTypes.array]),
	listGolonganDarah: PropTypes.oneOfType([PropTypes.array]),
	listJenisKelamin: PropTypes.oneOfType([PropTypes.array]),
	listPosisi: PropTypes.oneOfType([PropTypes.array]),
	listTingkatPendidikan: PropTypes.oneOfType([PropTypes.array]),
	options: PropTypes.oneOfType([PropTypes.object]),
	onChange: PropTypes.func,
	onUpdate: PropTypes.func,
	onRemove: PropTypes.func,
};
TableCustom.defaultProps = {
	data: [],
	listAgama: [],
	listGolonganDarah: [],
	listJenisKelamin: [],
	listPosisi: [],
	listTingkatPendidikan: [],
	options: {
		totalRows: 0,
		perPage: 10,
		curPage: 1,
		showAll: false,
		loading: false,
		filter: {},
		reload: false,
		isReset: false,
	},
	onChange: () => {},
	onUpdate: () => {},
	onRemove: () => {},
};

const FilterCustom = ({ listPosisi, listTingkatPendidikan, options, onChange }) => {
	const { darkModeStatus } = useDarkMode();

	const formik = useFormik({
		initialValues: { nama: '', posisi: '', tingkat_pendidikan: '' },
		onReset: () => {
			onChange({ ...options, curPage: 1, filter: {}, isReset: true });
		},
		onSubmit: (values) => {
			const filter = {};
			if (values.nama) filter.nama = values.nama;
			if (values.posisi) filter.posisi = values.posisi;
			if (values.tingkat_pendidikan) filter.tingkat_pendidikan = values.tingkat_pendidikan;

			onChange({ ...options, curPage: 1, filter });
		},
	});

	return (
		<div className='row mb-3'>
			<div className='col-lg-3'>
				<FormGroup id='nama'>
					<Input
						autoComplete='off'
						placeholder='Nama'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.nama}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								formik.handleSubmit(e);
							}
						}}
					/>
				</FormGroup>
			</div>
			<div className='col-lg-3'>
				<FormGroup id='posisi'>
					<Select
						list={listPosisi}
						ariaLabel='Posisi'
						placeholder='Posisi'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.posisi}
					/>
				</FormGroup>
			</div>
			<div className='col-lg-3'>
				<FormGroup id='tingkat_pendidikan'>
					<Select
						list={listTingkatPendidikan}
						ariaLabel='Tingkat Pendidikan'
						placeholder='Tingkat Pendidikan'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.tingkat_pendidikan}
					/>
				</FormGroup>
			</div>
			<div className='col-lg-3'>
				<Button
					icon='FilterAlt'
					color='info'
					type='submit'
					isLight={darkModeStatus}
					onClick={formik.handleSubmit}
					className='mx-1'>
					Filter
				</Button>

				<Button
					icon='Restore'
					color='warning'
					type='reset'
					isLight={darkModeStatus}
					onClick={formik.resetForm}
					className='mx-1'>
					Reset
				</Button>
			</div>
		</div>
	);
};

FilterCustom.propTypes = {
	listPosisi: PropTypes.oneOfType([PropTypes.array]),
	listTingkatPendidikan: PropTypes.oneOfType([PropTypes.array]),
	options: PropTypes.oneOfType([PropTypes.object]),
	onChange: PropTypes.func,
};
FilterCustom.defaultProps = {
	listPosisi: [],
	listTingkatPendidikan: [],
	options: {
		totalRows: 0,
		perPage: 10,
		curPage: 1,
		showAll: false,
		loading: false,
		filter: {},
		reload: false,
		isReset: false,
	},
	onChange: () => {},
};

const DataUser = () => {
	const [data, setData] = useState([]);
	const [options, setOptions] = useState({
		totalRows: 0,
		perPage: 10,
		curPage: 1,
		showAll: false,
		loading: false,
		filter: {},
		reload: true,
		isReset: false,
	});

	const [listAgama, setListAgama] = useState([]);
	const [listGolonganDarah, setListGolonganDarah] = useState([]);
	const [listJenisKelamin, setListJenisKelamin] = useState([]);
	const [listPosisi, setLisPosisi] = useState([]);
	const [listTingkatPendidikan, setLisTingkatPendidikan] = useState([]);

	const onChangeTable = useCallback((e) => setOptions({ ...e, reload: true }), []);
	const onChangeFilter = useCallback((e) => setOptions({ ...e, reload: true }), []);

	const onHandleSubmit = (id, values, _options) => {
		handleUpdateById(id, values)
			.then(() => {
				setOptions({ ..._options, reload: true });
			})
			.catch(() => {})
			.finally(() => {});
	};

	const onHandleDelete = (id, _options) => {
		handleDeleteById(id)
			.then(() => {
				setOptions({ ..._options, reload: true });
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
			} catch (err) {
				//
			}
		};

		if (options.reload) fetch();

		return () => {
			//
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [options.reload]);

	const fetchData = async () => {
		setOptions((element) => ({ ...element, loading: true }));

		const query = {
			page: options.curPage,
			sizePerPage: options.perPage,
			showAll: options.showAll,
			...options.filter,
		};

		return UserService.readAll(query)
			.then((response) => {
				setData(response.foundData);
				setOptions((element) => ({
					...element,
					totalRows: response.countData,
					curPage: response?.currentPage,
				}));
			})
			.catch(() => {
				setData([]);
				setOptions((element) => ({ ...element, totalRows: 0, curPage: 1 }));
			})
			.finally(() => {
				setOptions((element) => ({
					...element,
					isReset: false,
					loading: false,
					reload: false,
				}));
			});
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
					<CardHeader size='sm' borderSize={1}>
						<CardLabel>
							<CardTitle>Data User</CardTitle>
						</CardLabel>
					</CardHeader>
					<CardBody>
						<FilterCustom
							listPosisi={listPosisi}
							listTingkatPendidikan={listTingkatPendidikan}
							options={options}
							onChange={onChangeFilter}
						/>

						<TableCustom
							data={data}
							listAgama={listAgama}
							listGolonganDarah={listGolonganDarah}
							listJenisKelamin={listJenisKelamin}
							listPosisi={listPosisi}
							listTingkatPendidikan={listTingkatPendidikan}
							options={options}
							onChange={onChangeTable}
							onUpdate={onHandleSubmit}
							onRemove={onHandleDelete}
						/>
					</CardBody>
				</Card>
			</Page>
		</PageWrapper>
	);
};

DataUser.propTypes = {};
DataUser.defaultProps = {};

export default DataUser;

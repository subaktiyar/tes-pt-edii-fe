import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Card, { CardActions, CardBody, CardHeader, CardLabel, CardTitle } from '../bootstrap/Card';
import Button from '../bootstrap/Button';
import DarkDataTable from '../DarkDataTable';
import Modal, { ModalBody, ModalHeader, ModalTitle } from '../bootstrap/Modal';
import useDarkMode from '../../hooks/useDarkMode';
import FormGroup from '../bootstrap/forms/FormGroup';
import Input from '../bootstrap/forms/Input';
import Select from '../bootstrap/forms/Select';

const FormCreate = ({
	initialValues,
	listTingkatPendidikan,
	isOpen,
	setIsOpen,
	size,
	title,
	onSubmit,
}) => {
	const formik = useFormik({
		initialValues: { ...initialValues },
		validationSchema: Yup.object({
			jenjang_pendidikan: Yup.string().required('Required'),
			institusi: Yup.string().required('Required'),
			jurusan: Yup.string().required('Required'),
			tahun_lulus: Yup.number().min(1901, 'Minumum 1901').required('Required'),
			ipk: Yup.number().min(0, 'Invalid number value').nullable(),
		}),
		onReset: () => {
			setIsOpen(false);
		},
		onSubmit: (values, { resetForm }) => {
			onSubmit(values);
			resetForm();
			setIsOpen(false);
		},
	});

	const renderComponent = (
		<div className='row px-2' tag='form' noValidate onSubmit={formik.handleSubmit}>
			<div className='col-lg-12 py-2'>
				<FormGroup id='jenjang_pendidikan' label='Jenjang Pendidikan'>
					<Select
						list={listTingkatPendidikan}
						ariaLabel='Jenjang Pendidikan'
						placeholder='Choose...'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.jenjang_pendidikan}
						isValid={formik.isValid}
						isTouched={formik.touched.jenjang_pendidikan}
						invalidFeedback={formik.errors.jenjang_pendidikan}
					/>
				</FormGroup>
			</div>
			<div className='col-lg-12 py-2'>
				<FormGroup id='institusi' label='Nama Institusi'>
					<Input
						autoComplete='off'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.institusi}
						isValid={formik.isValid}
						isTouched={formik.touched.institusi}
						invalidFeedback={formik.errors.institusi}
					/>
				</FormGroup>
			</div>
			<div className='col-lg-12 py-2'>
				<FormGroup id='jurusan' label='Jurusan'>
					<Input
						autoComplete='off'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.jurusan}
						isValid={formik.isValid}
						isTouched={formik.touched.jurusan}
						invalidFeedback={formik.errors.jurusan}
					/>
				</FormGroup>
			</div>
			<div className='col-lg-12 py-2'>
				<FormGroup id='tahun_lulus' label='Tahun Lulus'>
					<Input
						type='number'
						min={1901}
						autoComplete='off'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.tahun_lulus}
						isValid={formik.isValid}
						isTouched={formik.touched.tahun_lulus}
						invalidFeedback={formik.errors.tahun_lulus}
					/>
				</FormGroup>
			</div>
			<div className='col-lg-12 py-2'>
				<FormGroup id='ipk' label='IPK'>
					<Input
						type='number'
						min={0}
						autoComplete='off'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.ipk}
						isValid={formik.isValid}
						isTouched={formik.touched.ipk}
						invalidFeedback={formik.errors.ipk}
					/>
				</FormGroup>
			</div>
			<div className='col-lg-12 py-2'>
				<Button
					icon='Save'
					color='info'
					type='submit'
					onClick={formik.handleSubmit}
					className='mx-1 float-end'>
					Save
				</Button>

				<Button
					color='info'
					type='reset'
					isLink
					onClick={formik.resetForm}
					className='mx-1 float-end'>
					Close
				</Button>
			</div>
		</div>
	);

	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen} titleId='form-create' size={size}>
			<ModalHeader setIsOpen={setIsOpen}>
				<ModalTitle id='form-create'>{title}</ModalTitle>
			</ModalHeader>
			<ModalBody>{renderComponent}</ModalBody>
		</Modal>
	);
};

FormCreate.propTypes = {
	initialValues: PropTypes.oneOfType([PropTypes.object]),
	listTingkatPendidikan: PropTypes.oneOfType([PropTypes.array]),
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
	size: PropTypes.oneOf([null, 'sm', 'lg', 'xl']),
	title: PropTypes.string,
	onSubmit: PropTypes.func,
};
FormCreate.defaultProps = {
	initialValues: null,
	listTingkatPendidikan: [],
	size: null,
	title: 'Modal',
	onSubmit: () => {},
};

const ButtonCustom = ({ data, listTingkatPendidikan, onRemove, onUpdate }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div>
			<Button
				icon='Edit'
				color='info'
				type='button'
				className='m-1'
				onClick={() => setIsOpen(true)}
			/>

			<Button
				icon='Delete'
				color='danger'
				type='button'
				className='m-1'
				onClick={() => onRemove()}
			/>

			<FormCreate
				initialValues={data}
				listTingkatPendidikan={listTingkatPendidikan}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				title='Edit Pendidikan'
				isUpdate
				onSubmit={onUpdate}
			/>
		</div>
	);
};

ButtonCustom.propTypes = {
	data: PropTypes.oneOfType([PropTypes.object]),
	listTingkatPendidikan: PropTypes.oneOfType([PropTypes.array]),
	onRemove: PropTypes.func,
	onUpdate: PropTypes.func,
};
ButtonCustom.defaultProps = {
	data: null,
	listTingkatPendidikan: [],
	onRemove: () => {},
	onUpdate: () => {},
};

const TableCustom = ({ data, listTingkatPendidikan, onRemove, onUpdate }) => {
	const { darkModeStatus } = useDarkMode();

	const columns = useMemo(
		() => [
			{
				name: ['Jenjang Pendidikan Terakhir'],
				selector: (row) => row?.jenjang_pendidikan,
				sortable: true,
			},
			{
				name: ['Nama Institusi Akademik'],
				selector: (row) => row?.institusi,
				sortable: true,
			},
			{
				name: ['Jurusan'],
				selector: (row) => row?.jurusan,
				sortable: true,
			},
			{
				name: ['Tahun Lulus'],
				selector: (row) => row?.tahun_lulus,
				sortable: true,
			},
			{
				name: ['IPK'],
				selector: (row) => row?.ipk,
				sortable: true,
			},
			{
				name: ['Action'],
				width: '120px',
				// eslint-disable-next-line react/no-unstable-nested-components
				cell: (row, rowIndex) => {
					return (
						<ButtonCustom
							data={row}
							listTingkatPendidikan={listTingkatPendidikan}
							onRemove={() => onRemove(rowIndex)}
							onUpdate={(e) => onUpdate(e, rowIndex)}
						/>
					);
				},
			},
		],
		[listTingkatPendidikan, onRemove, onUpdate],
	);
	return (
		<DarkDataTable
			data={data}
			columns={columns}
			theme={darkModeStatus ? 'custom_dark' : 'default'}
		/>
	);
};

TableCustom.propTypes = {
	data: PropTypes.oneOfType([PropTypes.array]),
	listTingkatPendidikan: PropTypes.oneOfType([PropTypes.array]),
	onRemove: PropTypes.func,
	onUpdate: PropTypes.func,
};
TableCustom.defaultProps = {
	data: [],
	listTingkatPendidikan: [],
	onRemove: () => {},
	onUpdate: () => {},
};

const PendidikanForm = ({ data, listTingkatPendidikan, onChange }) => {
	const [isOpen, setIsOpen] = useState(false);

	const initialValues = {
		jenjang_pendidikan: '',
		institusi: '',
		jurusan: '',
		tahun_lulus: new Date().getFullYear(),
		ipk: 0,
	};

	const onHandleAdd = useCallback(
		(e) => {
			const newData = [...data];
			newData.push(e);
			onChange(newData);
		},
		[data, onChange],
	);
	const onHandleUpdate = useCallback(
		(e, index) => {
			const newData = [...data];
			newData[index] = e;
			onChange(newData);
		},
		[data, onChange],
	);
	const onHandleRemove = useCallback(
		(index) => {
			const newData = [...data];
			newData.splice(index, 1);
			onChange(newData);
		},
		[data, onChange],
	);

	return (
		<>
			<Card shadow='none' borderSize={1}>
				<CardHeader borderSize={1} size='sm'>
					<CardLabel>
						<CardTitle>Pendidikan</CardTitle>
					</CardLabel>
					<CardActions>
						<Button
							size='sm'
							icon='Add'
							color='info'
							type='button'
							onClick={() => setIsOpen(true)}>
							Add
						</Button>
					</CardActions>
				</CardHeader>
				<CardBody>
					<TableCustom
						data={data}
						listTingkatPendidikan={listTingkatPendidikan}
						onUpdate={onHandleUpdate}
						onRemove={onHandleRemove}
					/>
				</CardBody>
			</Card>

			<FormCreate
				initialValues={initialValues}
				listTingkatPendidikan={listTingkatPendidikan}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				title='Add Pendidikan'
				onSubmit={onHandleAdd}
			/>
		</>
	);
};

PendidikanForm.propTypes = {
	data: PropTypes.oneOfType([PropTypes.array]),
	listTingkatPendidikan: PropTypes.oneOfType([PropTypes.array]),
	onChange: PropTypes.func,
};
PendidikanForm.defaultProps = {
	data: [],
	listTingkatPendidikan: [],
	onChange: () => {},
};

export default PendidikanForm;

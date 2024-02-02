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

const FormCreate = ({ initialValues, isOpen, setIsOpen, size, title, onSubmit }) => {
	const formik = useFormik({
		initialValues: { ...initialValues },
		validationSchema: Yup.object({
			nama_perusahaan: Yup.string().required('Required'),
			posisi_terakhir: Yup.string().required('Required'),
			pendapatan_terakhir: Yup.number().required('Required'),
			tahun: Yup.number().min(1901, 'Minumum 1901').required('Required'),
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
				<FormGroup id='nama_perusahaan' label='Nama Perusahaan'>
					<Input
						autoComplete='off'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.nama_perusahaan}
						isValid={formik.isValid}
						isTouched={formik.touched.nama_perusahaan}
						invalidFeedback={formik.errors.nama_perusahaan}
					/>
				</FormGroup>
			</div>
			<div className='col-lg-12 py-2'>
				<FormGroup id='posisi_terakhir' label='Posisi Terakhir'>
					<Input
						autoComplete='off'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.posisi_terakhir}
						isValid={formik.isValid}
						isTouched={formik.touched.posisi_terakhir}
						invalidFeedback={formik.errors.posisi_terakhir}
					/>
				</FormGroup>
			</div>
			<div className='col-lg-12 py-2'>
				<FormGroup id='pendapatan_terakhir' label='Pendapatan Terakhir'>
					<Input
						type='number'
						min={0}
						autoComplete='off'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.pendapatan_terakhir}
						isValid={formik.isValid}
						isTouched={formik.touched.pendapatan_terakhir}
						invalidFeedback={formik.errors.pendapatan_terakhir}
					/>
				</FormGroup>
			</div>
			<div className='col-lg-12 py-2'>
				<FormGroup id='tahun' label='Tahun'>
					<Input
						type='number'
						min={1901}
						autoComplete='off'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.tahun}
						isValid={formik.isValid}
						isTouched={formik.touched.tahun}
						invalidFeedback={formik.errors.tahun}
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
		<Modal
			isOpen={isOpen}
			setIsOpen={setIsOpen}
			titleId='form-create'
			size={size}
			isFocus={false}
			enableEscape={false}>
			<ModalHeader setIsOpen={setIsOpen}>
				<ModalTitle id='form-create'>{title}</ModalTitle>
			</ModalHeader>
			<ModalBody>{renderComponent}</ModalBody>
		</Modal>
	);
};

FormCreate.propTypes = {
	initialValues: PropTypes.oneOfType([PropTypes.object]),
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
	size: PropTypes.oneOf([null, 'sm', 'lg', 'xl']),
	title: PropTypes.string,
	onSubmit: PropTypes.func,
};
FormCreate.defaultProps = {
	initialValues: null,
	size: null,
	title: 'Modal',
	onSubmit: () => {},
};

const ButtonCustom = ({ data, onRemove, onUpdate }) => {
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
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				title='Edit Pekerjaan'
				isUpdate
				onSubmit={onUpdate}
			/>
		</div>
	);
};

ButtonCustom.propTypes = {
	data: PropTypes.oneOfType([PropTypes.object]),
	onRemove: PropTypes.func,
	onUpdate: PropTypes.func,
};
ButtonCustom.defaultProps = {
	data: null,
	onRemove: () => {},
	onUpdate: () => {},
};

const TableCustom = ({ data, onRemove, onUpdate }) => {
	const { darkModeStatus } = useDarkMode();

	const columns = useMemo(
		() => [
			{
				name: ['Nama Perusahaan'],
				selector: (row) => row?.nama_perusahaan,
				sortable: true,
			},
			{
				name: ['Posisi Terakhir'],
				selector: (row) => row?.posisi_terakhir,
				sortable: true,
			},
			{
				name: ['Pendapatan Terakhir'],
				selector: (row) => row?.pendapatan_terakhir,
				sortable: true,
			},
			{
				name: ['Tahun'],
				selector: (row) => row?.tahun,
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
							onRemove={() => onRemove(rowIndex)}
							onUpdate={(e) => onUpdate(e, rowIndex)}
						/>
					);
				},
			},
		],
		[onRemove, onUpdate],
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
	onRemove: PropTypes.func,
	onUpdate: PropTypes.func,
};
TableCustom.defaultProps = {
	data: [],
	onRemove: () => {},
	onUpdate: () => {},
};

const PekerjaanForm = ({ data, onChange }) => {
	const [isOpen, setIsOpen] = useState(false);

	const initialValues = {
		nama_perusahaan: '',
		posisi_terakhir: '',
		pendapatan_terakhir: 0,
		tahun: new Date().getFullYear(),
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
						<CardTitle>Pekerjaan</CardTitle>
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
					<TableCustom data={data} onUpdate={onHandleUpdate} onRemove={onHandleRemove} />
				</CardBody>
			</Card>

			<FormCreate
				initialValues={initialValues}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				title='Add Pekerjaan'
				onSubmit={onHandleAdd}
			/>
		</>
	);
};

PekerjaanForm.propTypes = {
	data: PropTypes.oneOfType([PropTypes.array]),
	onChange: PropTypes.func,
};
PekerjaanForm.defaultProps = {
	data: [],
	onChange: () => {},
};

export default PekerjaanForm;

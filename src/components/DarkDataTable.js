import React from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Spinner from './bootstrap/Spinner';
import Alert from './bootstrap/Alert';

createTheme('custom_dark', { background: { default: '#242731' } }, 'dark');

const DarkDataTable = ({
	columns,
	data,
	expandableRows,
	expandOnRowClicked,
	pagination,
	paginationComponentOptions,
	paginationResetDefaultPage,
	paginationServer,
	paginationTotalRows,
	progressComponent,
	progressPending,
	onChangePage,
	onChangeRowsPerPage,
	theme,
	noDataComponent,
	...props
}) => {
	// eslint-disable-next-line react/jsx-props-no-spreading
	return (
		<DataTable
			columns={columns}
			data={data}
			expandableRows={expandableRows}
			expandOnRowClicked={expandOnRowClicked}
			pagination={pagination}
			paginationComponentOptions={paginationComponentOptions}
			paginationResetDefaultPage={paginationResetDefaultPage}
			paginationServer={paginationServer}
			paginationTotalRows={paginationTotalRows}
			progressComponent={
				progressComponent ?? (
					<div className='pt-5'>
						<Spinner color='info' size='8rem' />
					</div>
				)
			}
			noDataComponent={
				noDataComponent ?? (
					<div className={classNames('w-100')}>
						<Alert color='info' isLight icon='info'>
							No Data Found
						</Alert>
					</div>
				)
			}
			progressPending={progressPending}
			onChangePage={onChangePage}
			onChangeRowsPerPage={onChangeRowsPerPage}
			theme={theme}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...props}
		/>
	);
};

DarkDataTable.propTypes = {
	columns: PropTypes.oneOfType([PropTypes.array]),
	data: PropTypes.oneOfType([PropTypes.array]),
	expandableRows: PropTypes.bool,
	expandOnRowClicked: PropTypes.bool,
	pagination: PropTypes.bool,
	paginationServer: PropTypes.bool,
	paginationTotalRows: PropTypes.number,
	paginationResetDefaultPage: PropTypes.bool,
	paginationComponentOptions: PropTypes.oneOfType([PropTypes.object, PropTypes.node]),
	progressPending: PropTypes.bool,
	progressComponent: PropTypes.oneOfType([PropTypes.object]),
	onChangeRowsPerPage: PropTypes.func,
	onChangePage: PropTypes.func,
	theme: PropTypes.string,
	noDataComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.node]),
};
DarkDataTable.defaultProps = {
	columns: [],
	data: [],
	expandableRows: false,
	expandOnRowClicked: false,
	pagination: true,
	paginationComponentOptions: null,
	paginationResetDefaultPage: false,
	paginationServer: true,
	paginationTotalRows: 0,
	progressPending: false,
	progressComponent: null,
	onChangePage: () => {},
	onChangeRowsPerPage: () => {},
	theme: 'default',
	noDataComponent: null,
};

export default DarkDataTable;

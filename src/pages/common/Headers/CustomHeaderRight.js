import React, { useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { HeaderRight } from '../../../layout/Header/Header';

// eslint-disable-next-line react/prop-types
const CustomHeaderRight = ({ beforeChildren, afterChildren }) => {
	const { i18n } = useTranslation();

	/**
	 * Language attribute
	 */
	useLayoutEffect(() => {
		document.documentElement.setAttribute('lang', i18n.language);
	});

	return (
		<HeaderRight>
			<div className='row g-3'>
				{beforeChildren}

				{afterChildren}
			</div>
		</HeaderRight>
	);
};
CustomHeaderRight.propTypes = {
	beforeChildren: PropTypes.node,
	afterChildren: PropTypes.node,
};
CustomHeaderRight.defaultProps = {
	beforeChildren: null,
	afterChildren: null,
};

export default CustomHeaderRight;

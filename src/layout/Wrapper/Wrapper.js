import React, { useContext } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Content from '../Content/Content';
import WrapperOverlay from './WrapperOverlay';
import HeaderRoutes from '../Header/HeaderRoutes';
import FooterRoutes from '../Footer/FooterRoutes';
import ThemeContext from '../../contexts/themeContext';
import { decodeToken, getItemsStorage } from '../../helpers/helpers';

const token = getItemsStorage('accessToken');

export const WrapperContainer = ({ children, className, ...props }) => {
	const { rightPanel } = useContext(ThemeContext);
	return (
		<div
			className={classNames(
				'wrapper',
				{ 'wrapper-right-panel-active': rightPanel },
				className,
			)}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...props}>
			{children}
		</div>
	);
};
WrapperContainer.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};
WrapperContainer.defaultProps = {
	className: null,
};

const Wrapper = () => {
	const decode = decodeToken(token?.accessToken);

	return (
		<>
			<WrapperContainer>
				{['user'].includes(decode?.type) && <HeaderRoutes />}
				<Content />
				{['user'].includes(decode?.type) && <FooterRoutes />}
			</WrapperContainer>
			<WrapperOverlay />
		</>
	);
};

export default Wrapper;

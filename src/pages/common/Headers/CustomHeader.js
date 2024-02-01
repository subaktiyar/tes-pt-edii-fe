import React from 'react';
import Header, { HeaderLeft } from '../../../layout/Header/Header';
import CustomHeaderChat from './CustomHeaderChat';
import CustomHeaderRight from './CustomHeaderRight';

const CustomHeader = () => {
	return (
		<Header>
			<HeaderLeft>&nbsp;</HeaderLeft>
			<CustomHeaderRight afterChildren={<CustomHeaderChat />} />
		</Header>
	);
};

export default CustomHeader;

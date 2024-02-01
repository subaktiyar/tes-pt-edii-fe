import React, { useState } from 'react';
import USERS from '../../../common/data/userDummyData';
import Avatar from '../../../components/Avatar';
import { getUser } from '../../../helpers/helpers';

const CustomHeaderChat = () => {
	const [state, setState] = useState(false);
	const { name, position } = getUser();

	return (
		<div
			className='col d-flex align-items-center cursor-pointer'
			onClick={() => setState(!state)}
			role='presentation'>
			<div className='me-3'>
				<div className='text-end'>
					<div className='fw-bold fs-6 mb-0'>{name || 'User'}</div>
					<div className='text-muted'>
						<small>{position || ''}</small>
					</div>
				</div>
			</div>
			<div className='position-relative'>
				<Avatar
					srcSet={USERS.CHLOE.srcSet}
					src={USERS.CHLOE.src}
					size={48}
					color={USERS.CHLOE.color}
				/>
				<span className='position-absolute top-85 start-85 translate-middle badge border border-2 border-light rounded-circle bg-success p-2'>
					<span className='visually-hidden'>Online user</span>
				</span>
			</div>
		</div>
	);
};

export default CustomHeaderChat;

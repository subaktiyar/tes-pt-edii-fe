import * as React from 'react';

function SvgCancelScheduleSend(props) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			height='1em'
			viewBox='0 0 24 24'
			width='1em'
			className='svg-icon'
			{...props}>
			<path fill='none' d='M0 0h24v24H0z' />
			<path
				d='M3 17.97l6.1-2.61c.02-.14.04-.29.07-.43L3 15.75v2.22zM16.5 11c-3.03 0-5.5 2.47-5.5 5.5s2.47 5.5 5.5 5.5 5.5-2.47 5.5-5.5-2.47-5.5-5.5-5.5zm2.47 7.27l-.71.71-1.77-1.77-1.77 1.77-.71-.71 1.77-1.77-1.77-1.77.71-.71 1.77 1.77 1.77-1.77.71.71-1.77 1.77 1.77 1.77zM3 8.25l7.52 1-7.51-3.22z'
				opacity={0.3}
			/>
			<path d='M16.5 9c-.42 0-.83.04-1.24.11L1.01 3 1 10l10.06 1.34c-.42.44-.78.93-1.09 1.46L1 14l.01 7 8.07-3.46C9.59 21.19 12.71 24 16.5 24c4.14 0 7.5-3.36 7.5-7.5S20.64 9 16.5 9zM3 8.25l.01-2.22 7.51 3.22-7.52-1zm6.1 7.11L3 17.97v-2.22l6.17-.82c-.03.14-.05.28-.07.43zM16.5 22c-3.03 0-5.5-2.47-5.5-5.5s2.47-5.5 5.5-5.5 5.5 2.47 5.5 5.5-2.47 5.5-5.5 5.5z' />
			<path d='M18.27 14.03l-1.77 1.76-1.77-1.76-.7.7 1.76 1.77-1.76 1.77.7.7 1.77-1.76 1.77 1.76.7-.7-1.76-1.77 1.76-1.77z' />
		</svg>
	);
}

export default SvgCancelScheduleSend;

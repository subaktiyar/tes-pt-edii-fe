import React from 'react';
import { defaultMenu } from '../menu';
import PageWrapper from '../layout/PageWrapper/PageWrapper';
import Alert, { AlertHeading } from '../components/bootstrap/Alert';
import Page from '../layout/Page/Page';
// import PropTypes from 'prop-types';

const Home = () => {
	return (
		<PageWrapper title={defaultMenu.home.text}>
			<Page container='fluid'>
				<div>
					<div className='col-12'>
						<Alert
							icon='Verified'
							isLight
							color='primary'
							borderWidth={0}
							className='shadow-3d-primary'
							isDismissible>
							<AlertHeading tag='h2' className='h4'>
								Welcome!
							</AlertHeading>
							<span>Welcome to Home!</span>
						</Alert>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

Home.propTypes = {};
Home.defaultProps = {};

export default Home;

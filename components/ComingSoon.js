import React from 'react';
import styles from '../scss/components/coming_soon.module.scss';

const coming_soon = () => {
	return (
		<div className="container">
			<div className="row">
				<div className="col-12">
					<h1 className={styles.text}>Coming soon...</h1>
				</div>
			</div>
		</div>
	);
};

export default coming_soon;

import { useEffect, useState } from 'react';
import CheckoutForm from './FormComponent';

const FormCheckout = ({ totalPrice }) => {
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		setLoading(false);
	}, [totalPrice]);

	if (isLoading) return <>Please, wait a few seconds...</>;

	return (
		<div>
			{isLoading ? (
				<div>Please, wait...</div>
			) : (
				<CheckoutForm totalPrice={totalPrice} />
			)}
		</div>
	);
};

export default FormCheckout;

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import CheckoutForm from './FormComponent';
import PageNotFound from './PageNotFound';

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const FormCheckout = ({ totalPrice }) => {
	const [clientSecret, setClientSecret] = useState('');
	const [paymentIntent, setPaymentIntent] = useState('');
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);

		fetch('api/stripe_intent', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				amount: totalPrice * 100,
				payment_intent_id: paymentIntent || '',
				products: localStorage.getItem('cart')
			})
		})
			.then((res) => res.json())
			.then((data) => {
				setClientSecret(data.client_secret), setPaymentIntent(data.id);
				setLoading(false);
			});

		console.log(paymentIntent);
	}, [paymentIntent, totalPrice]);

	const options = {
		clientSecret
	};

	if (!clientSecret && !isLoading)
		return <>Please, wait a few seconds...</>;

	return (
		<div>
			{clientSecret && (
				<Elements options={options} stripe={stripe}>
					{isLoading ? (
						<div>Please, wait...</div>
					) : (
						<CheckoutForm
							paymentIntent={paymentIntent}
							totalPrice={totalPrice}
						/>
					)}
				</Elements>
			)}
		</div>
	);
};

export default FormCheckout;

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import CheckoutForm from './FormComponent';
import PageNotFound from './PageNotFound';

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const FormCheckout = () => {
	const [clientSecret, setClientSecret] = useState('');
	const [paymentIntent, setPaymentIntent] = useState('');
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);

		fetch('api/stripe_intent', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				amount: 1000,
				payment_intent_id: ''
			})
		})
			.then((res) => res.json())
			.then((data) => {
				setClientSecret(data.client_secret), setPaymentIntent(data.id);
				setLoading(false);
			});
	}, []);

	const options = {
		clientSecret
	};

	if (isLoading) return <p>Loading...</p>;
	if (!clientSecret) return <PageNotFound />;

	return (
		<div>
			{clientSecret && (
				<Elements options={options} stripe={stripe}>
					<CheckoutForm paymentIntent={paymentIntent} />
				</Elements>
			)}
		</div>
	);
};

export default FormCheckout;

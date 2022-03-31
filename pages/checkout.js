import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import CheckoutForm from '../components/FormComponent';

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
	const [clientSecret, setClientSecret] = useState('');
	const [paymentIntent, setPaymentIntent] = useState('');

	useEffect(() => {
		fetch('api/stripe_intent', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				amount: 30000,
				payment_intent_id: ''
			})
		})
			.then((res) => res.json())
			.then((data) => {
				setClientSecret(data.client_secret), setPaymentIntent(data.id);
			});
	}, []);

	const options = {
		clientSecret,
		appearance
	};

	return (
		<div>
			<Head>
				<title>Stripe Elements</title>
			</Head>

			<h1 className="text-2xl bold mb-4 mt-4 text-center"></h1>

			{clientSecret && (
				<Elements options={options} stripe={stripe}>
					<CheckoutForm paymentIntent={paymentIntent} />
				</Elements>
			)}
		</div>
	);
};

export default Checkout;

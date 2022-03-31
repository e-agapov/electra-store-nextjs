import {
	PaymentElement,
	useElements,
	useStripe
} from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';

const FormComponent = ({ paymentIntent }) => {
	const [email, setEmail] = useState('');
	const [locAmount, setLocAmount] = useState('300');
	const [message, setMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const stripe = useStripe();
	const elements = useElements();

	useEffect(() => {
		if (!stripe) {
			return;
		}

		//Grab the client secret from url params
		const clientSecret = new URLSearchParams(window.location.search).get(
			'payment_intent_client_secret'
		);

		if (!clientSecret) {
			return;
		}

		stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
			switch (paymentIntent.status) {
				case 'succeeded':
					setMessage('Payment succeeded!');
					break;
				case 'processing':
					setMessage('Your payment is processing.');
					break;
				case 'requires_payment_method':
					setMessage(
						'Your payment was not successful, please try again.'
					);
					break;
				default:
					setMessage('Something went wrong.');
					break;
			}
		});
	}, [stripe]);

	const handleAmount = async (val) => {
		setLocAmount(val);
		fetch('api/stripe_intent', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				amount: val * 100,
				payment_intent_id: paymentIntent.paymentIntent
			})
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Stripe.js has not yet loaded.
		if (!stripe || !elements) {
			return;
		}

		setIsLoading(true);

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: 'http://localhost:3000/successful',
				receipt_email: email,
				shipping: {
					address: { city: 'NY' },
					name: 'Shipping user'
				},
				payment_method_data: {
					billing_details: {
						name: 'Billing user'
					}
				}
			}
		});

		if (error.type === 'card_error' || error.type === 'validation_error') {
			setMessage(error.message);
		} else {
			setMessage('An unexpected error occurred.');
		}

		setIsLoading(false);
	};

	return (
		<>
			<form id="payment-form" onSubmit={handleSubmit} className="m-auto">
				<div className="mb-3">
					Cart Total:
					<input
						id="amount"
						type="text"
						value={locAmount}
						className={''}
						onChange={(e) => handleAmount(e.target.value)}
						placeholder="Enter email address"
					/>
				</div>
				<div className="mb-6">
					Email address:
					<input
						className={''}
						id="email"
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter email address"
					/>
				</div>
				<PaymentElement id="payment-element" />
				<button
					className="elements-style-background"
					disabled={isLoading || !stripe || !elements}
					id="submit"
				>
					<span id="button-text">
						{isLoading ? (
							<div className="spinner" id="spinner"></div>
						) : (
							'Pay now'
						)}
					</span>
				</button>
				{/* Show any error or success messages */}
				{message && <div id="payment-message">{message}</div>}
			</form>
		</>
	);
};

export default FormComponent;

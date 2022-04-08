import {
	PaymentElement,
	useElements,
	useStripe
} from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import styles from '../scss/components/Checkout.module.scss';

const FormComponent = ({ paymentIntent, totalPrice }) => {
	const [email, setEmail] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [city, setCity] = useState('');
	const [address, setAddress] = useState('');
	const [zip, setZipCode] = useState('');
	const [locAmount, setLocAmount] = useState(0);
	const [message, setMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const stripe = useStripe();
	const elements = useElements();

	useEffect(() => {
		setLocAmount(totalPrice);

		if (!stripe) return;

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
	}, [paymentIntent.paymentIntent, stripe, totalPrice]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!stripe || !elements) return;

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

	if (isLoading) return <div>Please, wait...</div>;

	return (
		<>
			<div className={styles.headline}>Check out</div>

			<form id="payment-form" onSubmit={handleSubmit} className="m-auto">
				<div className={styles.h2}>Contact information</div>
				<div className="row row-cols-1 row-cols-md-2">
					<div className="mb-3">
						<input
							className={styles.input}
							id="firstName"
							type="text"
							value={firstName}
							placeholder="Enter your first name"
							onChange={(e) => setFirstName(e.target.value)}
						/>
					</div>
					<div className="mb-3">
						<input
							className={styles.input}
							id="lastName"
							type="text"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							placeholder="Enter your last name"
						/>
					</div>
					<div className="mb-3">
						<input
							className={styles.input}
							id="email"
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Enter email address"
						/>
					</div>
					<div className="mb-3">
						<input
							className={styles.input}
							id="phoneNumber"
							type="text"
							value={phoneNumber}
							onChange={(e) => setPhoneNumber(e.target.value)}
							placeholder="Enter phone number"
						/>
					</div>
				</div>

				<div className={styles.h2}>Delivery Address</div>

				<div className="mb-3">
					<input
						className={styles.input}
						id="city"
						type="text"
						value={city}
						onChange={(e) => setCity(e.target.value)}
						placeholder="Enter city"
					/>
				</div>
				<div className="mb-3">
					<input
						className={styles.input}
						id="address"
						type="text"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						placeholder="Enter address"
					/>
				</div>
				<div className="mb-3">
					<input
						className={styles.input}
						id="zip"
						type="text"
						value={zip}
						onChange={(e) => setZipCode(e.target.value)}
						placeholder="Enter zip-code"
					/>
				</div>

				<PaymentElement id="payment-element" className={`${styles.paymentInfo} mt-3 my-md-5`} />

				<div className="d-flex justify-content-center">
					<div className={styles.totalPrice}>
						Cart Total {locAmount} $
					</div>
					<button
						className={styles.payNowBtn}
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
				</div>

				{message && <div id="payment-message">{message}</div>}
			</form>
		</>
	);
};

export default FormComponent;

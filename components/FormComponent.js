import RevolutCheckout from '@revolut/checkout';
import axios from 'axios';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../scss/components/Checkout.module.scss';

async function finishOrder(id) {
	const response = await fetch(`/api/orders/${id}/finish`, {
		method: 'POST'
	});

	const order = await response.json();

	if (order.isCompleted) Router.replace('/success');
}

const FormComponent = ({ totalPrice = 0 }) => {
	const [email, setEmail] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [city, setCity] = useState('');
	const [address, setAddress] = useState('');
	const [zip, setZipCode] = useState('');
	const [locAmount, setLocAmount] = useState(0);

	const router = Router;

	if (totalPrice == 0 || !totalPrice) router.push('/');

	useEffect(() => {
		setLocAmount(totalPrice);
	}, [totalPrice]);

	async function handleSubmit(e) {
		e.preventDefault();

		await axios({
			url: '/api/pay',
			'Content-Type': 'application/json',
			params: {
				name: `${firstName} ${lastName}` ?? null,
				email: `${email}` ?? null,
				amount: locAmount || totalPrice || null,
				currency: 'USD',
				description: ''
			}
		})
			.then((res) => res.data.public_id)
			.then((order_id) =>
				RevolutCheckout(String(order_id), 'sandbox').then(function (
					instance
				) {
					instance.payWithPopup({
						name: `${firstName} ${lastName}` ?? null,
						email: `${email}` ?? null,
						phone: `${phoneNumber}` ?? '',

						billingAddress: {
							city: `${city}` ?? '',
							streetLine1: address ?? '',
							postcode: `${zip}` ?? '',
							region: '',
							streetLine2: '',
							countryCode: 'UA'
						},

						shippingAddress: {
							city: `${city}` ?? '',
							streetLine1: address ?? '',
							postcode: `${zip}` ?? '',
							region: '',
							streetLine2: '',
							countryCode: 'UA'
						},
						onSuccess() {
							// finishOrder(order_id);
							Router.replace('/success');
						}
					});
				})
			)
			.catch((err) => console.error(err));
	}

	return (
		<>
			<div className={styles.headline}>Check out</div>

			<div className={styles.h2}>Contact information</div>
			<form id='payment-form' onSubmit={handleSubmit} className='m-auto'>
				<div className='row row-cols-1 row-cols-md-2'>
					<div className='mb-3'>
						<input
							className={styles.input}
							id='firstName'
							type='text'
							value={firstName}
							placeholder='Enter your first name'
							name='name'
							onChange={(e) => setFirstName(e.target.value)}
						/>
					</div>
					<div className='mb-3'>
						<input
							className={styles.input}
							id='lastName'
							type='text'
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							placeholder='Enter your last name'
						/>
					</div>
					<div className='mb-3'>
						<input
							className={styles.input}
							id='email'
							type='text'
							value={email}
							name='email'
							onChange={(e) => setEmail(e.target.value)}
							placeholder='Enter email address'
						/>
					</div>
					<div className='mb-3'>
						<input
							className={styles.input}
							id='phoneNumber'
							type='text'
							value={phoneNumber}
							name='phone'
							onChange={(e) => setPhoneNumber(e.target.value)}
							placeholder='Enter phone number'
						/>
					</div>
				</div>

				<div className={styles.h2}>Delivery Address</div>

				<div className='mb-3'>
					<input
						className={styles.input}
						id='city'
						type='text'
						value={city}
						name='city'
						onChange={(e) => setCity(e.target.value)}
						placeholder='Enter city'
					/>
				</div>
				<div className='mb-3'>
					<input
						className={styles.input}
						id='address'
						type='text'
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						placeholder='Enter address'
					/>
				</div>
				<div className='mb-3'>
					<input
						className={styles.input}
						id='zip'
						type='text'
						value={zip}
						onChange={(e) => setZipCode(e.target.value)}
						placeholder='Enter zip-code'
					/>
				</div>

				<div className='d-flex justify-content-center'>
					<div
						className={
							((!firstName ||
								!lastName ||
								!email ||
								!address ||
								!zip ||
								!phoneNumber ||
								!city) &&
								'd-none') ||
							styles.totalPrice
						}>
						Cart Total {locAmount} $
					</div>

					<button
						className={styles.payNowBtn}
						disabled={
							!firstName ||
							!lastName ||
							!email ||
							!address ||
							!zip ||
							!phoneNumber ||
							!city
						}
						id='submit'>
						<span id='button-text'>
							{((!firstName ||
								!lastName ||
								!email ||
								!address ||
								!zip ||
								!phoneNumber ||
								!city) &&
								'Please, fill all fields...') ||
								'Pay now'}
						</span>
					</button>
				</div>
			</form>
		</>
	);
};

export default FormComponent;

import RevolutCheckout from '@revolut/checkout';
import axios from 'axios';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../scss/components/Checkout.module.scss';

async function finishOrder(id) {
  const response = await fetch(`/api/orders/${id}/finish`, {
    method: 'POST',
  });

  const order = await response.json();

  if (order.isCompleted) Router.replace('/success');
}

const FormComponent = ({ totalPrice = 0, products }) => {
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

    function getProducts(products) {
      let data = '';
      for (let key in products) {
        let product = products[key];
        data += ``;

        for (let key in product) {
          if (
            key == 'name' ||
            key == 'color' ||
            key == 'count' ||
            key == 'price' ||
            key == 'brand_id' ||
            key == 'product_quantity' ||
            key == 'product_status'
          ) {
            data += `${key}: ${JSON.stringify(product[key])}`;
          }

          if (key == 'totalPrice') {
            data += `${key}: ${JSON.stringify(product[key] * product.count)}`;
          }

          if (key == 'uri') {
            data += `${key}: (https://electrasharing.shop/products/${product[key]})`;
          }
        }
      }

      return data;
    }

    var data = {
      service_id: 'service_egucrqq',
      template_id: 'template_3qnwc1e',
      user_id: 'tEEoEmoIB05ySbT4U',
      template_params: {
        email: email,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        city: city,
        address: address,
        zip: zip,
        locAmount: locAmount,
        data: `
					Name: ${firstName} ${lastName}
					E-Mail: ${email}
					Phone Number: ${phoneNumber}
					Address: ${city}, ${address}, ${zip}
					LocAmount: ${locAmount}

					Products:`,
        products: getProducts(products),
        mail_to: 'evgenyagap@icloud.com, nsberegaev@gmail.com',
      },
    };

    await axios({
      url: '/api/pay',
      'Content-Type': 'application/json',
      params: {
        name: `${firstName} ${lastName}` ?? null,
        email: `${email}` ?? null,
        amount: locAmount || totalPrice || null,
        currency: 'USD',
        description: '',
      },
    })
      .then((res) => res.data.public_id)
      .then((order_id) =>
        RevolutCheckout(String(order_id), 'prod').then(function (instance) {
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
              countryCode: 'UA',
            },

            shippingAddress: {
              city: `${city}` ?? '',
              streetLine1: address ?? '',
              postcode: `${zip}` ?? '',
              region: '',
              streetLine2: '',
              countryCode: 'UA',
            },
            onSuccess() {
              axios
                .post('https://api.emailjs.com/api/v1.0/email/send', {
                  ...data,
                })
                .then(() => {
                  Router.replace('/success');
                });
            },
          });
        })
      )
      .catch((err) => console.error(err));
  }

  return (
    <>
      <div className={styles.headline}>Check out</div>

      <div className={styles.h2}>Contact information</div>
      <form id="payment-form" onSubmit={handleSubmit} className="m-auto" encType="multipart/form-data">
        <div className="row row-cols-1 row-cols-md-2">
          <div className="mb-3">
            <input
              className={styles.input}
              id="firstName"
              type="text"
              value={firstName}
              placeholder="Enter your first name"
              name="name"
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
              name="email"
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
              name="phone"
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
            name="city"
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

        <div className="d-flex justify-content-center">
          <div
            className={
              ((!firstName || !lastName || !email || !address || !zip || !phoneNumber || !city) && 'd-none') ||
              styles.totalPrice
            }
          >
            Cart Total {locAmount} $
          </div>

          <button
            className={styles.payNowBtn}
            disabled={!firstName || !lastName || !email || !address || !zip || !phoneNumber || !city}
            id="submit"
          >
            <span id="button-text">
              {((!firstName || !lastName || !email || !address || !zip || !phoneNumber || !city) &&
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

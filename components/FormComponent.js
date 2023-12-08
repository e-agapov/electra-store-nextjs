import RevolutCheckout from '@revolut/checkout';
import axios from 'axios';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../scss/components/Checkout.module.scss';

const FormComponent = ({ totalPrice = 0, products }) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [locAmount, setLocAmount] = useState(0);

  const router = Router;

  const formIsFielded = firstName && lastName && email && address && zipCode && phoneNumber && city;

  if (totalPrice == 0 || !totalPrice) router.push('/');

  useEffect(() => {
    setLocAmount(totalPrice);
  }, [totalPrice]);

  function getProducts(products) {
    return products
      .map((product) => {
        const allowedKeys = ['name', 'color', 'count', 'price', 'brand_id', 'product_quantity', 'product_status'];
        const productData = Object.keys(product)
          .filter((key) => allowedKeys.includes(key))
          .map((key) => `${key}: ${key === 'totalPrice' ? product[key] * product.count : JSON.stringify(product[key])}`)
          .join('\n');

        return `${productData}\nuri: https://electrasharing.shop/products/${product.uri}`;
      })
      .join('\n');
  }

  function handleSubmit(e) {
    e.preventDefault();

    // let data = {
    //   service_id: 'service_egucrqq',
    //   template_id: 'template_3qnwc1e',
    //   user_id: 'tEEoEmoIB05ySbT4U',
    //   template_params: {
    //     email: email,
    //     firstName: firstName,
    //     lastName: lastName,
    //     phoneNumber: phoneNumber,
    //     city: city,
    //     address: address,
    //     zip: zipCode,
    //     locAmount: locAmount,
    //     data: `
    // 			Name: ${firstName} ${lastName}
    // 			E-Mail: ${email}
    // 			Phone Number: ${phoneNumber}
    // 			Address: ${city}, ${address}, ${zipCode}
    // 			LocAmount: ${locAmount}

    // 			Products:`,
    //     products: getProducts(products),
    //     mail_to: 'evgenyagap@icloud.com, nsberegaev@gmail.com',
    //   },
    // };

    axios({
      url: '/api/pay',
      'Content-Type': 'application/json',
      params: {
        name: `${firstName} ${lastName}`,
        email: email,
        amount: locAmount || totalPrice,
        currency: 'USD',
        description: '',
      },
    })
      .then((res) => res.data.public_id)
      .then((order_id) => {
        alert(order_id);
        RevolutCheckout(String(order_id), 'prod').then(function (instance) {
          instance.payWithPopup({
            name: `${firstName} ${lastName}`,
            email: email,
            phone: phoneNumber,

            billingAddress: {
              city,
              streetLine1: address ?? '',
              postcode: zipCode ?? '',
              region: '',
              streetLine2: '',
              countryCode: 'UA',
            },

            shippingAddress: {
              city: city ?? '',
              streetLine1: address ?? '',
              postcode: zipCode ?? '',
              region: '',
              streetLine2: '',
              countryCode: 'UA',
            },
            onSuccess() {
              alert('success');
              // axios
              //   .post('https://api.emailjs.com/api/v1.0/email/send', {
              //     ...data,
              //   })
              //   .then(() => {
              //     Router.replace('/success');
              //   });
            },
          });
        });
      })
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
              name="name"
              id="firstName"
              className={styles.input}
              type="text"
              defaultValue={firstName}
              placeholder="Enter your first name"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              className={styles.input}
              id="lastName"
              type="text"
              defaultValue={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
            />
          </div>
          <div className="mb-3">
            <input
              className={styles.input}
              id="email"
              type="text"
              defaultValue={email}
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
              defaultValue={phoneNumber}
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
            defaultValue={city}
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
            defaultValue={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter address"
          />
        </div>
        <div className="mb-3">
          <input
            className={styles.input}
            id="zip"
            type="text"
            defaultValue={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            placeholder="Enter zip-code"
          />
        </div>

        <div className="d-flex justify-content-center">
          {locAmount && <div className={styles.totalPrice}>Cart Total {locAmount} $</div>}

          <button disabled={formIsFielded == false} className={styles.payNowBtn} id="submit">
            {formIsFielded ? 'Pay now' : 'Please, fill all fields...'}
          </button>
        </div>
      </form>
    </>
  );
};

export default FormComponent;

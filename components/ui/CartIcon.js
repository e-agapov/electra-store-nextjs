import { useEffect, useState } from 'react';
import styles from '../../scss/components/ui/Cart.module.scss';

const Cart = () => {
  const [active, setActive] = useState(false);

  function getCartStorage() {
    if (localStorage.getItem('cart')) {
      return JSON.parse(localStorage.getItem('cart')).length ? true : false;
    }
  }

  useEffect(() => {
    const cartStorage = getCartStorage();

    if (cartStorage) {
      setActive(true);
    } else {
      setActive(false);
    }

    return () => {
      if (cartStorage) {
        setActive(true);
      } else {
        setActive(false);
      }
    };
  }, []);

  return (
    <div className={styles.cart + ' ' + (active ? styles.active : null)}>
      <svg width="33" height="33" viewBox="0 0 33 33">
        <g clipPath="url(#clip0_616_81)">
          <path d="M10.6736 25.9674C11.0628 25.9674 11.3783 25.6519 11.3783 25.2628C11.3783 24.8736 11.0628 24.5581 10.6736 24.5581C10.2845 24.5581 9.96899 24.8736 9.96899 25.2628C9.96899 25.6519 10.2845 25.9674 10.6736 25.9674Z" />
          <path d="M22.2395 25.9674C22.6287 25.9674 22.9442 25.6519 22.9442 25.2628C22.9442 24.8736 22.6287 24.5581 22.2395 24.5581C21.8503 24.5581 21.5349 24.8736 21.5349 25.2628C21.5349 25.6519 21.8503 25.9674 22.2395 25.9674Z" />
          <path d="M16.5005 0C7.38812 0 0.000976562 7.3877 0.000976562 16.4997C0.000976562 25.6118 7.38812 33 16.5005 33C25.6131 33 33.0005 25.612 33.0005 16.4997C33.0005 7.38748 25.6131 0 16.5005 0ZM11.9913 22.8461H22.2403C23.5726 22.8461 24.6564 23.9302 24.6564 25.2625C24.6564 26.5948 23.5726 27.6789 22.2403 27.6789C20.9077 27.6789 19.8235 26.5948 19.8235 25.2625C19.8235 25.0174 19.8609 24.7809 19.9288 24.5579H12.9853C13.0535 24.7809 13.0909 25.0172 13.0909 25.2625C13.0909 26.5948 12.0071 27.6789 10.6744 27.6789C9.3418 27.6789 8.25799 26.5948 8.25799 25.2625C8.25799 24.0722 9.12389 23.0826 10.2585 22.8846L9.83371 20.5449L9.82909 20.5227L7.57589 9.37217L5.50583 9.38581L5.49439 7.67402L8.97473 7.65092L9.81688 11.818L25.419 13.6886L23.4371 21.241H11.6997L11.9913 22.8461Z" />
        </g>

        <defs>
          <clipPath id="clip0_616_81">
            <rect width="33" height="33" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default Cart;

import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Checkout from '../components/Checkout';
import Layout from '../components/Layout';
import styles from '../scss/pages/Cart.module.scss';
import financial from '../utils/financial';
import { imageLoader } from '../utils/imageLoader';

const getStorageItems = () => JSON.parse(localStorage.getItem('cart'));

const updateStorageItems = (uri, key, value, color = '') => {
  const items = getStorageItems();

  let newList = items.map((item) => {
    if (item.uri === uri && (color != '' ? item.color === color : true)) {
      item[key] = value;

      if (key === 'count') item.totalPrice = financial(item.price * item.count);
    }

    return item;
  });

  newList = newList.filter((item) => item.count > 0);

  localStorage.setItem('cart', JSON.stringify(newList));
};

const totalAcc = (products, whatIsAcc) =>
  products.reduce((acc, item) => acc + (whatIsAcc !== 'count' ? item[whatIsAcc] * item.count : +item.count), 0);

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [goods, setGoods] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [isCheckout, setIsCheckout] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const getStorage = getStorageItems();

    if (getStorage) {
      Promise.all(
        getStorage.map((item) =>
          axios.get(`/api/products/${item?.uri}${item?.color ? '?color=' + item.color : ''}`).then((res) => ({
            ...res.data,
            count: item.count || 1,
            totalPrice: financial(item.count * res.data.price) || 0,
          }))
        )
      ).then((mappedProducts) => {
        setProducts(mappedProducts);
      });
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    setGoods(totalAcc(products, 'count'));
    setTotalCartPrice(financial(totalAcc(products, 'price')));
  }, [products]);

  const updateCount = (uri, method, count, color = '') => {
    let newList = null;

    if (method === 'destroy') {
      count = 0;
      newList = products.filter((item) => item.uri !== uri || (item.uri === uri && item.color !== color));
    } else {
      newList = products.map((item) => {
        if (item.uri === uri && (color !== '' ? item.color === color : true)) {
          count = method === 'add' ? item.count++ : item.count--;
        }

        return item;
      });
    }

    setProducts(newList);
    updateStorageItems(uri, 'count', count, color);
  };

  const colorOfProduct = (product) => product.colors.find((color) => color.name == product.color).hex;

  if (isLoading) {
    return (
      <Layout title="Products – Electra">
        <div className="cart-page">
          <div className="cart-page__loader">loading...</div>
        </div>
      </Layout>
    );
  }

  if (isCheckout) {
    return (
      <Layout title="Cart – Electra">
        <div className="mx-auto col-lg-6">
          <Checkout products={products} totalPrice={totalCartPrice} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Cart – Electra">
      <div className="container my-3 my-lg-5">
        <div className={styles.headline}>Shopping cart</div>

        {products ? (
          <div className={styles.cartList}>
            {products.map((product) => (
              <div key={product.id} className={styles.cartItem}>
                {product?.image && (
                  <div className={`${styles.mobileInfo} d-block d-md-none`}>
                    <div className={styles.mobileImage}>
                      <Image
                        src={product.image}
                        alt={product?.name}
                        layout="fill"
                        className={styles.image}
                        loader={imageLoader}
                      />
                    </div>

                    <div className={styles.mobileName}>{product?.name}</div>
                    <div className={styles.mobilePrice}>{financial(product?.price)} $</div>
                  </div>
                )}

                {product?.image && (
                  <div className={`${styles.cartItemImg} d-none d-md-block`}>
                    <Image
                      loader={imageLoader}
                      src={product?.image}
                      alt={`product ${product?.name}`}
                      width="210"
                      height="210"
                    />
                  </div>
                )}

                <div className={'align-self-center align-self-md-start ms-3'}>
                  <div className={`${styles.cartItemName} d-none d-md-block`}>{product?.name}</div>

                  {product?.color && (
                    <div className={`${styles.cartItemColor}`}>
                      <div className={styles.nameOfColumn}>Color</div>
                      <div
                        className={styles.color}
                        style={{
                          background: colorOfProduct(product),
                          border: `3px solid #eee`,
                        }}
                      ></div>
                    </div>
                  )}
                </div>

                <div className={`${styles.quantity} mx-auto`}>
                  {product?.count > 1 && (
                    <button
                      onClick={() => updateCount(product.uri, 'remove', product.color)}
                      className={styles.actionBtn}
                    >
                      -
                    </button>
                  )}
                  <div>{product.count}</div>
                  <button onClick={() => updateCount(product.uri, 'add', product.color)} className={styles.actionBtn}>
                    +
                  </button>
                </div>
                <div className={`${styles.price} d-none d-md-block align-self-center`}>
                  {financial(product.price)} $
                </div>

                <div className={styles.remove}>
                  <button
                    onClick={() => updateCount(product.uri, 'destroy', false, product.color)}
                    className={styles.actionBtn}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <line x1="0" y1="0" x2="20" y2="20" stroke="#6f6f6f" />
                      <line x1="0" y1="20" x2="20" y2="0" stroke="#6f6f6f" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.cartIsEmpty}>Cart is empty</div>
        )}

        <div className={styles.totalInformation}>
          {goods !== 0 && <div className={styles.goods}>Goods {goods}</div>}
          <div className={styles.subtotal}>Total</div>
          <div className={styles.totalPrice}>{financial(totalCartPrice)} $</div>

          {totalCartPrice !== 0 && (
            <div className={styles.checkoutBlock}>
              <div className={styles.moreInfoText}>Shipping & taxes are calculated at check out</div>

              <button
                className={`mt-5 ${styles.checkoutBtn}`}
                onClick={() => {
                  window.scrollTo(0, 0);
                  setIsCheckout((prevState) => !prevState);
                }}
              >
                Check out
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Cart;

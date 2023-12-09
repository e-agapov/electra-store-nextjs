import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState, memo } from 'react';
import Layout from '../../components/Layout';
import styles from '../../scss/pages/Product.module.scss';
import { imageLoader } from '../../utils/imageLoader';
import financial from '../../utils/financial';

const ImagesOfProduct = memo(function ImagesOfProduct({ product, setImage }) {
  return product?.images?.map((imageSrc) => (
    <button
      key={imageSrc + new Date().getTime()}
      onClick={() => setImage(imageSrc)}
      width={'100%'}
      height={'100%'}
      className={styles.imageAProduct}
      style={{
        position: 'relative',
      }}
    >
      <Image
        loader={imageLoader}
        className={styles.image}
        src={imageSrc}
        alt=""
        width={500}
        height={500}
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
    </button>
  ));
});

const Product = () => {
  const router = useRouter();

  const { slug } = router.query;

  const [product, setProduct] = useState(null);
  const [currentColor, setCurrentColor] = useState(null);
  const [image, setImage] = useState(null);
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(`/api/products/${slug}`)
        .then((response) => {
          response.data.colors && setCurrentColor(response.data.colors[0].hex);
          response.data.images && setImage(response.data.images[response.data.poster_id]);
          return response;
        })
        .then((response) => setProduct(response.data))
        .catch(() => router.push('/'));
    }

    fetchData();
  }, [router, slug]);

  function addToCart() {
    const productColor = product?.colors?.find((col) => col.hex === currentColor) || false;

    const cartStorage = JSON.parse(localStorage.getItem('cart') || '[]');

    const productToCart = {
      id: product.id,
      name: `${product.name}${productColor?.name ? ` - ${productColor.name}` : ''}`,
      category: product.category || '',
      color: productColor ? productColor?.name : '',
      uri: product.uri,
      price: product.price,
      count: 1,
    };

    localStorage.setItem('cart', JSON.stringify([...cartStorage, productToCart]));

    setInCart(true);
  }

  return (
    product && (
      <Layout title={`${product?.name} – Electra`} description={product?.description}>
        <div className="container my-3 mt-lg-5">
          <div className="d-flex flex-column flex-xxl-row">
            <div className={`${styles.ProductImages} col-xxl-8`}>
              {product?.images?.length && (
                <div className={`${styles.imagesList} order-2 order-sm-1 mt-3 pt-3 mt-sm-0 pt-sm-0`}>
                  <ImagesOfProduct product={product} setImage={setImage} />
                </div>
              )}

              {image && (
                <div
                  className={`${styles.imageAProduct} order-1 order-md-2`}
                  style={{ position: 'relative' }}
                  width={'100%'}
                  height={'100%'}
                >
                  <Image
                    loader={imageLoader}
                    className={styles.image}
                    src={image}
                    alt=""
                    width={500}
                    height={500}
                    style={{
                      width: '100%',
                      height: 'auto',
                    }}
                  />
                </div>
              )}
            </div>
            <div className="col-lg-4">
              <div className={styles.nameOfProduct}>{product?.name}</div>
              <div className={styles.descriptionOfProduct}>{product?.description}</div>
              <div className={styles.price}>{financial(product?.price)} $</div>

              {product?.colors && currentColor == null && <div className="mt-5 mb-3">Select color</div>}
              {product?.colors && (
                <>
                  <div className={styles.colorsHeaderText}>COLORS</div>
                  <div className={styles.colorsList}>
                    {product?.colors.map((color, index) => (
                      <button
                        onClick={() => setCurrentColor(color.hex)}
                        className={`${styles.colorBtn} ${currentColor === color?.hex && styles.currentColor}`}
                        key={index}
                        value={color.name}
                        style={{
                          background: color.hex,
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
              <div className={styles.buttons}>
                <button onClick={addToCart} className={styles.addToCartBtn}>
                  add to cart
                </button>

                {inCart && (
                  <>
                    <div className="px-3 mt-5">Added to cart</div>
                    <button onClick={() => router.push('/cart')} className={styles.buyNowBtn}>
                      view in cart
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className={`d-flex flex-column flex-lg-row ${styles.moreInfoBlock}`}>
            <div className={'col-lg-12 mb-5 mb-lg-0'}>
              {product?.key_features && (
                <>
                  <div className={styles.sectionHeader}>Key features</div>
                  <div className={styles.keyFeaturesList}>
                    {product?.key_features.map((key, index) => (
                      <div className={styles.keyFeaturesItem} key={index}>
                        {key.key_feature}
                      </div>
                    ))}
                  </div>
                </>
              )}
              {product?.specifications && (
                <div className="pt-5 mt-5">
                  <div className={styles.sectionHeader}>Specification</div>
                  <div className={'row row-cols-lg-4 mt-5'}>
                    {product?.specifications.map((specification, index) => (
                      <div className={styles.specificationItem} key={index}>
                        <div className={styles.name}>{specification?.title}</div>
                        <div className={styles.text}>{specification.detail}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    )
  );
};

export default Product;

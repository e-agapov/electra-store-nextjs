import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../scss/components/Products.module.scss';
import financial from '../utils/financial';
import { imageLoader } from '../utils/imageLoader';

const Products = ({ data }) => {
  const [products, setProducts] = useState();

  useEffect(() => {
    setProducts(data.filter((item) => item.images !== null && item.product_status !== 0));

    return () => setProducts(null);
  }, [data]);

  return (
    (!products?.length && <div className={styles.listInfo}>no products</div>) || (
      <div className="d-flex flex-column">
        <div className={styles.productsListWrapper}>
          {products?.map((product) => (
            <Link key={product.id} href={`/products/${product.uri}`} className={styles.productItem}>
              {product?.waterproof && <div className={styles.isWaterproof}>waterproof</div>}

              <div className={styles.image}>
                {product?.images[0] && (
                  <Image
                    className={styles.imageWrapper}
                    loader={imageLoader}
                    alt=""
                    src={product?.images[0]}
                    width={100}
                    height={100}
                    style={{
                      width: '100%',
                      height: 'auto',
                    }}
                  />
                )}
              </div>

              <div className={styles.nameOfProduct}>{product.name}</div>
              <div className={styles.priceOfProduct}>{financial(product.price)} $</div>
            </Link>
          ))}
        </div>
      </div>
    )
  );
};

export default Products;

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../scss/components/Products.module.scss';
import imgLoader from '../utils/imageLoader';

const Products = ({ data }) => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);

		data ? setProducts(data) : setProducts([]);

		setLoading(false);

		return () => {
			setProducts([]);
			setLoading(false);
		};
	}, [data]);

	return (
		<div className="d-flex flex-column">
			{loading && <div className={styles.listIsEmpty}>Loading...</div>}

			{products?.length && !loading ? (
				<div className={styles.productsListWrapper}>
					{products.map(
						(product) =>
							product.id &&
							product?.images[0] &&
							product.name &&
							product.price &&
							product.uri && (
								<Link
									key={product.id}
									href={`/products/${product.uri}`}
								>
									<a className={styles.productItem}>
										{product?.waterproof && (
											<div
												className={styles.isWaterproof}
											>
												waterproof
											</div>
										)}
										<div className={styles.image}>
											<Image
												className={styles.imageWrapper}
												loader={imgLoader}
												alt=""
												src={product?.images[0]}
												layout="fill"
											/>
										</div>
										<div className={styles.nameOfProduct}>
											{product.name}
										</div>
										<div className={styles.priceOfProduct}>
											{product.price} $
										</div>
									</a>
								</Link>
							)
					)}
				</div>
			) : (
				<div className={styles.listIsEmpty}>List is empty</div>
			)}
		</div>
	);
};

export default Products;

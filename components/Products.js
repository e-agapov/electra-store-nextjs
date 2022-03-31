import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../scss/components/Products.module.scss';
import ImageLoader from '../utils/imageLoader';

const Products = ({ linksCatalog, dataList, category }) => {
	const router = useRouter();
	const products = dataList;

	return (
		<div className="d-flex flex-column">
			{linksCatalog && (
				<div className={styles.links}>
					{linksCatalog.map((linkCatalog) => (
						<Link key={linkCatalog.path} href={linkCatalog.path}>
							<a
								className={`${styles.link} ${
									router.pathname === linkCatalog.path &&
									styles.activeLink
								}`}
							>
								{linkCatalog.name}
							</a>
						</Link>
					))}
				</div>
			)}

			{products?.length ? (
				<div className={styles.productsListWrapper}>
					{products.map(
						(product) =>
							product.id &&
							product.dataImages[0] &&
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
												loader={ImageLoader}
												alt=""
												src={product.dataImages[0].src}
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

import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import styles from '../../scss/pages/Product.module.scss';
import { imageLoader } from '../../utils/imageLoader';
import financial from '../../utils/financial';
import { PageNotFound } from '../../components/PageNotFound';

const Product = () => {
	const router = useRouter();

	const [product, setProduct] = useState(null);
	const [image, setImage] = useState(null);
	const [inCart, setInCart] = useState(false);
	const [loading, setLoading] = useState(true);
	const [getColor, setColor] = useState(null);
	const [renderCount, setRenderCount] = useState(0);

	const options =
		product?.Free20DaysInsurance === true ||
		product?.freeInStoreRides === true ||
		product?.Free20DaysInsurance === true;

	useEffect(() => {
		const { slug } = router.query;

		async function fetchProduct() {
			await axios
				.get(`/api/products/${slug}`)
				.then((res) => {
					res.data.status === 404 &&
						renderCount > 0 &&
						router.replace('/404');

					res?.data?.colors && setColor(res.data.colors[0].hex || '');
					res.data.images &&
						setImage(
							res.data.images[res.data.poster_id || 0] || ''
						);

					res.data.status !== 404 && setProduct(res.data);
					setLoading(false);
				})
				.catch(() => {
					router.replace('/404');
				});

			if (!product && renderCount > 0) {
				router.route = '/404';
			}
		}

		!product && fetchProduct();
		!product && renderCount <= 0 && setRenderCount((prev) => prev + 1);

		return () => {
			setLoading(false);
			setInCart(false);
		};
	}, [product, renderCount, router, router.query.slug]);

	function addToCart() {
		const productColor =
			product?.colors?.find((col) => col.hex === getColor) || false;

		const cartStorage = JSON.parse(localStorage.getItem('cart') || '[]');

		const productToCart = {
			id: product.id,
			name: `${product.name}${
				productColor?.name ? ` - ${productColor.name}` : ''
			}`,
			category: product.category || '',
			color: productColor ? productColor?.name : '',
			uri: product.uri,
			price: product.price,
			count: 1
		};

		localStorage.setItem(
			'cart',
			JSON.stringify([...cartStorage, productToCart])
		);

		setInCart(true);
	}

	return (
		product && (
			<Layout
				title={`${product?.name} – Electra`}
				description={product?.description}>
				<div className='container my-3 mt-lg-5'>
					<div className='d-flex flex-column flex-lg-row'>
						{product?.images && (
							<div className={`${styles.ProductImages} col-lg-8`}>
								{product?.images.length > 1 && (
									<div
										className={`${styles.imagesList} order-2 order-sm-1 mt-3 pt-3 mt-sm-0 pt-sm-0`}>
										{product?.images?.map(
											(imageSrc, index) => (
												<button
													onClick={() =>
														setImage(imageSrc)
													}
													key={index}
													className={
														styles.imageAProduct
													}
													style={{
														position: 'relative'
													}}
													width={'100%'}
													height={'100%'}>
													<Image
														loader={imageLoader}
														className={styles.image}
														src={imageSrc}
														alt=''
														layout='fill'
													/>
												</button>
											)
										)}
									</div>
								)}

								{image && (
									<div
										className={`${styles.imageAProduct} order-1 order-sm-2`}
										style={{ position: 'relative' }}
										width={'100%'}
										height={'100%'}>
										<Image
											loader={imageLoader}
											className={styles.image}
											src={image}
											alt=''
											layout='fill'
										/>
									</div>
								)}
							</div>
						)}

						<div className='col-lg-4'>
							<div className={styles.nameOfProduct}>
								{product?.name}
							</div>
							<div className={styles.descriptionOfProduct}>
								{product?.description}
							</div>
							<div className={styles.price}>
								{financial(product?.price)} $
							</div>

							{product?.colors && getColor == null && (
								<div className='mt-5 mb-3'>Select color</div>
							)}
							{product?.colors && (
								<>
									<div className={styles.colorsHeaderText}>
										COLORS
									</div>
									<div className={styles.colorsList}>
										{product?.colors.map((color, index) => (
											<button
												onClick={() =>
													setColor(color.hex)
												}
												className={`${
													styles.colorBtn
												} ${
													getColor === color?.hex &&
													styles.currentColor
												}`}
												key={index}
												value={color.name}
												style={{
													background: color.hex
												}}
											/>
										))}
									</div>
								</>
							)}
							<div className={styles.btns}>
								<button
									onClick={addToCart}
									className={styles.addToCartBtn}>
									add to cart
								</button>

								{inCart && (
									<>
										<div className='px-3 mt-5'>
											Added to cart
										</div>
										<button
											onClick={() => router.push('/cart')}
											className={styles.buyNowBtn}>
											view in cart
										</button>
									</>
								)}
							</div>
						</div>
					</div>
					<div
						className={`d-flex flex-column flex-lg-row ${styles.moreInfoBlock}`}>
						<div className={'col-lg-12 mb-5 mb-lg-0'}>
							{product?.key_features && (
								<>
									<div className={styles.sectionHeader}>
										Key features
									</div>
									<div className={styles.keyFeaturesList}>
										{product?.key_features.map(
											(key, index) => (
												<div
													className={
														styles.keyFeaturesItem
													}
													key={index}>
													{key.key_feature}
												</div>
											)
										)}
									</div>
								</>
							)}
							{product?.specifications && (
								<div className='pt-5 mt-5'>
									<div className={styles.sectionHeader}>
										Specification
									</div>
									<div
										className={
											'd-flex flex-lg-row flex-wrap mt-5'
										}>
										{product?.specifications.map(
											(specification, index) => (
												<div
													className={`${styles.specificationItem} col-6 col-lg-3 me-auto`}
													key={index}>
													<div
														className={styles.name}>
														{specification?.title}
													</div>
													<div
														className={styles.text}>
														{specification.detail}
													</div>
												</div>
											)
										)}
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

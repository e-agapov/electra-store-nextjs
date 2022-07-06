import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import styles from '../../scss/pages/Product.module.scss';
import { imgLoader } from '../../utils/imageLoader';

const Product = () => {
	const router = useRouter();

	const [product, setProduct] = useState(null);
	const [image, setImage] = useState(null);
	const [getColor, setColor] = useState(null);
	const [inCart, setInCart] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		setImage(image);
		setInCart(false);

		const slug = router.query.slug;

		if (
			loading &&
			product === null &&
			slug !== undefined &&
			slug !== null &&
			slug !== ''
		) {
			axios
				.get(`/api/products/${slug}&color=false`)
				.then((res) => {
					setProduct(res.data);
					setLoading(false);
				})
				.catch((err) => {
					console.error(err);
					setLoading(false);
					setProduct(null);
				});
		}

		if (image == null && product) {
			setImage(product?.images[product?.poster_id || 0]);
		}

		if (loading && product === null) {
			setLoading(false);
		}
	}, [getColor, image, loading, product, router.query.slug]);

	const options =
		product?.Free20DaysInsurance === true ||
		product?.freeInStoreRides === true ||
		product?.Free20DaysInsurance === true;

	function addToCart() {
		const productColor =
			product?.colors?.find((col) => col.hex === getColor) || null;

		const cartStorage = JSON.parse(localStorage.getItem('cart') || '[]');

		setInCart(true);

		if (product.colors) {
			const hasProducts = cartStorage.filter(
				(item) =>
					item.id === product.id && item.color === productColor?.name
			);

			if (hasProducts.length) {
				return false;
			} else {
				const productToCart = {
					id: product.id,
					name: `${product.name} ${productColor?.name}`,
					category: product.category,
					color: productColor ? productColor?.name : false,
					uri: product.uri,
					count: 1
				};

				localStorage.setItem(
					'cart',
					JSON.stringify([productToCart, ...cartStorage])
				);
			}
		} else {
			const hasProduct = cartStorage.find(
				(item) => item.id === product.id
			);

			if (hasProduct) {
				return false;
			} else {
				const productToCart = {
					id: product.id,
					name: `${product.name}`,
					category: product.category,
					uri: product.uri,
					count: 1
				};

				localStorage.setItem(
					'cart',
					JSON.stringify([productToCart, ...cartStorage])
				);
			}
		}
	}

	return (
		<Layout
			title={`${product?.name} – Electra`}
			description={product?.description}
		>
			<div className="container my-3 mt-lg-5">
				<div className="d-flex flex-column flex-lg-row">
					{product?.images && (
						<div className={`${styles.ProductImages} col-lg-8`}>
							<div
								className={`${styles.imagesList} order-2 order-sm-1 mt-3 pt-3 mt-sm-0 pt-sm-0`}
							>
								{product?.images?.map((imageSrc, index) => (
									<button
										onClick={() => setImage(imageSrc)}
										key={index}
										className={styles.imageAProduct}
										style={{ position: 'relative' }}
										width={'100%'}
										height={'100%'}
									>
										<Image
											loader={imgLoader}
											className={styles.image}
											src={imageSrc}
											alt=""
											layout="fill"
										/>
									</button>
								))}
							</div>
							{image && (
								<div
									className={`${styles.imageAProduct} order-1 order-sm-2`}
									style={{ position: 'relative' }}
									width={'100%'}
									height={'100%'}
								>
									<Image
										loader={imgLoader}
										className={styles.image}
										src={image}
										alt=""
										layout="fill"
									/>
								</div>
							)}
						</div>
					)}
					<div className="col-lg-4">
						<div className={styles.nameOfProduct}>
							{product?.name}
						</div>
						<div className={styles.descriptionOfProduct}>
							{product?.description}
						</div>
						<div className={styles.price}>{product?.price} $</div>
						{product?.colors && (
							<>
								<div className={styles.colorsHeaderText}>
									COLORS
								</div>
								<div className={styles.colorsList}>
									{product?.colors.map((color, index) => (
										<button
											onClick={() => setColor(color.hex)}
											className={`${styles.colorBtn} ${
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
						{(product?.colors && getColor != null && (
							<div className={styles.btns}>
								{product?.product_status ? (
									!inCart ? (
										<button
											onClick={addToCart}
											className={styles.addToCartBtn}
										>
											add to cart
										</button>
									) : (
										<>
											<div className="px-3 mt-5">
												Added to cart
											</div>
											<button
												onClick={() =>
													router.push('/cart')
												}
												className={styles.buyNowBtn}
											>
												view in cart
											</button>
										</>
									)
								) : (
									<div className="px-3 mt-5">
										Not available
									</div>
								)}
							</div>
						)) || (
							<div className="px-3 mt-5">
								Choose a color for add to cart
							</div>
						)}
					</div>
				</div>
				<div
					className={`d-flex flex-column flex-lg-row ${styles.moreInfoBlock}`}
				>
					<div className={'col-lg-8 pe-lg-5 mb-5 mb-lg-0'}>
						{product?.key_features && (
							<>
								<div className={styles.sectionHeader}>
									Key features
								</div>
								<div className={styles.keyFeaturesList}>
									{product?.key_features.map((key, index) => (
										<div
											className={styles.keyFeaturesItem}
											key={index}
										>
											{key.key_feature}
										</div>
									))}
								</div>
							</>
						)}
						{product?.specifications && (
							<div className="pt-5 mt-5">
								<div className={styles.sectionHeader}>
									Specification
								</div>
								<div
									className={
										'd-flex flex-lg-row flex-wrap mt-5'
									}
								>
									{product?.specifications.map(
										(specification, index) => (
											<div
												className={`${styles.specificationItem} col-6 col-lg-3 me-auto`}
												key={index}
											>
												<div className={styles.name}>
													{specification?.title}
												</div>
												<div className={styles.text}>
													{specification.detail}
												</div>
											</div>
										)
									)}
								</div>
							</div>
						)}
					</div>
					<div className="col-lg-4">
						<div>
							<svg
								width="186"
								height="63"
								viewBox="0 0 186 63"
								fill="none"
							>
								<circle
									cx="31.5"
									cy="31.5"
									r="31.5"
									fill="black"
								/>
								<path
									d="M30.7773 17.1426H33.3613V43H30.7773V17.1426ZM57.9883 16.4922V43H55.5625V39.7129C54.5312 40.9668 53.3711 41.9102 52.082 42.543C50.8047 43.1758 49.4043 43.4922 47.8809 43.4922C45.1738 43.4922 42.8594 42.5137 40.9375 40.5566C39.0273 38.5879 38.0723 36.1973 38.0723 33.3848C38.0723 30.6309 39.0391 28.2754 40.9727 26.3184C42.9062 24.3613 45.2324 23.3828 47.9512 23.3828C49.5215 23.3828 50.9395 23.7168 52.2051 24.3848C53.4824 25.0527 54.6016 26.0547 55.5625 27.3906V16.4922H57.9883ZM48.1445 25.7559C46.7734 25.7559 45.5078 26.0957 44.3477 26.7754C43.1875 27.4434 42.2617 28.3867 41.5703 29.6055C40.8906 30.8242 40.5508 32.1133 40.5508 33.4727C40.5508 34.8203 40.8965 36.1094 41.5879 37.3398C42.2793 38.5703 43.2051 39.5312 44.3652 40.2227C45.5371 40.9023 46.791 41.2422 48.127 41.2422C49.4746 41.2422 50.752 40.9023 51.959 40.2227C53.166 39.543 54.0918 38.623 54.7363 37.4629C55.3926 36.3027 55.7207 34.9961 55.7207 33.543C55.7207 31.3281 54.9883 29.4766 53.5234 27.9883C52.0703 26.5 50.2773 25.7559 48.1445 25.7559Z"
									fill="white"
								/>
								<path
									d="M79.6797 36.6543L81.7539 37.7441C81.0742 39.0801 80.2891 40.1582 79.3984 40.9785C78.5078 41.7988 77.5059 42.4258 76.3926 42.8594C75.2793 43.2812 74.0195 43.4922 72.6133 43.4922C69.4961 43.4922 67.0586 42.4727 65.3008 40.4336C63.543 38.3828 62.6641 36.0684 62.6641 33.4902C62.6641 31.0645 63.4082 28.9023 64.8965 27.0039C66.7832 24.5898 69.3086 23.3828 72.4727 23.3828C75.7305 23.3828 78.332 24.6191 80.2773 27.0918C81.6602 28.8379 82.3633 31.0176 82.3867 33.6309H65.1953C65.2422 35.8574 65.9512 37.6855 67.3223 39.1152C68.6934 40.5332 70.3867 41.2422 72.4023 41.2422C73.375 41.2422 74.3184 41.0723 75.2324 40.7324C76.1582 40.3926 76.9434 39.9414 77.5879 39.3789C78.2324 38.8164 78.9297 37.9082 79.6797 36.6543ZM79.6797 31.5039C79.3516 30.1914 78.8711 29.1426 78.2383 28.3574C77.6172 27.5723 76.791 26.9395 75.7598 26.459C74.7285 25.9785 73.6445 25.7383 72.5078 25.7383C70.6328 25.7383 69.0215 26.3418 67.6738 27.5488C66.6895 28.4277 65.9453 29.7461 65.4414 31.5039H79.6797ZM106.047 23.875V43H103.621V39.7129C102.59 40.9668 101.43 41.9102 100.141 42.543C98.8633 43.1758 97.4629 43.4922 95.9395 43.4922C93.2324 43.4922 90.918 42.5137 88.9961 40.5566C87.0859 38.5879 86.1309 36.1973 86.1309 33.3848C86.1309 30.6309 87.0977 28.2754 89.0312 26.3184C90.9648 24.3613 93.291 23.3828 96.0098 23.3828C97.5801 23.3828 98.998 23.7168 100.264 24.3848C101.541 25.0527 102.66 26.0547 103.621 27.3906V23.875H106.047ZM96.2031 25.7559C94.832 25.7559 93.5664 26.0957 92.4062 26.7754C91.2461 27.4434 90.3203 28.3867 89.6289 29.6055C88.9492 30.8242 88.6094 32.1133 88.6094 33.4727C88.6094 34.8203 88.9551 36.1094 89.6465 37.3398C90.3379 38.5703 91.2637 39.5312 92.4238 40.2227C93.5957 40.9023 94.8496 41.2422 96.1855 41.2422C97.5332 41.2422 98.8105 40.9023 100.018 40.2227C101.225 39.543 102.15 38.623 102.795 37.4629C103.451 36.3027 103.779 34.9961 103.779 33.543C103.779 31.3281 103.047 29.4766 101.582 27.9883C100.129 26.5 98.3359 25.7559 96.2031 25.7559ZM111.232 16.4922H113.693V43H111.232V16.4922ZM129.197 17.1426H142.152V19.6914H131.764V27.7773H142.152V30.3262H131.764V43H129.197V17.1426ZM155.318 23.3828C158.26 23.3828 160.697 24.4492 162.631 26.582C164.389 28.5273 165.268 30.8301 165.268 33.4902C165.268 36.1621 164.336 38.5 162.473 40.5039C160.621 42.4961 158.236 43.4922 155.318 43.4922C152.389 43.4922 149.992 42.4961 148.129 40.5039C146.277 38.5 145.352 36.1621 145.352 33.4902C145.352 30.8418 146.23 28.5449 147.988 26.5996C149.922 24.4551 152.365 23.3828 155.318 23.3828ZM155.318 25.791C153.279 25.791 151.527 26.5469 150.062 28.0586C148.598 29.5703 147.865 31.3984 147.865 33.543C147.865 34.9258 148.199 36.2148 148.867 37.4102C149.535 38.6055 150.438 39.5312 151.574 40.1875C152.711 40.832 153.959 41.1543 155.318 41.1543C156.678 41.1543 157.926 40.832 159.062 40.1875C160.199 39.5312 161.102 38.6055 161.77 37.4102C162.438 36.2148 162.771 34.9258 162.771 33.543C162.771 31.3984 162.033 29.5703 160.557 28.0586C159.092 26.5469 157.346 25.791 155.318 25.791ZM168.924 23.875H171.438V26.6699C172.188 25.5684 172.979 24.748 173.811 24.209C174.643 23.6582 175.51 23.3828 176.412 23.3828C177.092 23.3828 177.818 23.5996 178.592 24.0332L177.309 26.1074C176.793 25.8848 176.359 25.7734 176.008 25.7734C175.188 25.7734 174.396 26.1133 173.635 26.793C172.873 27.4609 172.293 28.5039 171.895 29.9219C171.59 31.0117 171.438 33.2148 171.438 36.5312V43H168.924V23.875ZM183.391 23.3828C183.988 23.3828 184.498 23.5938 184.92 24.0156C185.342 24.4375 185.553 24.9531 185.553 25.5625C185.553 26.1719 185.342 26.6875 184.92 27.1094C184.498 27.5312 183.988 27.7422 183.391 27.7422C182.793 27.7422 182.283 27.5312 181.861 27.1094C181.439 26.6875 181.229 26.1719 181.229 25.5625C181.229 24.9648 181.439 24.4551 181.861 24.0332C182.283 23.5996 182.793 23.3828 183.391 23.3828ZM183.391 39.1328C183.988 39.1328 184.498 39.3438 184.92 39.7656C185.342 40.1875 185.553 40.7031 185.553 41.3125C185.553 41.9102 185.342 42.4258 184.92 42.8594C184.498 43.2812 183.988 43.4922 183.391 43.4922C182.793 43.4922 182.283 43.2812 181.861 42.8594C181.439 42.4258 181.229 41.9102 181.229 41.3125C181.229 40.7031 181.439 40.1875 181.861 39.7656C182.283 39.3438 182.793 39.1328 183.391 39.1328Z"
									fill="black"
								/>
							</svg>
						</div>
						{product?.ideal_for_text && (
							<div className={styles.idealForText}>
								{product?.ideal_for_text}
							</div>
						)}
						{options ? (
							<div className={styles.idealForBlock}>
								{product?.freeInStoreRides && (
									<div
										className={
											'd-flex align-items-center my-4'
										}
									>
										<div className="me-4">
											<svg
												width="77"
												height="77"
												viewBox="0 0 77 77"
												fill="none"
											>
												<g clipPath="url(#clip0_0_942)">
													<path
														d="M62.6111 33.7556C61.96 33.7556 61.309 33.8019 60.6662 33.8888L60.1193 31.3728C60.9338 31.2525 61.7657 31.1893 62.6111 31.1893C64.9698 31.1893 67.2518 31.664 69.3941 32.6003C69.9649 32.8496 70.6299 32.5892 70.8794 32.0184C71.1289 31.4477 70.8683 30.7827 70.2975 30.5332C67.8687 29.4717 65.2826 28.9335 62.6112 28.9335C61.602 28.9335 60.6095 29.013 59.6392 29.1642L57.8163 20.7791L59.0521 19.5434C59.9055 18.6899 60.1587 17.4178 59.6968 16.3026C59.2348 15.1875 58.1565 14.4668 56.9493 14.4668H48.1444C47.5215 14.4668 47.0165 14.9718 47.0165 15.5947C47.0165 16.2176 47.5215 16.7227 48.1444 16.7227H56.9493C57.3823 16.7227 57.5573 17.0326 57.6125 17.1659C57.6677 17.2991 57.7631 17.6421 57.4569 17.9482L55.7856 19.6195C55.5141 19.8909 55.3994 20.2817 55.4811 20.6566L55.8952 22.5616C50.4413 23.9921 45.5136 27.1907 41.9645 31.6193C39.8677 34.2358 38.2994 37.231 37.3262 40.4137L32.0878 23.2019L34.5159 22.9321C36.0557 22.7611 37.2169 21.4637 37.2169 19.9144C37.2169 18.2401 35.8548 16.878 34.1805 16.878H26.9926C25.4037 16.878 24.1111 18.1706 24.1111 19.7596V20.8689C24.1111 21.6875 24.4609 22.4701 25.0709 23.0161C25.6014 23.491 26.2881 23.7504 26.9935 23.7504C27.0989 23.7504 27.2049 23.7445 27.3108 23.7328L29.807 23.4555L31.0641 27.5861L28.1387 31.1383C25.4697 29.7316 22.4321 28.9336 19.2112 28.9336C8.61813 28.9333 0 37.5515 0 48.1445C0 48.7674 0.505012 49.2725 1.12793 49.2725C1.75085 49.2725 2.25586 48.7674 2.25586 48.1445C2.25586 38.7953 9.86202 31.1892 19.2112 31.1892C21.8863 31.1892 24.4182 31.8129 26.6704 32.9209L24.9891 34.9626C23.169 34.1614 21.2293 33.7556 19.2112 33.7556C11.277 33.7556 4.82228 40.2104 4.82228 48.1445C4.82228 56.0787 11.277 62.5336 19.2112 62.5336C26.7658 62.5336 32.979 56.6814 33.5562 49.2725H37.6643L39.1792 54.2499H38.2904C37.6674 54.2499 37.1624 54.7549 37.1624 55.3779C37.1624 56.0008 37.6674 56.5058 38.2904 56.5058H40.6974C40.6986 56.5058 40.6998 56.5061 40.701 56.5061C40.7023 56.5061 40.7037 56.5058 40.7049 56.5058H43.1123C43.7352 56.5058 44.2403 56.0008 44.2403 55.3779C44.2403 54.7549 43.7352 54.2499 43.1123 54.2499H41.537L40.0221 49.2725H42.2649C44.0511 49.2725 45.5607 47.9123 45.7763 46.1087C46.6008 39.2139 51.513 33.6938 57.9144 31.8503L61.5087 48.3841C61.6235 48.9121 62.0906 49.2726 62.6097 49.2726C62.6891 49.2726 62.7697 49.2642 62.8505 49.2466C63.4591 49.1142 63.8455 48.5136 63.713 47.9048L61.1472 36.1023C61.6317 36.0441 62.121 36.0113 62.6108 36.0113C69.3009 36.0113 74.7438 41.4542 74.7438 48.1444C74.7438 54.8346 69.3009 60.2776 62.6108 60.2776C55.9205 60.2776 50.4776 54.8346 50.4776 48.1444C50.4776 44.3031 52.2385 40.7707 55.309 38.4533C55.8062 38.0781 55.905 37.3708 55.5298 36.8736C55.1546 36.3766 54.4473 36.2776 53.9501 36.6529C50.3096 39.4005 48.2217 43.589 48.2217 48.1445C48.2217 56.0787 54.6766 62.5336 62.6108 62.5336C70.5449 62.5336 77 56.0787 77 48.1445C77 40.2104 70.5452 33.7556 62.6111 33.7556ZM27.0616 21.4905C26.8198 21.5171 26.653 21.4046 26.5752 21.3348C26.4973 21.2652 26.3668 21.112 26.3668 20.8686V19.7593C26.3668 19.4143 26.6474 19.1336 26.9924 19.1336H34.1803C34.6107 19.1336 34.9609 19.4838 34.9609 19.9141C34.9609 20.3123 34.6623 20.6459 34.2665 20.6898L27.0616 21.4905ZM31.8526 30.1769L33.3751 35.1798C32.3925 34.1072 31.2897 33.1467 30.0888 32.3186L31.8526 30.1769ZM36.128 47.0166H33.5537C33.3239 44.1128 32.2146 41.3222 30.3687 39.0581C29.9751 38.5753 29.2647 38.503 28.7818 38.8965C28.299 39.2901 28.2267 40.0007 28.6202 40.4835C30.1387 42.3459 31.0659 44.6317 31.2898 47.0164H20.0039C19.4434 47.0164 19.2026 46.5984 19.1422 46.4702C19.0817 46.3421 18.9121 45.8903 19.2683 45.4576L28.6497 34.0659C32.8868 36.9159 35.7722 41.626 36.128 47.0166ZM19.2112 60.2777C12.5211 60.2777 7.07813 54.8348 7.07813 48.1445C7.07813 41.4544 12.5211 36.0115 19.2112 36.0115C20.6953 36.0115 22.1283 36.2721 23.4876 36.786L17.527 44.0238C16.7295 44.9922 16.5666 46.2986 17.102 47.4332C17.6374 48.5677 18.7493 49.2725 20.0039 49.2725H31.29C30.7189 55.4356 25.521 60.2777 19.2112 60.2777V60.2777ZM43.5367 45.8408C43.4552 46.5221 42.9204 47.0166 42.265 47.0166C42.265 47.0166 38.485 47.0146 38.4484 47.0163C38.6797 41.8792 40.4916 37.0645 43.7249 33.03C46.9521 29.003 51.4241 26.0884 56.375 24.7686L57.4343 29.6418C50.1109 31.6891 44.4773 37.9754 43.5367 45.8408Z"
														fill="black"
													/>
												</g>
												<defs>
													<clipPath id="clip0_0_942">
														<rect
															width="77"
															height="77"
															fill="white"
														/>
													</clipPath>
												</defs>
											</svg>
										</div>
										<div className={styles.textOfIdealFor}>
											Free In - store Rides
										</div>
									</div>
								)}
								{product?.FreeBikeHealthCheck && (
									<div
										className={
											'd-flex align-items-center my-4'
										}
									>
										<div className="me-4">
											<svg
												width="67"
												height="67"
												viewBox="0 0 67 67"
												fill="none"
											>
												<path
													d="M53.1198 8.77824H47.0584V6.06658C47.0584 5.18926 46.1014 4.79052 45.224 4.79052H40.5185C39.402 1.60028 36.6105 0.00516406 33.4203 0.00516406C30.2651 -0.113451 27.3953 1.82118 26.322 4.79052H21.6962C20.8188 4.79052 19.9415 5.18926 19.9415 6.06658V8.77824H13.8799C10.2879 8.81655 7.34926 11.6502 7.18042 15.2384V60.9384C7.18042 64.4477 10.3707 66.9998 13.8799 66.9998H53.1198C56.6291 66.9998 59.8193 64.4477 59.8193 60.9384V15.2385C59.6505 11.6502 56.7118 8.81655 53.1198 8.77824ZM23.1316 7.98075H27.5182C28.2839 7.88733 28.899 7.30479 29.0336 6.54516C29.506 4.48826 31.3105 3.01175 33.4203 2.95619C35.5104 3.01954 37.2878 4.50062 37.727 6.54516C37.8701 7.33104 38.5257 7.92107 39.3221 7.98075H43.8683V14.3612H23.1316V7.98075ZM56.6291 60.9386C56.6291 62.6932 54.8744 63.8097 53.1198 63.8097H13.8799C12.1253 63.8097 10.3707 62.6932 10.3707 60.9386V15.2385C10.5334 13.4122 12.0465 12.0021 13.8799 11.9686H19.9414V16.0362C20.0256 16.9298 20.7996 17.5983 21.696 17.5516H45.2239C46.1368 17.6015 46.935 16.9422 47.0582 16.0362V11.9685H53.1196C54.9529 12.0021 56.4662 13.412 56.6289 15.2384V60.9386H56.6291Z"
													fill="black"
												/>
												<path
													d="M27.3587 35.656C26.7605 35.0254 25.7673 34.9898 25.1255 35.5763L20.0211 40.4413L17.8677 38.2081C17.2695 37.5775 16.2763 37.5421 15.6345 38.1284C15.0167 38.7757 15.0167 39.7941 15.6345 40.4413L18.9044 43.7911C19.1874 44.108 19.5963 44.2833 20.021 44.2697C20.4417 44.2637 20.843 44.0917 21.1375 43.7911L27.3584 37.8892C27.9752 37.3235 28.0164 36.3648 27.4505 35.7482C27.4215 35.716 27.3908 35.6853 27.3587 35.656Z"
													fill="black"
												/>
												<path
													d="M50.2485 39.0854H31.9047C31.0237 39.0854 30.3096 39.7996 30.3096 40.6806C30.3096 41.5616 31.0237 42.2757 31.9047 42.2757H50.2485C51.1295 42.2757 51.8436 41.5616 51.8436 40.6806C51.8436 39.7996 51.1295 39.0854 50.2485 39.0854Z"
													fill="black"
												/>
												<path
													d="M27.3587 22.8952C26.7605 22.2646 25.7673 22.229 25.1255 22.8156L20.0211 27.6806L17.8677 25.4474C17.2695 24.8167 16.2763 24.7812 15.6345 25.3677C15.0167 26.015 15.0167 27.0333 15.6345 27.6806L18.9044 31.0304C19.1874 31.3473 19.5963 31.5225 20.021 31.5089C20.4417 31.503 20.843 31.3309 21.1375 31.0304L27.3584 25.1285C27.9752 24.5627 28.0164 23.604 27.4505 22.9874C27.4215 22.9552 27.3908 22.9246 27.3587 22.8952Z"
													fill="black"
												/>
												<path
													d="M50.2485 26.3247H31.9047C31.0237 26.3247 30.3096 27.0388 30.3096 27.9198C30.3096 28.8008 31.0237 29.5149 31.9047 29.5149H50.2485C51.1295 29.5149 51.8436 28.8008 51.8436 27.9198C51.8436 27.0388 51.1295 26.3247 50.2485 26.3247Z"
													fill="black"
												/>
												<path
													d="M27.3587 48.4167C26.7605 47.786 25.7673 47.7506 25.1255 48.337L20.0211 53.202L17.8677 50.9688C17.2695 50.3382 16.2763 50.3028 15.6345 50.8891C15.0167 51.5364 15.0167 52.5548 15.6345 53.202L18.9044 56.5518C19.1874 56.8687 19.5963 57.044 20.021 57.0304C20.4417 57.0244 20.843 56.8524 21.1375 56.5518L27.3584 50.6499C27.9752 50.0841 28.0164 49.1255 27.4505 48.5089C27.4215 48.4768 27.3908 48.4461 27.3587 48.4167Z"
													fill="black"
												/>
												<path
													d="M50.2485 51.8462H31.9047C31.0237 51.8462 30.3096 52.5603 30.3096 53.4413C30.3096 54.3223 31.0237 55.0364 31.9047 55.0364H50.2485C51.1295 55.0364 51.8436 54.3223 51.8436 53.4413C51.8436 52.5603 51.1295 51.8462 50.2485 51.8462Z"
													fill="black"
												/>
											</svg>
										</div>
										<div className={styles.textOfIdealFor}>
											Free Bike Health Check
										</div>
									</div>
								)}
								{product?.Free20DaysInsurance && (
									<div
										className={
											'd-flex align-items-center my-4'
										}
									>
										<div className="me-4">
											<svg
												width="72"
												height="72"
												viewBox="0 0 72 72"
												fill="none"
											>
												<g clipPath="url(#clip0_0_956)">
													<path
														d="M54.4801 7.97987L36.4801 0.10067C36.174 -0.0329057 35.8261 -0.0329057 35.5201 0.10067L17.52 7.97987C17.0829 8.17064 16.8003 8.60215 16.8 9.07907V27.9191C16.8066 32.1531 18.8411 36.1276 22.272 38.6087L34.7125 47.5811C35.4808 48.1372 36.5193 48.1372 37.2877 47.5811L49.7281 38.6099C53.159 36.1288 55.1936 32.1543 55.2001 27.9203V9.07907C55.1998 8.60215 54.9172 8.17064 54.4801 7.97987ZM52.8001 27.9203C52.7946 31.3834 51.1303 34.6342 48.3241 36.6635L36.0001 45.5519L23.676 36.6635C20.8698 34.6342 19.2055 31.3834 19.2 27.9203V9.86387L36.0001 2.51027L52.8001 9.86387V27.9203Z"
														fill="black"
													/>
													<path
														d="M35.5201 5.33993L22.3201 11.1191C21.883 11.3099 21.6003 11.7414 21.6001 12.2183V27.9203C21.6038 30.6127 22.8979 33.1402 25.0801 34.7171L35.2981 42.0875C35.7173 42.3899 36.2829 42.3899 36.7021 42.0875L46.9201 34.7171C49.1023 33.1402 50.3964 30.6127 50.4001 27.9203V12.2183C50.3998 11.7414 50.1172 11.3099 49.6801 11.1191L36.4801 5.33993C36.174 5.20635 35.8262 5.20635 35.5201 5.33993ZM48.0001 13.0019V27.9203C47.9964 29.8416 47.0729 31.6449 45.5161 32.7707L36.0001 39.6347L26.4841 32.7707C24.9273 31.6449 24.0038 29.8416 24.0001 27.9203V13.0019L36.0001 7.74953L48.0001 13.0019Z"
														fill="black"
													></path>
													<path
														d="M9.94207 39.8396L7.34647 33.7748C6.7945 32.5245 5.61739 31.6636 4.25856 31.5164C2.89974 31.3693 1.56562 31.9582 0.758765 33.0614C-0.0480894 34.1646 -0.205101 35.6145 0.346874 36.8648L5.04967 47.21C5.68413 48.6105 6.56675 49.8846 7.65487 50.9709L15.0505 58.3677C14.634 58.8091 14.4014 59.3927 14.4001 59.9997V69.5997C14.4001 70.9251 15.4746 71.9997 16.8001 71.9997H30.0001C31.3256 71.9997 32.4001 70.9251 32.4001 69.5997V59.9997C32.4001 58.6742 31.3256 57.5997 30.0001 57.5997V55.3665C30.0368 52.5245 29.1096 49.7538 27.3697 47.5064C26.3496 46.1647 24.9593 45.1507 23.3701 44.5892C20.8427 43.5274 18.5183 42.0357 16.5001 40.1804C14.6267 38.6375 11.9653 38.4992 9.94207 39.8396ZM30.0001 69.5997H16.8001V59.9997H30.0001V69.5997ZM25.4965 49.0053C26.8952 50.8276 27.6366 53.0695 27.6001 55.3665V57.5997H17.6773L9.35168 49.274C8.46743 48.3911 7.74992 47.3556 7.23367 46.2176L2.53087 35.8724C2.33018 35.4309 2.36753 34.9176 2.63004 34.5098C2.89255 34.102 3.34426 33.8554 3.82927 33.8552C4.40005 33.8548 4.91589 34.1954 5.13967 34.7204L7.82407 40.9808C8.5369 42.6511 9.56437 44.1687 10.8505 45.4508L16.3321 50.9336C16.6334 51.2456 17.0795 51.3707 17.4991 51.2609C17.9186 51.1511 18.2463 50.8234 18.3561 50.4039C18.4659 49.9843 18.3408 49.5381 18.0289 49.2368L12.5473 43.7541C11.9961 43.2042 11.5005 42.6013 11.0677 41.9541C12.2201 41.0673 13.8323 41.0941 14.9545 42.0188C17.1977 44.0775 19.7903 45.7193 22.6105 46.8668C23.7595 47.2847 24.7622 48.0277 25.4965 49.0053Z"
														fill="black"
													/>
													<path
														d="M26.4002 63.6001H25.2002C24.5375 63.6001 24.0002 64.1374 24.0002 64.8001C24.0002 65.4628 24.5375 66.0001 25.2002 66.0001H26.4002C27.063 66.0001 27.6002 65.4628 27.6002 64.8001C27.6002 64.1374 27.063 63.6001 26.4002 63.6001Z"
														fill="black"
													/>
													<path
														d="M66.9505 47.2102L71.6533 36.865C72.2316 35.6104 72.0885 34.1415 71.2791 33.0221C70.4696 31.9026 69.1195 31.3065 67.7469 31.4625C66.3744 31.6185 65.1925 32.5024 64.6549 33.775L62.0653 39.817C60.0351 38.4831 57.3723 38.6291 55.5001 40.177C53.4819 42.0322 51.1575 43.5239 48.6301 44.5858C47.0409 45.1472 45.6506 46.1613 44.6305 47.503C42.8898 49.7513 41.9625 52.5233 42.0001 55.3666V57.5998C40.6746 57.5998 39.6001 58.6743 39.6001 59.9998V69.5998C39.6001 70.9252 40.6746 71.9998 42.0001 71.9998H55.2001C56.5256 71.9998 57.6001 70.9252 57.6001 69.5998V59.9998C57.5988 59.3928 57.3662 58.8092 56.9497 58.3678L64.3453 50.971C65.4334 49.8848 66.3161 48.6106 66.9505 47.2102ZM55.2001 69.5998H42.0001V59.9998H55.2001V69.5998ZM54.3229 57.5998H44.4001V55.3666C44.3639 53.07 45.1052 50.8286 46.5037 49.0066C47.2363 48.0296 48.2368 47.2863 49.3837 46.867C52.2044 45.7197 54.7975 44.0779 57.0409 42.019C58.1619 41.0872 59.7786 41.0558 60.9349 41.9434C60.5009 42.5953 60.0028 43.2024 59.4481 43.7554L53.9665 49.2382C53.5117 49.709 53.5182 50.4575 53.9811 50.9203C54.444 51.3832 55.1925 51.3897 55.6633 50.935L61.1449 45.4522C62.431 44.17 63.4585 42.6524 64.1713 40.9822L66.8557 34.7206C67.0801 34.1962 67.5957 33.8562 68.1661 33.8566C68.6511 33.8567 69.1028 34.1033 69.3654 34.5111C69.6279 34.919 69.6652 35.4322 69.4645 35.8738L64.7617 46.219C64.2455 47.357 63.528 48.3924 62.6437 49.2754L54.3229 57.5998Z"
														fill="black"
													/>
													<path
														d="M46.7999 63.6001H45.5999C44.9372 63.6001 44.3999 64.1374 44.3999 64.8001C44.3999 65.4628 44.9372 66.0001 45.5999 66.0001H46.7999C47.4626 66.0001 47.9999 65.4628 47.9999 64.8001C47.9999 64.1374 47.4626 63.6001 46.7999 63.6001Z"
														fill="black"
													/>
													<path
														d="M29.5199 25.4401C28.9897 25.0424 28.2376 25.1499 27.8399 25.6801C27.4423 26.2103 27.5497 26.9624 28.0799 27.3601L32.8799 30.9601C33.0876 31.1158 33.3403 31.2001 33.5999 31.2001C33.6679 31.1998 33.7357 31.1942 33.8027 31.1833C34.1277 31.1275 34.4154 30.9404 34.5983 30.6661L44.1983 16.2661C44.4363 15.9094 44.4658 15.4528 44.2759 15.0684C44.086 14.684 43.7054 14.4301 43.2775 14.4024C42.8496 14.3747 42.4395 14.5774 42.2015 14.9341L33.3047 28.2793L29.5199 25.4401Z"
														fill="black"
													/>
												</g>
												<defs>
													<clipPath id="clip0_0_956">
														<rect
															width="72"
															height="72"
															fill="white"
														/>
													</clipPath>
												</defs>
											</svg>
										</div>
										<div className={styles.textOfIdealFor}>
											Free 20 days Insurance
										</div>
									</div>
								)}
							</div>
						) : null}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Product;

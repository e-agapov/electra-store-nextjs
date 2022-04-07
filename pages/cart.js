import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import styles from '../scss/pages/Cart.module.scss';
import ImageLoader from '../utils/imageLoader';
import productsData from '../data/products';
import Checkout from '../components/Checkout';

const isCurrent = (item, uri, color = false) => {
	if (item.uri === uri) {
		const currentColor = item?.color?.id ? item.color.id : item.color;
		if (color) {
			return currentColor !== color ? item : null;
		}

		return null;
	} else {
		return item;
	}
};

const Cart = () => {
	const [products, setProducts] = useState([]);
	const [goods, setGoods] = useState(0);
	const [isLoading, setLoading] = useState(true);
	const [totalCartPrice, setTotalCartPrice] = useState(0);
	const [isCheckout, setCheckout] = useState(false);

	useEffect(() => {
		if (isLoading) {
			const storage = localStorage.getItem('cart')
				? JSON.parse(localStorage.getItem('cart'))
				: [];

			storage?.filter((item) => {
				const data = productsData.find(
					(product) => product.uri === item.uri
				);

				const product = { ...data } || {};

				setGoods((prevState) => (prevState += item.count));

				product.image = data?.dataImages[0]?.src || null;

				if (item.color) {
					const productColor = product?.dataColors?.find(
						(color) => color.name === item.color
					);

					product.color = productColor;
					product.name = `${product.name} ${productColor?.name}`;
				}

				product.count = item?.count;
				product.totalPrice = item.totalPrice
					? item.totalPrice
					: product.price;

				setProducts((prevState) => [...prevState, product]);
			});
		}

		// set total price cart
		const totalPrice = products.reduce((acc, item) => {
			return acc + item.totalPrice;
		}, 0);

		setTotalCartPrice(totalPrice);

		setLoading(false);
	}, [isLoading, products]);

	const totalPriceCart = () => {
		let total = 0;

		products.map((item) => {
			total += item.totalPrice;
		});

		setTotalCartPrice(total);
	};

	function removeProduct(uri, color = false) {
		const storage = localStorage.getItem('cart')
			? JSON.parse(localStorage.getItem('cart'))
			: [];

		setProducts((prevState) =>
			prevState.filter((item) => isCurrent(item, uri, color.id))
		);

		const newStorage = storage.filter((item) =>
			isCurrent(item, uri, color.name)
		);

		localStorage.setItem('cart', JSON.stringify(newStorage));

		setGoods(false);
	}

	const addCount = (uri, color = false) => {
		const storage = localStorage.getItem('cart')
			? JSON.parse(localStorage.getItem('cart'))
			: [];

		const newStorage = JSON.stringify(
			storage.map((item) => {
				item.price = products.find(
					(product) => product.uri === item.uri
				)?.price;

				const newPrice = item.price * (item.count + 1);

				if (item.uri === uri) {
					if (color) {
						if (color.name === item?.color) {
							return {
								...item,
								count: item.count + 1,
								totalPrice: newPrice
							};
						}
					} else {
						return {
							...item,
							count: item.count + 1,
							totalPrice: newPrice
						};
					}
				}

				return item;
			})
		);

		setProducts((prevState) =>
			prevState.map((item) => {
				const newPrice = item.price * (item.count + 1);
				if (item.uri === uri) {
					if (color) {
						if (color.id === item?.color?.id) {
							return {
								...item,
								count: item.count + 1,
								totalPrice: newPrice
							};
						}
					} else {
						return {
							...item,
							count: item.count + 1,
							totalPrice: newPrice
						};
					}
				}

				return item;
			})
		);

		localStorage.setItem('cart', newStorage);

		setGoods((prevState) => (prevState += 1));
	};

	const removeCount = (uri, color = false) => {
		const storage = localStorage.getItem('cart')
			? JSON.parse(localStorage.getItem('cart'))
			: [];

		const newStorage = JSON.stringify(
			storage.map((item) => {
				item.price = products.find(
					(product) => product.uri === item.uri
				)?.price;

				const newPrice =
					item.price * (item.count != 1 ? item.count - 1 : 1);
				if (item.uri === uri && item.count > 1) {
					if (color) {
						if (color.name === item?.color) {
							return {
								...item,
								count: item.count - 1,
								totalPrice: newPrice
							};
						}
					} else {
						return {
							...item,
							count: item.count - 1,
							totalPrice: newPrice
						};
					}
				}

				return item;
			})
		);

		setProducts((prevState) =>
			prevState.map((item) => {
				const newPrice =
					item.price * (item.count != 1 ? item.count - 1 : 1);
				if (item.uri === uri && item.count > 1) {
					if (color) {
						if (color.id === item?.color?.id) {
							return {
								...item,
								count: item.count - 1,
								totalPrice: newPrice
							};
						}
					} else {
						return {
							...item,
							count: item.count - 1,
							totalPrice: newPrice
						};
					}
				}

				return item;
			})
		);

		localStorage.setItem('cart', newStorage);

		setGoods((prevState) =>
			goods > products.length ? (prevState -= 1) : prevState
		);
	};

	if (isLoading) {
		return (
			<Layout title="Products, Motorbikes – Electra" description="">
				<div className="cart-page">
					<div className="cart-page__loader">loading...</div>
				</div>
			</Layout>
		);
	}

	return (
		<Layout title="Products, Motorbikes – Electra" description="">
			{isCheckout ? (
				<Checkout totalPrice={totalCartPrice} />
			) : (
				<div className="container my-3 my-lg-5">
					<div className={styles.headline}>Shopping cart</div>

					{products ? (
						<div className={styles.cartList}>
							{products?.map((product, index) => (
								<div key={index} className={styles.cartItem}>
									<div
										className={`${styles.mobileInfo} d-block d-md-none`}
									>
										<div className={styles.mobileImage}>
											<Image
												loader={ImageLoader}
												src={
													product?.image ||
													'_loading.gif'
												}
												alt={`product ${product.name}`}
												layout="fill"
												className={styles.image}
											/>
										</div>
										<div className={styles.mobileName}>
											{product?.name}
										</div>
										<div className={styles.mobilePrice}>
											{product?.totalPrice} $
										</div>
									</div>
									<div
										className={`${styles.cartItemImg} d-none d-md-block`}
									>
										<Image
											loader={ImageLoader}
											src={
												product?.image || '_loading.gif'
											}
											alt={`product ${product.name}`}
											width="210"
											height="210"
										/>
									</div>

									<div
										className={
											'align-self-center align-self-md-start'
										}
									>
										<div
											className={`${styles.cartItemName} d-none d-md-block`}
										>
											{product?.name}
										</div>

										{product?.color && (
											<div
												className={`${styles.cartItemColor}`}
											>
												<div
													className={
														styles.nameOfColumn
													}
												>
													Color
												</div>
												<div
													className={styles.color}
													style={{
														background:
															product?.color?.code
													}}
												></div>
											</div>
										)}
									</div>

									<div
										className={`${styles.quantity} mx-md-auto`}
									>
										<button
											onClick={() =>
												removeCount(
													product.uri,
													product?.color
												)
											}
											className={styles.actionBtn}
										>
											-
										</button>
										<div>{product?.count}</div>
										<button
											onClick={() =>
												addCount(
													product.uri,
													product?.color
												)
											}
											className={styles.actionBtn}
										>
											+
										</button>
									</div>
									<div
										className={`${styles.price} d-none d-md-block align-self-center`}
									>
										{product.totalPrice} $
									</div>

									<div className={styles.remove}>
										<button
											onClick={() =>
												removeProduct(
													product.uri,
													product?.color || false
												)
											}
											className={styles.actionBtn}
										>
											<svg
												width="20"
												height="20"
												viewBox="0 0 20 20"
												fill="none"
											>
												<line
													x1="0"
													y1="0"
													x2="20"
													y2="20"
													stroke="#6f6f6f"
												/>
												<line
													x1="0"
													y1="20"
													x2="20"
													y2="0"
													stroke="#6f6f6f"
												/>
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
						{goods !== 0 && (
							<div className={styles.goods}>Goods {goods}</div>
						)}
						<div className={styles.subtotal}>Total</div>
						<div className={styles.totalPrice}>
							{totalCartPrice} $
						</div>

						{totalCartPrice !== 0 && (
							<div className={styles.checkoutBlock}>
								<div className={styles.moreInfoText}>
									Shipping & taxes are calculated at check out
								</div>
								<div className={'mt-5'}>
									<a
										onClick={() =>
											setCheckout(
												(prevState) => !prevState
											)
										}
										className={styles.checkoutBtn}
									>
										Check out
									</a>
								</div>
							</div>
						)}
					</div>
				</div>
			)}
		</Layout>
	);
};

export default Cart;

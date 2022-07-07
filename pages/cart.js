import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Checkout from '../components/Checkout';
import Layout from '../components/Layout';
import styles from '../scss/pages/Cart.module.scss';
import { imageLoader } from '../utils/imageLoader';

const Cart = () => {
	const [products, setProducts] = useState([]);
	const [dataIsLoaded, setDataIsLoaded] = useState(false);
	const [goods, setGoods] = useState(0);
	const [isLoading, setLoading] = useState(true);
	const [totalCartPrice, setTotalCartPrice] = useState(0);
	const [isCheckout, setCheckout] = useState(false);

	useEffect(() => {
		setLoading(true);

		const getStorage = getStorageItems();
		let data = [];

		if (
			!products.length &&
			getStorage.length &&
			!dataIsLoaded &&
			!data.length
		) {
			getStorage.map(async (item) => {
				data = await axios
					.get(`/api/products/${item?.uri}&color=${item?.color}`)
					.then((res) => [
						{
							...res.data,
							count: item?.count,
							colorHex: res.data.colors
								? res.data.colors.filter((color) =>
										color.name === res.data.color
											? color.hex
											: null
								  )[0].hex
								: ''
						},
						...data
					]);

				setProducts(data);
			});

			setDataIsLoaded(true);
		}

		setTotalCartPrice(totalAcc(products, 'price'));
		setGoods(totalAcc(products, 'count'));

		setLoading(false);
	}, [dataIsLoaded, products]);

	const updateCount = (uri, color, method, count) => {
		let newList = [...products];

		if (method === 'destroy') {
			count = 0;
			newList = products.filter(
				(item) =>
					item.uri !== uri ||
					(item.uri === uri && item.color !== color)
			);
		} else {
			newList = products.map((item) => {
				item.uri === uri &&
					color &&
					item.color === color &&
					(count =
						method === 'add'
							? (item.count += 1)
							: (item.count -= 1));

				return item;
			});
		}

		setProducts(newList);
		updateStorageItems(uri, 'count', count, color);
	};

	if (isLoading) {
		return (
			<Layout title="Products – Electra" description="">
				<div className="cart-page">
					<div className="cart-page__loader">loading...</div>
				</div>
			</Layout>
		);
	}

	return (
		<Layout title="Cart – Electra" description="">
			{isCheckout ? (
				<div className="mx-auto col-lg-6">
					<Checkout totalPrice={totalCartPrice} />
				</div>
			) : (
				<div className="container my-3 my-lg-5">
					<div className={styles.headline}>Shopping cart</div>

					{products ? (
						<div className={styles.cartList}>
							{products?.map((product, index) => (
								<div key={index} className={styles.cartItem}>
									{product?.image && (
										<div
											className={`${styles.mobileInfo} d-block d-md-none`}
										>
											<div className={styles.mobileImage}>
												<Image
													loader={imageLoader}
													src={product?.image}
													alt={`product ${product?.name}`}
													layout="fill"
													className={styles.image}
												/>
											</div>
											<div className={styles.mobileName}>
												{product?.name}
											</div>
											<div className={styles.mobilePrice}>
												{product?.price} $
											</div>
										</div>
									)}
									{product?.image && (
										<div
											className={`${styles.cartItemImg} d-none d-md-block`}
										>
											<Image
												loader={imageLoader}
												src={product?.image}
												alt={`product ${product?.name}`}
												width="210"
												height="210"
											/>
										</div>
									)}

									<div
										className={
											'align-self-center align-self-md-start ms-3'
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
															product?.colorHex
													}}
												></div>
											</div>
										)}
									</div>

									<div
										className={`${styles.quantity} mx-auto `}
									>
										{product?.count > 1 && (
											<button
												onClick={() =>
													updateCount(
														product.uri,
														product?.color,
														'remove'
													)
												}
												className={styles.actionBtn}
											>
												-
											</button>
										)}
										<div>{product?.count}</div>
										<button
											onClick={() =>
												updateCount(
													product.uri,
													product?.color,
													'add'
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
										{product?.price} $
									</div>

									<div className={styles.remove}>
										<button
											onClick={() =>
												updateCount(
													product.uri,
													product?.color,
													'destroy'
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

const getStorageItems = () => JSON.parse(localStorage.getItem('cart')) || [];
const updateStorageItems = (uri, key, value, color = false) => {
	const items = getStorageItems();

	let newList = items.map((item) => {
		if (item.uri === uri && (color ? item.color === color : true)) {
			item[key] = value;
		}

		return item;
	});

	newList = newList.filter((item) => item.count > 0);

	localStorage.setItem('cart', JSON.stringify(newList));
};

const totalAcc = (products, whatIsAcc) =>
	products.reduce(
		(acc, item) =>
			acc +
			(whatIsAcc !== 'count'
				? item[whatIsAcc] * item.count
				: +item.count),
		0
	);

export default Cart;

import Image from 'next/image';
import Layout from '../components/Layout';
import styles from '../scss/pages/Cart.module.scss';
import ImageLoader from '../utils/imageLoader';

const Cart = () => {
	return (
		<Layout title="Products, Motorbikes – Electra" description="">
			<div className="container my-3 my-lg-5">
				<div className={styles.headline}>Shopping cart</div>

				<div className={styles.cartList}>
					<div className={styles.cartItem}>
						<div className={styles.cartItemImg}>
							{/* <Image
								loader={ImageLoader}
								src={product.image}
								alt="product"
							/> */}

							<div className={styles.cartItemName}></div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Cart;

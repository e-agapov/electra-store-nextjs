import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ImgTemplate from '../data/images/bikes/bike.png';
import styles from '../scss/components/TransportList.module.scss';

const TransportList = ({ linksCatalog }) => {
	const router = useRouter();

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

			{/* {dataList.length ? (
				<div className={styles.productsListWrapper}>
					{dataList.map((dataItem) => (
			<Link href={'#'}>
				<a className={styles.productItem}>
					<div className={styles.isWaterproof}>waterproof</div>
					<div className={styles.image}>
						<Image alt="" src={ImgTemplate} />
					</div>
					<div className={styles.nameOfProduct}>{'name'}</div>
					<div className={styles.priceOfProduct}>3000 $</div>
				</a>
			</Link>
						<div key={dataItem.id}>
							<Image alt="" layout="fill" src={dataItem.img} />
							<div>{dataItem.name}</div>
						</div>
					))}
				</div>
			) : (
				<div className={styles.listIsEmpty}>List is empty</div>
			)} */}

			<div className={styles.productsListWrapper}>
				<Link href={'#'}>
					<a className={styles.productItem}>
						<div className={styles.isWaterproof}>waterproof</div>
						<div className={styles.image}>
							<Image alt="" src={ImgTemplate} />
						</div>
						<div className={styles.nameOfProduct}>{'name'}</div>
						<div className={styles.priceOfProduct}>3000 $</div>
					</a>
				</Link>
			</div>
		</div>
	);
};

export default TransportList;

import Image from 'next/image';
import Link from 'next/link';
import BikesImage from '../../assets/images/index/transport-section/Bikes.png';
import MotorbikesImage from '../../assets/images/index/transport-section/Motorbikes.png';
import ScootersImage from '../../assets/images/index/transport-section/Scooters.png';
import ArrowToRight from '../../components/ui/ArrowToRight';
import styles from '../../scss/components/sections/transport.module.scss';

const TransportSection = () => {
	return (
		<section
			className={`${styles.transportSection} d-flex flex-column flex-lg-row justify-content-between`}
		>
			<div className={`${styles.link} px-3 px-lg-5`}>
				<Link href={'/'}>
					<a className={styles.linkTag}>
						<div className={styles.imageLink}>
							<Image alt={'scooters link'} src={ScootersImage} />
							<ArrowToRight styles={styles.ArrowToRight} />
						</div>
						<div className={styles.linkTitle}>Scooters</div>
						<div className={styles.description}>
							We gethered differend kinds of scooters. Everyone
							can find a scooter for themselves.
						</div>
					</a>
				</Link>
			</div>
			<div className={`${styles.link} mt-3 mt-lg-0 px-3 px-lg-5`}>
				<Link href={'/'}>
					<a className={styles.linkTag}>
						<div className={styles.imageLink}>
							<Image alt={'bikes link'} src={BikesImage} />
						</div>
						<ArrowToRight styles={styles.ArrowToRight} />

						<div className={styles.linkTitle}>Bikes</div>
						<div className={styles.description}>
							We gethered differend kinds of scooters. Everyone
							can find a scooter for themselves.
						</div>
					</a>
				</Link>
			</div>
			<div className={`${styles.link} mt-3 mt-lg-0 px-3 px-lg-5`}>
				<Link href={'/'}>
					<a className={styles.linkTag}>
						<div className={styles.imageLink}>
							<Image
								alt={'motorbikes link'}
								src={MotorbikesImage}
							/>
							<ArrowToRight styles={styles.ArrowToRight} />
						</div>

						<div className={styles.linkTitle}>Motorbikes</div>
						<div className={styles.description}>
							We gethered differend kinds of scooters. Everyone
							can find a scooter for themselves.
						</div>
					</a>
				</Link>
			</div>
		</section>
	);
};

export default TransportSection;

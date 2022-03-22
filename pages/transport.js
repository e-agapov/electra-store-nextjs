import Image from 'next/image';
import HeaderMobileImage from '../assets/images/transport/headline-mobile.png';
import HeaderImage from '../assets/images/transport/headline.png';
import HelmetImage from '../assets/images/transport/Helmet-Black.jpg';
import Layout from '../components/Layout';
import SectionBlock from '../components/SectionBlock';
import TransportSection from '../components/sections/TransportSection';
import styles from '../scss/pages/Transport.module.scss';

export default function Transport() {
	const textForColumn = `We gethered differend kinds of scooters. Everyone can find a scooter for themselves.WeWe gethered differend kinds of scooters. Everyone can find a scooter for themselves.We gethered differend kinds of scooters. Everyone can find a scooter for themselves. gethered differend kinds of scooters. Everyone can find a scooter for themselves.We gethered differend kinds of scooters. Everyone can find a scooter for themselves.We gethered differend kinds of scooters. Everyone can find a scooter for themselves.`;

	return (
		<Layout title="Transport – Electra" description="">
			<section className={`d-none d-sm-block`}>
				<Image src={HeaderImage} alt="" priority />
			</section>

			<section className={`d-block d-sm-none ${styles.mobileHeaderPic}`}>
				<Image src={HeaderMobileImage} alt="" priority />
			</section>

			<div className="container">
				<TransportSection />

				<SectionBlock
					title={'Accessories'}
					imagePosition={'right'}
					imgSrc={HelmetImage}
					textForColumn={textForColumn}
					link={'/accessories'}
					linkName={'Accessories'}
				/>
			</div>
		</Layout>
	);
}

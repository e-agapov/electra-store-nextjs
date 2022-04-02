import Image from 'next/image';
import HeaderMobileImage from '../assets/images/transport/headline-mobile.png';
import HeaderImage from '../assets/images/transport/headline.png';
import HelmetImage from '../assets/images/transport/Helmet-Black.jpg';
import Layout from '../components/Layout';
import SectionBlock from '../components/SectionBlock';
import TransportSection from '../components/sections/TransportSection';
import styles from '../scss/pages/Transport.module.scss';

export default function Transport() {
	const texts = {
		main: 'We gettered different kinds of scooters. Everyone can find a scooter for themselves. WeWe gettered different kinds of scooters. Everyone can find a scooter for themselves.We gettered different kinds of scooters.'
	};

	return (
		<Layout title="Transport – Electra" description="">
			<section className={`d-none d-sm-block headerImage`}>
				<Image src={HeaderImage} alt="" priority />
			</section>

			<section
				className={`d-block d-sm-none headerImage ${styles.mobileHeaderPic}`}
			>
				<Image src={HeaderMobileImage} alt="" priority />
			</section>

			<div className="container">
				<TransportSection />

				<SectionBlock
					title={'Accessories'}
					imagePosition={'right'}
					imgSrc={HelmetImage}
					textForColumn={texts.main}
					link={'/accessories'}
					linkName={'Accessories'}
				/>
			</div>
		</Layout>
	);
}

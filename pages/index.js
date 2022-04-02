import Image from 'next/image';
import MenOnScooterImage from '../assets/images/index/menOnScooter.png';
import MenOnBikesImage from '../assets/images/index/mensOnBikes.png';
import HeaderImageMobile from '../assets/images/mainMobilePageHeaderImg.png';
import HeaderImage from '../assets/images/mainPageHeaderImg.png';
import FAQComponent from '../components/FAQComponent';
import Layout from '../components/Layout';
import SectionBlock from '../components/SectionBlock';
import TransportSection from '../components/sections/TransportSection';
import styles from '../scss/pages/Home.module.scss';

export default function Home() {
	const texts = {
		left: 'We gettered different kinds of scooters. Everyone scooter for themselves.WeWe gettered different kinds of scooters. Everyone can find a scooter for themselves.',

		right: 'We gettered different kinds of scooters. Everyone scooter for themselves.WeWe gettered different kinds of scooters. Everyone can find a scooter for themselves.'
	};

	return (
		<Layout title="Electra Store" description="Internet store">
			<section className={`d-none d-sm-block headerImage`}>
				<Image src={HeaderImage} alt="" priority />
			</section>

			<section
				className={`d-block d-sm-none headerImage ${styles.mobileHeaderImage}`}
			>
				<Image src={HeaderImageMobile} alt="" priority />
			</section>

			<div className="container">
				<TransportSection />

				<SectionBlock
					title={'Electra Transport'}
					imagePosition={'right'}
					imgSrc={MenOnScooterImage}
					textForColumn={texts.left}
					link={'/transport'}
					linkName={'Transport'}
				/>

				<SectionBlock
					title={'We solve traffic problems'}
					imgSrc={MenOnBikesImage}
					textForColumn={texts.right}
					link={'/transport'}
					linkName={'Transport'}
				/>

				<FAQComponent classes={styles.faq} />
			</div>
		</Layout>
	);
}

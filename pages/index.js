import Image from 'next/image';
import headerPicMobile from '../assets/images/mainMobilePageHeaderImg.png';
import headerPic from '../assets/images/mainPageHeaderImg.png';
import CollapseGroup from '../components/CollapseGroup';
import Layout from '../components/Layout';
import SectionBlock from '../components/SectionBlock';
import TransportSection from '../components/sections/TransportSection';
import FAQData from '../data/faq.js';
import styles from '../scss/pages/Home.module.scss';
import MenOnBikesImage from '../assets/images/index/mensOnBikes.png';
import MenOnScooterImage from '../assets/images/index/menOnScooter.png';

export default function Home() {
	const textRightColumn = `We gethered differend kinds of scooters. Everyone
					scooter for themselves.WeWe gethered differend kinds of
					scooters. Everyone can find a scooter for themselves.We
					gethered differend kinds of scooters. Everyone can find a
					scooter for themselves. gethered differend kinds of
					scooters. Everyone can find a scooter for themselves.We
					gethered differend kinds of scooters. Everyone can find a
					scooter for themselves.We gethered differend kinds of
					scooters. Everyone can find a scooter for themselves.
					`;
	const textLeftColumn = `We gethered differend kinds of scooters. Everyone
					scooter for themselves.WeWe gethered differend kinds of
					scooters. Everyone can find a scooter for themselves.We
					gethered differend kinds of scooters. Everyone can find a
					scooter for themselves. gethered differend kinds of
					scooters. Everyone can find a scooter for themselves.We
					gethered differend kinds of scooters. Everyone can find a
					scooter for themselves.We gethered differend kinds of
					scooters. Everyone can find a scooter for themselves.
					`;
	return (
		<Layout home={true} title="Electra Store" description="Internet store">
			<section className={`d-none d-sm-block`}>
				<Image src={headerPic} alt="" priority />
			</section>

			<section className={`d-block d-sm-none ${styles.mobileHeaderPic}`}>
				<Image src={headerPicMobile} alt="" priority />
			</section>

			<div className="container">
				<TransportSection />

				<SectionBlock
					title={'Electra Transport'}
					imagePosition={'right'}
					imgSrc={MenOnScooterImage}
					textForColumn={textLeftColumn}
					link={'/transport'}
					linkName={'Transport'}
				/>

				<SectionBlock
					title={'We solve traffic problems'}
					imgSrc={MenOnBikesImage}
					textForColumn={textRightColumn}
					link={'/transport'}
					linkName={'Transport'}
				/>

				<CollapseGroup
					title={'FAQ'}
					classes={styles.faq}
					data={FAQData}
				/>
			</div>
		</Layout>
	);
}

import Image from 'next/image';
import MenOnScooterImage from '../assets/images/index/menOnScooter.png';
import MenOnBikesImage from '../assets/images/index/mensOnBikes.png';
import headerPicMobile from '../assets/images/mainMobilePageHeaderImg.png';
import headerPic from '../assets/images/mainPageHeaderImg.png';
import ArrowBtn from '../components/ArrowLink';
import CollapseGroup from '../components/CollapseGroup';
import Layout from '../components/Layout';
import TransportSection from '../components/sections/TransportSection';
import styles from '../scss/pages/Home.module.scss';
import FAQData from '../data/faq.js';

export default function Home() {
	return (
		<Layout home={true} title="Electra Store" description="Internet store">
			<section className={`d-none d-sm-block mt-5`}>
				<Image src={headerPic} alt="" priority />
			</section>

			<section
				className={`d-block d-sm-none mt-5 ${styles.mobileHeaderPic}`}
			>
				<Image src={headerPicMobile} alt="" priority />
			</section>

			<div className="container">
				<TransportSection />

				<section className="d-flex flex-column flex-lg-row px-3 px-lg-5">
					<div className="col-lg-6 pe-lg-5">
						<div className={styles.headlineForColumn}>
							Electra <br /> Transport
						</div>
						<div className={styles.textForColumn}>
							We gethered differend kinds of scooters. Everyone
							can find a scooter for themselves.WeWe gethered
							differend kinds of scooters. Everyone can find a
							scooter for themselves.We gethered differend kinds
							of scooters. Everyone can find a scooter for
							themselves. gethered differend kinds of scooters.
							Everyone can find a scooter for themselves.We
							gethered differend kinds of scooters. Everyone can
							find a scooter for themselves.We gethered differend
							kinds of scooters. Everyone can find a scooter for
							themselves.
						</div>

						<div className={'my-4'}>
							<ArrowBtn href={'/'} name={'Transport'} />
						</div>
					</div>
					<div className="col-lg-6 d-none d-lg-block">
						<div className="d-flex flex-column justify-content-end">
							<Image alt="" src={MenOnScooterImage} />
						</div>
					</div>
				</section>

				<section className="d-flex flex-column flex-lg-row px-3 px-lg-5">
					<div className="col-lg-6 mt-4 mb-5 my-lg-0">
						<Image alt="" src={MenOnBikesImage} />
					</div>
					<div className="col-lg-6 ps-lg-5 pt-4">
						<div className={styles.headlineForColumn}>
							Electra <br /> Transport
						</div>
						<div className={styles.textForColumn}>
							We gethered differend kinds of scooters. Everyone
							can find a scooter for themselves.WeWe gethered
							differend kinds of scooters. Everyone can find a
							scooter for themselves.We gethered differend kinds
							of scooters. Everyone can find a scooter for
							themselves. gethered differend kinds of scooters.
							Everyone can find a scooter for themselves.We
							gethered differend kinds of scooters. Everyone can
							find a scooter for themselves.We gethered differend
							kinds of scooters. Everyone can find a scooter for
							themselves.
						</div>

						<div className={'my-4'}>
							<ArrowBtn href={'/'} name={'Transport'} />
						</div>
					</div>
				</section>

				<CollapseGroup
					title={'FAQ'}
					classes={styles.faq}
					data={FAQData}
				/>
			</div>
		</Layout>
	);
}

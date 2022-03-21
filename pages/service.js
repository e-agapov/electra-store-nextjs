import Image from 'next/image';
import carbonFibersImage from '../assets/images/service/carbon-fibers.jpg';
import HeaderImage from '../assets/images/service/header.png';
import scooterImage from '../assets/images/service/scooter.jpg';
import ImgWithManAndScooter from '../assets/images/transport/headline.png';
import Layout from '../components/Layout';
import SectionBlock from '../components/SectionBlock';
import styles from '../scss/pages/Service.module.scss';

export default function Transport() {
	const textForColumn = `We gethered differend kinds of scooters. Everyone can find a scooter for themselves.WeWe gethered differend kinds of scooters. Everyone can find a scooter for themselves.We gethered differend kinds of scooters. Everyone can find a scooter for themselves. gethered differend kinds of scooters. Everyone can find a scooter for themselves.We gethered differend kinds of scooters. Everyone can find a scooter for themselves.We gethered differend kinds of scooters. Everyone can find a scooter for themselves.`;

	const divSection = (
		<>
			<div className="d-flex flex-column flex-lg-row">
				<div className="col-lg-4 px-3">
					<div className={`${styles.decimal} mx-auto mx-lg-0`}>1</div>
					<div className={`${styles.text} mt-3`}>
						We gethered differend kinds of scooters. Everyone can
						find a scooter for themselves.
					</div>
				</div>
				<div className="col-lg-4 mt-5 mt-lg-0 px-3">
					<div className={`${styles.decimal} mx-auto mx-lg-0`}>2</div>
					<div className={`${styles.text} mt-3`}>
						We gethered differend kinds of scooters. Everyone can
						find a scooter for themselves.
					</div>
				</div>
				<div className="col-lg-4 mt-5 mt-lg-0 px-3">
					<div className={`${styles.decimal} mx-auto mx-lg-0`}>3</div>
					<div className={`${styles.text} mt-3`}>
						We gethered differend kinds of scooters.
					</div>
				</div>
			</div>
		</>
	);

	return (
		<Layout home={true} title="Electra Store" description="Internet store">
			<section className={`py-5 px-4 px-md-5 ${styles.headerImage}`}>
				<Image src={HeaderImage} alt="" priority />
			</section>

			<div className="container">
				<SectionBlock
					classes={styles.textSectionWithText}
					title={'We provide service for every client'}
					imgSrc={carbonFibersImage}
					textForColumn={textForColumn}
					link={'/accessories'}
					linkName={'Accessories'}
				/>
			</div>

			<Image src={ImgWithManAndScooter} alt="" />

			<SectionBlock
				classes={styles.textSectionWithText}
				title={'WE ARE HAPPY TO HELP YOU WITH:'}
				imgSrc={scooterImage}
				textForColumn={divSection}
				colWidthText={7}
			/>

			<div className="container">
				<SectionBlock
					classes={styles.textSectionWithText}
					title={'Difficulties you can face with'}
					textForColumn={textForColumn}
					link={'/news'}
					linkName={'More News'}
				/>
			</div>
		</Layout>
	);
}
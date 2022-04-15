import Image from 'next/image';
import carbonFibersImage from '../assets/images/service/carbon-fibers.jpg';
import HeaderImage from '../assets/images/service/header.png';
import scooterImage from '../assets/images/service/scooter.jpg';
import ImgWithManAndScooter from '../assets/images/transport/headline.png';
import Layout from '../components/Layout';
import SectionBlock from '../components/SectionBlock';
import styles from '../scss/pages/Service.module.scss';

export default function Service() {
	const texts = {
		main: `Every client and his peace of mind is important to us. That is why we provide our service for the maintenance and repair of your electric transport. For your convenience, our services are located near the showrooms, you can always ask for help from our team of craftsmen. We employ only certified masters with experience in the repair and maintenance of electric vehicles.`,

		second: ``
	};

	// const divSection = (
	// 	<div className="d-flex flex-column flex-lg-row">
	// 		<div className="col-lg-4 px-3">
	// 			<div className={`${styles.decimal} mx-auto mx-sm-0`}>1</div>
	// 			<div className={`${styles.text} mt-3`}>
	// 				We gethered differend kinds of scooters. Everyone can find a
	// 				scooter for themselves.
	// 			</div>
	// 		</div>
	// 		<div className="col-lg-4 mt-5 mt-lg-0 px-3">
	// 			<div className={`${styles.decimal} mx-auto mx-sm-0`}>2</div>
	// 			<div className={`${styles.text} mt-3`}>
	// 				We gethered differend kinds of scooters. Everyone can find a
	// 				scooter for themselves.
	// 			</div>
	// 		</div>
	// 		<div className="col-lg-4 mt-5 mt-lg-0 px-3">
	// 			<div className={`${styles.decimal} mx-auto mx-sm-0`}>3</div>
	// 			<div className={`${styles.text} mt-3`}>
	// 				We gethered differend kinds of scooters.
	// 			</div>
	// 		</div>
	// 	</div>
	// );

	return (
		<Layout title="Service – Electra" description="Internet store">
			<section
				className={`py-5 px-4 px-md-5 headerImage ${styles.headerImage}`}
			>
				<Image src={HeaderImage} alt="" priority />
			</section>

			<div className="container">
				<SectionBlock
					classes={styles.textSectionWithText}
					title={'We provide service for every client'}
					imgSrc={carbonFibersImage}
					textForColumn={texts.main}
					link={'/accessories'}
					linkName={'Accessories'}
				/>
			</div>

			<Image src={ImgWithManAndScooter} alt="" />

			{/* <SectionBlock
				classes={styles.textSectionWithText}
				title={'WE ARE HAPPY TO HELP YOU WITH:'}
				imgSrc={scooterImage}
				textForColumn={divSection}
				colWidthText={7}
			/> */}

			<div className="container">
				<SectionBlock
					classes={styles.textSectionWithText}
					title={'Check our news'}
					textForColumn={texts.second}
					link={'/news'}
					linkName={'More News'}
				/>
			</div>
		</Layout>
	);
}

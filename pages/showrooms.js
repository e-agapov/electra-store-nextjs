import Image from 'next/image';
import HeaderImage from '../assets/images/showrooms/header.png';
import SectionBlockImage from '../assets/images/showrooms/section-block-image.jpg';
import CollapseGroup from '../components/CollapseGroup';
import Layout from '../components/Layout';
import SectionBlock from '../components/SectionBlock';
import locationsData from '../data/locations';
import styles from '../scss/pages/Showrooms.module.scss';

export default function Showrooms() {
	const textForColumn = `We gethered differend kinds of scooters. Everyone can find a scooter for themselves.WeWe gethered differend kinds of scooters. Everyone can find a scooter for themselves.We gethered differend kinds of scooters. Everyone can find a scooter for themselves. gethered differend kinds of scooters. Everyone can find a scooter for themselves.We gethered differend kinds of scooters. Everyone can find a scooter for themselves.We gethered differend kinds of scooters. Everyone can find a scooter for themselves.`;

	return (
		<Layout title="Showrooms - Electra" description="">
			<section className={`py-5 px-4 px-md-5 headerImage`}>
				<Image src={HeaderImage} alt="" priority />
			</section>

			<div className="container">
				<SectionBlock
					classes={styles.textSectionWithText}
					title={'Showrooms all over the world'}
					imagePosition={'right'}
					imgSrc={SectionBlockImage}
					textForColumn={textForColumn}
					link={'/accessories'}
					linkName={'Accessories'}
				/>

				<CollapseGroup
					title={'Locations'}
					classes={styles.locations}
					data={locationsData}
				/>
			</div>
		</Layout>
	);
}

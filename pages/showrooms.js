import Image from 'next/image';
import HeaderImage from '../assets/images/showrooms/header.png';
import SectionBlockImage from '../assets/images/showrooms/section-block-image.jpg';
import CollapseGroup from '../components/CollapseGroup';
import Layout from '../components/Layout';
import SectionBlock from '../components/SectionBlock';
import locationsData from '../data/locations';
import styles from '../scss/pages/Showrooms.module.scss';

export default function Showrooms() {
	const texts = {
		main: `We gettered different kinds of scooters. Everyone can find a scooter for themselves. WeWe gettered different kinds of scooters. Everyone can find a scooter for themselves.We gettered different kinds of scooters. Everyone can find a scooter for themselves. gettered different kinds of scooters.`
	};

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
					textForColumn={texts.main}
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

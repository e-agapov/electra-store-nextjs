import Image from 'next/image';
import HeaderImage from '../assets/images/showrooms/header.png';
import SectionBlockImage from '../assets/images/showrooms/section-block-image.jpg';
import CollapseGroup from '../components/CollapseGroup';
import Layout from '../components/Layout';
import SectionBlock from '../components/SectionBlock';
import locationsData from '../data/locations';
import styles from '../scss/pages/Showrooms.module.scss';
import ComingSoon from '../components/ComingSoon';

export default function Showrooms() {
	return (
		<Layout title="Showrooms – Electra" description="Internet store">
			<ComingSoon />
		</Layout>
	);
	const texts = {
		main: `We have showrooms all over Europe, you can always come to our store and choose your transport and accessories to your liking. A large selection will help you find everything you need for comfortable movement through the streets of your city.`
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

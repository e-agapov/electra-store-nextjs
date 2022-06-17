import Image from 'next/image';
import HeaderImage from '../assets/images/showrooms/header.png';
import SectionBlockImage from '../assets/images/showrooms/section-block-image.jpg';
import CollapseGroup from '../components/CollapseGroup';
import Layout from '../components/Layout';
import SectionBlock from '../components/SectionBlock';
import styles from '../scss/pages/Showrooms.module.scss';
import ComingSoon from '../components/ComingSoon';
import { useEffect, useState } from 'react';

export default function Showrooms() {
	const [locations, setLocations] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);

		fetch('api/locations')
			.then((res) => res.json())
			.then((data) => {
				setLocations(data);
				setLoading(false);
			});

		return () => {
			setLocations([]);
			setLoading(false);
		};
	}, []);

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

				{loading ? (
					<div className="text-center">
						<div className="spinner-border" role="status">
							<span className="sr-only">Loading...</span>
						</div>
					</div>
				) : (
					<CollapseGroup
						title={'Locations'}
						classes={styles.locations}
						data={locations}
					/>
				)}
			</div>
		</Layout>
	);
}

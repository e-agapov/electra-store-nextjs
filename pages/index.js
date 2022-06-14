import Image from 'next/image';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import MenOnScooterImage from '../assets/images/index/menOnScooter.png';
import MenOnBikesImage from '../assets/images/index/mensOnBikes.png';
import HeaderImage from '../assets/images/mainPageHeaderImg.png';
import FAQComponent from '../components/FAQComponent';
import Layout from '../components/Layout';
import SectionBlock from '../components/SectionBlock';
import TransportSection from '../components/sections/TransportSection';
import styles from '../scss/pages/Home.module.scss';

export default function Home() {
	const texts = {
		left: `Electric transport is a great opportunity to quickly get to almost any point at a distance of 20–50 km, depending on the type and model. It develops at high speed and is very mobile, which makes it an ideal city transport.
		In the city, an electric bike or scooter is quite capable of competing with a car in terms of speed, but it is much more environmentally friendly.
		Compared to gasoline counterparts, vehicles powered by electricity are much cheaper to maintain: electricity, unlike gasoline, is inexpensive.`,

		right: `Let's talk about transport in a smaller way, for example, electric scooters belong to the transport of the last mile: with their help, city residents can move over short distances. Such transport saves not only time, but also parking spaces. In addition, small electric transport avoids traffic jams and makes it possible to go where conventional transport cannot.
		Their life cycle is quite long, and they will last for a relatively long time, even if one of the parts is outdated or broken. The thing is that many parts in a scooter can be replaced, just like in a regular bike.`
	};

	return (
		<Layout title="Electra Store" description="Internet store">
			<Swiper
				rewind={true}
				navigation={true}
				pagination={true}
				modules={[Navigation, Pagination]}
			>
				<SwiperSlide>
					<Image src={HeaderImage} alt="" priority />
				</SwiperSlide>
				<SwiperSlide>
					<Image src={HeaderImage} alt="" priority />
				</SwiperSlide>
				<SwiperSlide>
					<Image src={HeaderImage} alt="" priority />
				</SwiperSlide>
				<SwiperSlide>
					<Image src={HeaderImage} alt="" priority />
				</SwiperSlide>
			</Swiper>

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

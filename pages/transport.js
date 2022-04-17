import Image from 'next/image';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import HeaderImage from '../assets/images/transport/headline.png';
import HelmetImage from '../assets/images/transport/Helmet-Black.jpg';
import Layout from '../components/Layout';
import SectionBlock from '../components/SectionBlock';
import TransportSection from '../components/sections/TransportSection';

export default function Transport() {
	const texts = {
		main: `We have a variety of accessories for electric vehicles in our store. Here you can purchase both accessories for ease of use, as well as equipment. Gloves, helmets, knee pads. All protection is very important when driving on the roads.

		No person is immune from falling off a scooter or bicycle, even if not through their own fault. For example, drivers sometimes do not look too carefully into the mirrors when opening the doors, and can open it right in front of the nose of a passing cyclist. Good equipment will protect you from injury, which can save your life.`
	};

	return (
		<Layout title="Transport – Electra" description="">
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
					title={'Accessories'}
					imagePosition={'right'}
					imgSrc={HelmetImage}
					textForColumn={texts.main}
					link={'/accessories'}
					linkName={'Accessories'}
				/>
			</div>
		</Layout>
	);
}

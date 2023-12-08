import Image from 'next/image';
import HeaderImage from '../assets/images/pure/header.png';
// import mws from '../assets/images/pure/mws.jpg';
// import mwwws from '../assets/images/pure/mwwws.jpg';
import palmLeaf from '../assets/images/pure/palm-leaf.jpg';
import weCreateTransportSystem from '../assets/images/pure/wects.jpg';
import FAQComponent from '../components/FAQComponent';
import Layout from '../components/Layout';
import SectionBlock from '../components/SectionBlock';
import styles from '../scss/pages/Pure.module.scss';

const Pure = () => {
  const texts = {
    first: `We have our own app for you. In Electra you can take any transport convenient for you with a per-minute payment. If you don't want to stand in traffic jams, take a scooter and ride along bike paths. If you want to go far, take a moped or a car. You can pay every minute, or you can choose a Passes for a long time with a huge benefit. It's up to you!`,

    // second: 'Everyone can find a scooter for themselves. gethered differend kinds of scooters. Everyone can find a scooter for themselves.We gethered differend kinds of scooters. Everyone can find a scooter for themselves.We gethered differend kinds of scooters. Everyone can find a scooter for themselves.',

    // last: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  };

  return (
    <Layout title="Pure – Electra" description="Internet store">
      <section className={styles.headerImage}>
        <Image
          src={HeaderImage}
          alt=""
          priority
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </section>

      <div className="container">
        <SectionBlock
          classes={styles.textSectionWithText}
          title={'Transport sharing'}
          imagePosition={'right'}
          imgSrc={palmLeaf}
          textForColumn={texts.first}
          link={'/transport'}
          linkName={'Transport'}
        />

        <section>
          <Image
            src={weCreateTransportSystem}
            alt=""
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
          <div className={`${styles.textWeCreateTransportSystem} px-3`}>
            Our ecosystem is the sharing of electric vehicles, charging stations, shops and service centers. We want to
            make life convenient for the residents of each city.
          </div>
        </section>

        {/* <section className={styles.textSectionWithText}>
					<SectionBlock
						title={'Transport sharing'}
						imagePosition={'right'}
						imgSrc={mwwws}
						textForColumn={texts.second}
						link={'/transport'}
						linkName={'Transport'}
					/>

					<SectionBlock
						title={'We solve traffic problems'}
						imgSrc={mws}
						textForColumn={texts.last}
						link={'/transport'}
						linkName={'Transport'}
					/>
				</section> */}

        <FAQComponent classes={styles.faq} />
      </div>
    </Layout>
  );
};

export default Pure;

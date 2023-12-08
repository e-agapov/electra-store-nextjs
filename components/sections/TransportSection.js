import Image from 'next/image';
import Link from 'next/link';
import BikesImage from '../../assets/images/index/transport-section/Bikes.png';
import MotorbikesImage from '../../assets/images/index/transport-section/Motorbikes.png';
import ScootersImage from '../../assets/images/index/transport-section/Scooters.png';
import ArrowToRight from '../../components/ui/ArrowToRight';
import styles from '../../scss/components/sections/Transport.module.scss';

const TransportSection = ({ classes = '' }) => {
  return (
    <section className={`${styles.transportSection} ${classes} justify-content-between row row-cols-1 row-cols-lg-3`}>
      <div className={`${styles.link} px-3 px-lg-5`}>
        <Link href="/scooters" className={styles.linkTag}>
          <div className={styles.imageLink}>
            <Image
              alt={'scooters link'}
              src={ScootersImage}
              style={{
                width: '100%',
              }}
            />
            <ArrowToRight styles={styles.ArrowToRight} />
          </div>
          <div className={styles.linkTitle}>E-Scooters</div>
          <div className={styles.description}>
            We gettered different kinds of scooters. Everyone can find a scooter for themselves.
          </div>
        </Link>
      </div>

      <div className={`${styles.link} mt-3 mt-lg-0 px-3 px-lg-5`}>
        <Link href="/bikes" className={styles.linkTag}>
          <div className={styles.imageLink}>
            <Image
              alt={'bikes link'}
              src={BikesImage}
              style={{
                width: '100%',
              }}
            />
            <ArrowToRight styles={styles.ArrowToRight} />
          </div>

          <div className={styles.linkTitle}>E-Bikes</div>
          <div className={styles.description}>Our store has a large selection of different bikes for everyone.</div>
        </Link>
      </div>

      <div className={`${styles.link} mt-3 mt-lg-0 px-3 px-lg-5`}>
        <Link href="/motorbikes" className={styles.linkTag}>
          <div className={styles.imageLink}>
            <Image
              alt={'motorbikes link'}
              src={MotorbikesImage}
              style={{
                width: '100%',
              }}
            />
            <ArrowToRight styles={styles.ArrowToRight} />
          </div>

          <div className={styles.linkTitle}>E-Motorbikes</div>
          <div className={styles.description}>
            Do you want to buy a moped? You have come to the right place, a huge selection, different models for every
            taste.
          </div>
        </Link>
      </div>
    </section>
  );
};

export default TransportSection;

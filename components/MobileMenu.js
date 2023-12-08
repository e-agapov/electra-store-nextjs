import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../scss/components/MobileMenu.module.scss';

const MobileMenu = ({ isVisible = false, toggleMenu }) => {
  const [toggling, setToggling] = useState(false);

  useEffect(() => {
    if (isVisible) setToggling(true);

    setTimeout(() => {
      setToggling(false);
    }, 250);
  }, [isVisible]);

  const mobileMenuIsOpened = toggling ? isVisible && styles.menuIsOpening : !isVisible && styles.menuIsClosed;

  return (
    <div className={`${styles.MobileMenu} ${mobileMenuIsOpened}`}>
      <button onClick={toggleMenu} className={styles.CloseBtn}>
        X
      </button>
      <div className={styles.LinksWrapper}>
        <Link href="/cart" onClick={toggleMenu} className={styles.Link}>
          Cart
        </Link>
        <Link href="/pure" onClick={toggleMenu} className={styles.Link}>
          Pure
        </Link>
        <Link href="/service" onClick={toggleMenu} className={styles.Link}>
          Service
        </Link>
        <Link href="/transport" onClick={toggleMenu} className={styles.Link}>
          Transport
        </Link>
        <Link href="/showrooms" onClick={toggleMenu} className={styles.Link}>
          Showrooms
        </Link>
        <Link href="/accessories" onClick={toggleMenu} className={styles.Link}>
          Accessories & Parts
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;

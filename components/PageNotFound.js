import Head from 'next/head';
import Link from 'next/link';
import styles from '../scss/pages/404.module.scss';

const PageNotFound = () => {
  return (
    <div className={styles.wrapper}>
      <Head>
        <title>404 – Electra</title>
      </Head>
      <div className={styles.infoWrapper}>
        <div className={styles.titlePage}>Page not found</div>
        <div className={styles.text404}>404</div>
        <div className={styles.moreInfoText}>
          The page you are looking for was moved, removed or maybe never existed. Please go to the main page.
        </div>

        <div className={`${styles.moreInfoText} mt-3`}>or</div>
        <Link href="/" className={styles.goHomeBtn}>
          Go home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;

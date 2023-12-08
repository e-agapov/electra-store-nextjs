import Head from 'next/head';

const HeadTag = ({ title, description, themeColor }) => (
  <Head>
    <title>{title || 'Electra'}</title>
    {description && <meta name="description" content={description} />}
    {themeColor && <meta name={themeColor} />}
  </Head>
);

export default HeadTag;

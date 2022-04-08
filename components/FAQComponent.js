import data from '../data/faq';
import CollapseGroup from './CollapseGroup';

const FAQComponent = ({ classes }) => {
	return <CollapseGroup title={'FAQ'} classes={classes} data={data} />;
};

export default FAQComponent;

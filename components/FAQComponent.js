import CollapseGroup from './CollapseGroup';
import data from '../data/faq';

const FAQComponent = ({ classes }) => {
	return <CollapseGroup title={'FAQ'} classes={classes} data={data} />;
};

export default FAQComponent;

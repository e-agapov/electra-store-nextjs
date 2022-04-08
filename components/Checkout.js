import FormCheckout from './FormCheckout';
import HeadTag from './HeadTag';

const Checkout = ({ totalPrice }) => (
	<div className="container my-5 pt-">
		<HeadTag title={'Checkout'} themeColor={'#ff3322'} />
		<FormCheckout totalPrice={totalPrice} />
	</div>
);

export default Checkout;

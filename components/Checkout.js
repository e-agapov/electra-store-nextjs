import FormCheckout from './FormCheckout';
import HeadTag from './HeadTag';

const Checkout = ({ totalPrice }) => (
	<div>
		<HeadTag title={'Checkout'} themeColor={'#ff3322'} />
		<FormCheckout totalPrice={totalPrice} />
	</div>
);

export default Checkout;

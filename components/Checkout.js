import FormCheckout from './FormCheckout';
import HeadTag from './HeadTag';

const Checkout = ({ totalPrice }) => (
	<div className="container my-5 pt-md-3">
		<HeadTag title={'Checkout'} />
		<FormCheckout totalPrice={totalPrice} />
	</div>
);

export default Checkout;

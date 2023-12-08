import FormCheckout from './FormCheckout';
import HeadTag from './HeadTag';

const Checkout = ({ totalPrice, products }) => (
  <div className="container my-5 pt-md-3">
    <HeadTag title={'Checkout'} />
    <FormCheckout products={products} totalPrice={totalPrice} />
  </div>
);

export default Checkout;

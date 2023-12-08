import CheckoutForm from './FormComponent';

const FormCheckout = ({ totalPrice, products }) => {
  return (
    <div>{isLoading ? <div>Please, wait...</div> : <CheckoutForm products={products} totalPrice={totalPrice} />}</div>
  );
};

export default FormCheckout;

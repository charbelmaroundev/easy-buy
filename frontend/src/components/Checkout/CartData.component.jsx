const CartDataComponent = ({
  totalPrice,
  shipping,
  subTotalPrice,
  discountPercentenge,
}) => {
  return (
    <div className="card p-4">
      <div className="d-flex justify-content-between">
        <h3 className="text-muted">Subtotal:</h3>
        <h5>${subTotalPrice}</h5>
      </div>
      <hr />
      <div className="d-flex justify-content-between">
        <h3 className="text-muted">Shipping:</h3>
        <h5>${shipping.toFixed(2)}</h5>
      </div>
      <hr />
      <div className="d-flex justify-content-between">
        <h3 className="text-muted">Total:</h3>
        <h5>{discountPercentenge ? `- $${discountPercentenge}` : null}</h5>
      </div>
      <h5 className="text-end pt-3">${totalPrice}</h5>
    </div>
  );
};

export { CartDataComponent };

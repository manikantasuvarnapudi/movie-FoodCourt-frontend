
import { Link } from 'react-router-dom';
import './index.css';

const EmptyCart = () => {
  return (
    <div className="empty-cart-container">
      <img src="https://res.cloudinary.com/djszohdjt/image/upload/v1735614327/hmo44lpzr2cxekgtkyib.jpg" alt="Empty Cart" className="empty-cart-image" />
      <h1 className="empty-cart-title">Your Cart is Empty</h1>
      <p className="empty-cart-message">Looks like you haven’t added anything to your cart yet.</p>
      <Link to="/">
      <button className="empty-cart-shop-link">Start Shopping</button>
      </Link>
    </div>
  );
};

export default EmptyCart;

import "./index.css"

const CartItems = ({cartitem}) => {
    const {name,quantity,price} = cartitem
    return <li className="cartitem-li-container">
        <div>
         <p>{name}</p>
         <p className="items-quantity">Items {quantity}</p>
         </div>
         <p> &#8377;  {price*quantity}</p>
    </li>
}


export default CartItems
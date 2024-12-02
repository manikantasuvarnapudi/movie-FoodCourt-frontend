import { useContext } from "react";
import { MdDeleteForever } from "react-icons/md";
import { CartContext } from "../../../App";
import "./index.css"


const CartItems = ({cartitem}) => {
    const {name,quantity,price,id} = cartitem
    const { removeCartItem } = useContext(CartContext)
    
    const  onRemoveCartItem = () => {
        removeCartItem(id)
    }

    return <li className="cartitem-li-container">
        <div>
         <p>{name}</p>
         <p className="items-quantity">Items {quantity}</p>
         </div>
         <div className="order-item-remove-container">
         <button type="button" className="remove-button" onClick={onRemoveCartItem}  > <MdDeleteForever size={25}/></button>
         <p> &#8377;  {price*quantity}</p>
         </div>
    </li>
}


export default CartItems
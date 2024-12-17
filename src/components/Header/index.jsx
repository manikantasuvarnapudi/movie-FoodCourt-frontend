import { IoFastFoodOutline } from "react-icons/io5";
import { BsCart } from "react-icons/bs";
import { CartContext } from "../../App"
import { Link } from "react-router-dom";
import "./index.css"
import { useContext, useEffect, useState } from "react";



const Header = () => {
    const { cartArray } = useContext(CartContext)

    const [animate, setAnimate] = useState({
        scale: false,
        pulse: false,
        glow: false,
    });

    useEffect(() => {
        if (cartArray.length > 0) {
            setAnimate({ scale: true, pulse: true, glow: true });
            const timeout = setTimeout(() => {
                setAnimate({ scale: false, pulse: false, glow: false });
            }, 800);

            return () => clearTimeout(timeout);
        }
    }, [cartArray.length]);

    return (
        <div className="Header-container">
            <nav className="navbar-container">
                <Link to="/">
                    <div className="logo">
                        <span className="screen">Screen</span><span className="bites">Bites</span>
                    </div>
                </Link>

                <div className="nav-childs">
                    <Link className="nav-link" to="/">
                        <div className="food-items-container-icon">
                        <p className="food-items-name">FoodItems</p>
                        <IoFastFoodOutline className="food-icon" />
                        </div>
                    </Link>
                    <Link className="nav-link" to="/cart">
                        <div className="cart-container">
                            <p className="cart-name">Cart</p>
                            <BsCart className="cart-icon" />
                            <span className={`cart-count 
                                                   ${animate.scale ? "scale-effect" : ""} 
                                                   ${animate.pulse ? "pulse-effect" : ""} 
                                                   ${animate.glow ? "glow-effect" : ""}`} > {cartArray.length}</span>
                        </div>
                    </Link>
                </div>

            </nav>
        </div>
    )
}

export default Header
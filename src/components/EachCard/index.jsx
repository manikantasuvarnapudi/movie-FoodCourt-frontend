import { Link } from "react-router-dom"
import "./index.css"

const EachCard = ({details}) => {
    const {id, name, price, imageURL} = details
    const offerNames = ["Paneer Pizza", "Cheese Popcorn","Classic Veggie Burger", "Grilled Cheese Sandwich" ]
    const offerValues = {
        "Paneer Pizza": 30,
        "Cheese Popcorn": 20,
        "Classic Veggie Burger": 25,
        "Grilled Cheese Sandwich": 15
    }
    return (
        <>
         <Link to={`/food/${id}/`} className="nav-link" >
         <li className="each-card-container">
             <div className="image-container">
                 {offerNames.includes(name) && <div className="offer-badge">{offerValues[name]}% off</div>}
                 <img src={imageURL} alt="image" className="card-image"/>
             </div>
             <p className="food-item-name">{name}</p>
             <p className="item-cost"> &#8377; {price}</p>
         </li>
         </Link>
        </>
    )
}

export default EachCard

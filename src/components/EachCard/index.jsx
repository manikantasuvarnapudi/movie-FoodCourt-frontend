import { Link } from "react-router-dom"
import "./index.css"

const EachCard = ({details}) => {
    const {id,name,price,imageURL} = details
    return (
        <>
         <Link to={`/food/${id}/`} className="nav-link" >
         <li className="each-card-container">
             <img src={imageURL} alt="image" className="card-image"/>
             <p className="food-item-name">{name}</p>
             <p className="item-cost"> &#8377; {price}</p>
         </li>
         </Link>
         </>
    )
}

export default EachCard
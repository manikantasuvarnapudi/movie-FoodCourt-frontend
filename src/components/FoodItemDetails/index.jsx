import { useEffect, useState, useContext } from "react"
import { Link, useParams } from "react-router-dom"
import { ThreeDots } from 'react-loader-spinner'
import { CartContext } from "../../App.jsx"
import Header from "../Header/index.jsx"
import "./index.css"
const backendUrl = import.meta.env.VITE_BACKEND_URL;




const apiStatusConstants = {
    initial: "INITIAL",
    inprogress: "IN_PROGRESS",
    success: "SUCCESS",
    failure: "FAILURE"
}

const FoodItemDetails = () => {
    const [apiResponse, setApiResponse] = useState({
        status: apiStatusConstants.initial,
        data: null,
        errorMsg: null
    })
    const [quantity,setQuantity] = useState(1)
    const [retrybutton, setRetryButton] = useState(false)
    const [instructions, setInstructions] = useState("")
    const { cartArray, setCartArray } = useContext(CartContext)
    const [itemAdded,setItemAdded] = useState(false)
    const params = useParams()
    const { id } = params

    useEffect(() => {
        setApiResponse((prevState) => ({ ...prevState, status: apiStatusConstants.inprogress }))
        const url = `${backendUrl}/food/${id}`;
        const request = async () => {
            const response = await fetch(url)
            if (response.ok) {
                const Data = await response.json()
                setApiResponse((prevState) => ({ ...prevState, status: apiStatusConstants.success, data: Data }))
            } else {
                setApiResponse((prevState) => ({ ...prevState, status: apiStatusConstants.failure }))
            }
        }

        request()
    }, [retrybutton])

    const onClickAdd = () => {
        const { data } = apiResponse
        const isItemFind = cartArray.some(item => item.id === data.id)
        if (!isItemFind) {
            setCartArray((preavState) => [...preavState, {...data,instructions: instructions,quantity: quantity}])
            setItemAdded(true)
        }
    }

    const onSetInstructions = (event) => {
        setInstructions(event.target.value)
    }

    const onClickRetry = () => {
        setRetryButton((prevState) => !prevState)
    }

    const decreaseQuantity = () => {
        if(quantity > 1){
            setQuantity((prev) => prev-1)
        }
    }

    const increaseQuantity = () =>{
        setQuantity((prev) => prev+1)
    }

    const renderLoadingView = () => {
        return (<div className="loading-container">
            <ThreeDots color="#FFA500" height={70} width={80} />
        </div>)
    }

    const renderSuccessView = () => {
        const { data } = apiResponse
        return <div className="details-container">
            <img src={data.imageURL} alt="image" className="fooditemdetails-image" />
            <div className="items-sub-contaner">
                <h2>{data.name}</h2>
                <p className="item-description">{data.description}</p>
                <p className="options">Options</p>

                <div className="quantity-container">
                    <p>Quantiry</p> <div className="quantity-buttons-container"><button type="button" className="minus" onClick={decreaseQuantity}>-</button><p>{quantity}</p><button type="button" onClick={increaseQuantity} className="plus">+</button></div>
                </div>
                <textarea value={instructions} onChange={onSetInstructions} placeholder="Speial Instructions" name="story" rows="5" cols="80">
                </textarea>

                <button type="button" onClick={onClickAdd} className="addto-cart"> {itemAdded ? "Item Added" : "Add To Order"}  </button>
            </div>
        </div>


    }

    const renderFailureView = () => {
        return <div className="failureViewContainer">
            <img
                src="https://res.cloudinary.com/djszohdjt/image/upload/v1706552284/alert-triangle_alvbje.png"
                alt="failure view"
                className="failure-image"
            />
            <p className="failure-text">Something went wrong. Please try again</p>
            <button className="retryButton" onClick={onClickRetry} type="button">
                Try Again
            </button>
        </div>
    }

    const renderFoodItemFromResponse = () => {
        const { status } = apiResponse
        switch (status) {
            case apiStatusConstants.inprogress:
                return renderLoadingView()
            case apiStatusConstants.success:
                return renderSuccessView()
            case apiStatusConstants.failure:
                return renderFailureView()
            default:
                break;
        }
    }

    return (<div>
        <Header />
        <div className="fooditemdetails-container">
            {renderFoodItemFromResponse()}
        </div>

    </div>)
}

export default FoodItemDetails
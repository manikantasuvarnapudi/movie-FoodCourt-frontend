import { useEffect, useState } from "react"
import Header from "../Header"
import { ThreeDots } from 'react-loader-spinner'
import "./index.css"
import EachCard from "../EachCard"
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const apiStatusConstants = {
    initial: "INITIAL",
    inprogress: "IN_PROGRESS",
    success: "SUCCESS",
    failure: "FAILURE"
}



const Home = () => {
    const [apiResponse, setApiResponse] = useState({
        status: apiStatusConstants.initial,
        data: null,
        errorMsg: null
    })

    useEffect(() => {
        setApiResponse((prev) => ({
            ...prev,
            status: apiStatusConstants.inprogress,
        }));
        const getData = async () => {
            try {

                const url = `${backendUrl}/food`
                const response = await fetch(url)
                const responseData = await response.json()
                setApiResponse({
                    status: apiStatusConstants.success,
                    data: responseData,
                    errorMsg: null,
                })
            } catch (error) {
                setApiResponse((prev) => ({
                    ...prev,
                    errorMsg: error,
                    status: apiStatusConstants.failure,
                }));
            }
        }
        getData()
    }, [])


    const renderSuccessView = () => {
        const { data } = apiResponse
        return <div>
            <div className="category-section">
                <h3>Cold Beverages</h3>
                <ul className="cards-list-container">
                    {data.filter((each) => each.category === "ColdBeverages").map(each => <EachCard key={each.id} details={each} />)}
                </ul>
            </div>
            <div className="category-section">
                <h3>Hot Beverages</h3>
                <ul className="cards-list-container">
                    {data.filter((each) => each.category === "HotBeverages").map(each => <EachCard key={each.id} details={each} />)}
                </ul>
            </div>
            <div className="category-section">
                <h3>Burgers</h3>
                <ul className="cards-list-container">
                    {data.filter((each) => each.category === "burgers").map(each => <EachCard key={each.id} details={each} />)}
                </ul>
            </div>
            <div className="category-section">
                <h3>Sandwiches</h3>
                <ul className="cards-list-container">
                    {data.filter((each) => each.category === "sandwiches").map(each => <EachCard key={each.id} details={each} />)}
                </ul>
            </div>
            <div className="category-section">
                <h3>French Fries</h3>
                <ul className="cards-list-container">
                    {data.filter((each) => each.category === "frenchfries").map(each => <EachCard key={each.id} details={each} />)}
                </ul>
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
            <button className="retryButton" onClick={onClickSearch} type="button">
                Try Again
            </button>
        </div>
    }

    const renderLoadingView = () => {
        return (<div className="loading-container">
            <ThreeDots color="#FFA500" height={70} width={80} />
        </div>)
    }


    const renderFoodItemsFromResponse = () => {
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

    return (
        <div>
            <Header />
            <div className="home-container">
                {renderFoodItemsFromResponse()}
            </div>
        </div>
    )
}

export default Home
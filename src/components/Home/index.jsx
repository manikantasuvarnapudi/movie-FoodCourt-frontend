import { useEffect, useState } from "react"
import Header from "../Header"
import { ThreeDots } from 'react-loader-spinner'
import "./index.css"
import EachCard from "../EachCard"
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const baseUrl = import.meta.env.VITE_API_BASE_URL;
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Footer from "../Footer"




const apiStatusConstants = {
    initial: "INITIAL",
    inprogress: "IN_PROGRESS",
    success: "SUCCESS",
    failure: "FAILURE"
}

const sliderImages = [
    "https://res.cloudinary.com/djszohdjt/image/upload/v1736152688/nc50uvflwjmfmkqlddbw.jpg",
    "https://res.cloudinary.com/djszohdjt/image/upload/v1736152687/isuhfdbqcgbvtmhnxibe.jpg",
    "https://res.cloudinary.com/djszohdjt/image/upload/v1736152687/mu1vzf80lxctjlmwtsgj.jpg",
    "https://res.cloudinary.com/djszohdjt/image/upload/v1736443209/xtltzeeugiusjvlvq0hc.jpg"
  ];



const Home = () => {
    const [apiResponse, setApiResponse] = useState({
        status: apiStatusConstants.initial,
        foodData: null,
        errorMsg: null,
    });

    const [retryButton, setRetryButton] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setApiResponse((prev) => ({ ...prev, status: apiStatusConstants.inprogress }));
            const foodResponse = await fetch(`${backendUrl}/`);
            if (foodResponse.ok === true) {
                const foodData = await foodResponse.json();
                setApiResponse({
                    status: apiStatusConstants.success,
                    foodData,
                    errorMsg: null
                });
            } else {
                setApiResponse({ status: apiStatusConstants.failure, foodData: null, errorMsg: "Someting went to wrong when food fetching" });
            }
        };

        fetchData();
    }, [retryButton]);

    const onClickRetry = () => {
        setRetryButton((prev) => !prev)
    }


    const renderSuccessView = () => {
        const { foodData } = apiResponse
        return <div>

            <div className="slider-container">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 2000 }}
                    loop
                    spaceBetween={30}
                    breakpoints={{
                        
                        640: { slidesPerView: 1 },
                        
                        768: { slidesPerView: 2 },
                    
                        1024: { slidesPerView: 3 },
                      }}
                >
                    {sliderImages.map((src, index) => (
                        <SwiperSlide key={index}>
                            <img src={src} alt={`Slide ${index + 1}`} className="slider-image"  />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>



            <div className="category-section">
                <h3>Pizzas</h3>
                <ul className="cards-list-container">
                    {foodData.filter((each) => each.category === "Pizza").map(each => <EachCard key={each.id} details={each} />)}
                </ul>
            </div>
            <div className="category-section">
                <h3>Popcorn</h3>
                <ul className="cards-list-container">
                    {foodData.filter((each) => each.category === "popcorn").map(each => <EachCard key={each.id} details={each} />)}
                </ul>
            </div>
            <div className="category-section">
                <h3>Rolls</h3>
                <ul className="cards-list-container">
                    {foodData.filter((each) => each.category === "Rolls").map(each => <EachCard key={each.id} details={each} />)}
                </ul>
            </div>
            <div className="category-section">
                <h3>Cold Beverages</h3>
                <ul className="cards-list-container">
                    {foodData.filter((each) => each.category === "ColdBeverages").map(each => <EachCard key={each.id} details={each} />)}
                </ul>
            </div>
            <div className="category-section">
                <h3>Desserts</h3>
                <ul className="cards-list-container">
                    {foodData.filter((each) => each.category === "Desserts").map(each => <EachCard key={each.id} details={each} />)}
                </ul>
            </div>
            <div className="category-section">
                <h3>Hot Beverages</h3>
                <ul className="cards-list-container">
                    {foodData.filter((each) => each.category === "HotBeverages").map(each => <EachCard key={each.id} details={each} />)}
                </ul>
            </div>
            <div className="category-section">
                <h3>Burgers</h3>
                <ul className="cards-list-container">
                    {foodData.filter((each) => each.category === "burgers").map(each => <EachCard key={each.id} details={each} />)}
                </ul>
            </div>

            <div className="category-section">
                <h3>Sandwiches</h3>
                <ul className="cards-list-container">
                    {foodData.filter((each) => each.category === "sandwiches").map(each => <EachCard key={each.id} details={each} />)}
                </ul>
            </div>
            <div className="category-section">
                <h3>French Fries</h3>
                <ul className="cards-list-container">
                    {foodData.filter((each) => each.category === "frenchfries").map(each => <EachCard key={each.id} details={each} />)}
                </ul>
            </div>
            <Footer/>
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
        <div className="home-bg-container">
            <Header />
            <div className="home-container">
                {renderFoodItemsFromResponse()}
            </div>
        </div>
    )
}

export default Home
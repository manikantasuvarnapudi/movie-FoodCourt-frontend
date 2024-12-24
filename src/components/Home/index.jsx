import { useEffect, useState } from "react"
import Header from "../Header"
import { ThreeDots } from 'react-loader-spinner'
import "./index.css"
import EachCard from "../EachCard"
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const baseUrl = import.meta.env.VITE_API_BASE_URL;


const apiStatusConstants = {
    initial: "INITIAL",
    inprogress: "IN_PROGRESS",
    success: "SUCCESS",
    failure: "FAILURE"
}



const Home = () => {
    const [apiResponse, setApiResponse] = useState({
        status: apiStatusConstants.initial,
        foodData: null,
        movieData: null,
        errorMsg: null,
    });

    const [retryButton, setRetryButton] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setApiResponse((prev) => ({ ...prev, status: apiStatusConstants.inprogress }));
            try {
                const foodResponse = await fetch(`${backendUrl}/`);
                console.log(foodResponse);
                if (!foodResponse.ok) throw new Error(`Food data error: ${foodResponse.status}`);
                const foodData = await foodResponse.json();
                console.log(foodData);
            
                const movieOptions = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${apiKey}`,
                    },
                };
            
                const moviesResponse = await fetch(
                    `${baseUrl}/3/movie/upcoming?language=en-US&region=IN&page=1`,
                    movieOptions
                );
                console.log(moviesResponse);
                if (!moviesResponse.ok) throw new Error(`Movies data error: ${moviesResponse.status}`);
                const movieData = await moviesResponse.json();
                console.log(movieData);
            
                setApiResponse({
                    status: apiStatusConstants.success,
                    foodData,
                    movieData,
                    errorMsg: null,
                });
            } catch (error) {
                console.error(error);
                setApiResponse({
                    status: apiStatusConstants.failure,
                    foodData: null,
                    movieData: null,
                    errorMsg: error.message || 'Something went wrong',
                });
            }
            
        };

        fetchData();
    }, [retryButton]);

    const onClickRetry = () => {
        setRetryButton((prev) => !prev)
    }


    const renderSuccessView = () => {
        const { foodData, movieData } = apiResponse
        const filterMovieData = movieData.results.filter((each) => each.poster_path !== null)
        const southIndianLanguages = ["te", "ta", "ml", "kn"];
        const southIndianMovies = filterMovieData.filter((movie) =>
            southIndianLanguages.includes(movie.original_language)
        );
        const otherMovies = filterMovieData.filter(
            (movie) => !southIndianLanguages.includes(movie.original_language)
        );
        const totalMovies = [...southIndianMovies, ...otherMovies]
        return <div>

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
            <div>
                <h3>Upcoming Movies</h3>
                <ul className="movies-container">
                    {totalMovies.map((each) => <li key={each.id}> <img className="movie-poster" src={`https://image.tmdb.org/t/p/w500${each.poster_path}`} alt={each.title} />
                    </li>)}
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
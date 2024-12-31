import { Link } from 'react-router-dom';
import Header from '../Header';
import './index.css';


const NotFound = () => {
    return (
        <div>
            <Header />
            <div className="not-found-container">
                <img src="https://res.cloudinary.com/djszohdjt/image/upload/v1735611807/vpbsdbh4vl1drnbbehsh.jpg" alt="Not Found" className="not-found-image" />
                <h1 className="not-found-title">404</h1>
                <p className="not-found-message">Oops! The page you are looking for does not exist.</p>
                <Link to="/">
                <button  className="not-found-home-link">
                    Go Back to Home
                </button>
                </Link>
            </div>
        </div>
    );
};

export default NotFound;

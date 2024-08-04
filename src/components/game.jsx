import res from "./setup";
import ImageSlider from "./imageslider"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import "../styles/game.css"

export default function Game() {
    const [gameDetails, setGameDetails] = useState(null);
    const location = useLocation();
    const { gameId } = useParams();
    const { screenshots } = location.state || {};
    const [isLoading, setIsLoading] = useState(true);
    const [isAdded, setIsAdded] = useState(res.cartFunctionality.doesContain(gameId));

    useEffect(() => {
        fetch(`https://api.rawg.io/api/games/${gameId}?key=${res.ky}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-type': 'application/json',
        }
        }).then((response) => {
        return response.json();
        }).then((response) => {
        let data = {
            name: response.name,
            description: response.description_raw,
            website: response.website,
            released: response.released,
            genres: null,
            platforms: null, 
            developers: null,
            publishers: null,
        };
    
        data.platforms = response.platforms.map((ptf) => {
            return ptf.platform.name;
        });
    
        data.publishers = response.publishers.map((pub) => {
            return pub.name;
        });
    
        data.developers = response.developers.map((dev) => {
            return dev.name;
        });
    
        data.genres = response.genres.map((gen) => {
            return gen.name;
        });
    
        setGameDetails(data);
        setIsLoading(false);
        }).catch((err) => {
        console.error(err);
        })
        
        return () => {
        //cleanup
        }
    }, [gameId]);
    return (
        <div className="game">
            {
                <>
                    <div className="headingback">
                        <Link to='/shop/games/p' state={location.state && location.state.prev ? Object.keys(location.state.prev).length ? {...location.state.prev} : {name: 'All time top', type: 'other'} : {name: 'All time top', type: 'other'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                                <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/>
                            </svg>
                            Back to Anas
                        </Link>
                        {isLoading? null : <div>{gameDetails.name}</div>}
                    </div>
                    <div className="maingame">
                        <div>
                            <ImageSlider className="slider" images = {screenshots}/>
                        </div>
                        <div>
                            <div className="description">
                                <h1>Description</h1>
                                {isLoading ? null : <div>{gameDetails.description}</div>}
                                <div className="overlay"></div>
                            </div>
                            <div className="moredetails">
                                <span>
                                    {
                                        isLoading ? null : <><b>Website:</b> <a href={gameDetails.website}>{gameDetails.website}</a></>
                                    }
                                </span>
                                <span>
                                    {
                                        isLoading ? null : <><b>Released:</b> {gameDetails.released}</>
                                    }
                                </span>
                                <span><b>Platforms:</b>
                                    {
                                        isLoading ? null : gameDetails.platforms.map((str, i) => {
                                            return <span key={i}>{str}</span>
                                        })
                                    }
                                </span>
                                <span><b>Genres:</b>
                                    {
                                        isLoading ? null : gameDetails.genres.map((str, i) => {
                                            return <span key={i}>{str}</span>
                                        })
                                    }
                                </span>
                                <span><b>Publishers:</b>
                                    {
                                        isLoading ? null : gameDetails.publishers.map((str, i) => {
                                            return <span key={i}>{str}</span>
                                        })
                                    }
                                </span>
                            </div>
                            <div>
                                <span>$49.9</span>
                                {
                                    isAdded ? <span className="alreadyadded">
                                        Added
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                                            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
                                        </svg>
                                    </span> : <span className="buttontoadd" onClick={() => {
                                        res.cartFunctionality.addToCart({
                                            image: screenshots ? screenshots[0] : null,
                                            name: gameDetails.name,
                                            price:49.9,
                                            id: gameId,
                                            cb: setIsAdded,
                                        })
                                    }}>
                                        Add to cart +
                                    </span>
                                }
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    )   
}
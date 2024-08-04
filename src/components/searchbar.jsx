import { useState, useEffect } from "react";
import res from './setup.jsx';
import Loading from "./loading.jsx";
import { Link } from "react-router-dom";
import "../styles/searchbar.css"

export default function SearchBar() {
    const [foundGames, setFoundGames] = useState(null);
    const [loading, setLoading] = useState(false);
    const [focused, setFocused] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    let str = "searchbarcontainer";

    if (focused) str += " focusedon";

    useEffect(() => {
        if (!searchTerm) {
            setFoundGames(null);
            setLoading(false);
            return;
        }

        setLoading(true);

        fetch(`${res.baseURL}games?key=${res.ky}&search=${searchTerm}&page_size=5`, {
            mode: "cors", 
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        }).then((response) => response.json())
        .then((response) => {
            const result = response.results.map((game) => ({
                id: game.id,
                name: game.name,
                background_image: game.background_image, 
                platforms: game.parent_platforms.map((ptf) => ptf.platform.slug),
                screenshots: game.short_screenshots,
            }));
            setLoading(false);
            setFoundGames({count: response.count, result});
        }).catch((err) => {
            console.error(err);
            setLoading(false);
        });
    }, [searchTerm]);

    function handleChange(e) {
        setSearchTerm(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const str = e.target[0].value;

        const query = `${res.baseURL}games?key=${res.ky}&search=${str}&page_size=${res.page_size}&search_exact=true`;

        e.target.reset();
        setLoading(false);
        setFoundGames(null);
        setFocused(false);

        navigate('/shop/games/p', {
            replace: true,
            state: {
              query: query,
              name: str,
            },
        });
    }

    return (
        <div className={str}>
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="search">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                        <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
                    </svg>
                </label>
                <input type="text" autoComplete="off" name="search" id="name" placeholder="Search for your game" onChange={handleChange} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}/>
            </form>
            <div className="dropdown" style={!foundGames && !loading ? {display : "none"} : null}>
                {
                    loading ? <div className="loading"><Loading /></div> : foundGames ? (
                        <>
                            <h2>Games <span>{foundGames.count}</span></h2>
                            {
                                foundGames.result.map((game) => {
                                    let dest = `/shop/game/${game.id}`;
                                    let imgs = [];
                                    for (let i = 0; i < game.screenshots.length ; i++) {
                                        imgs.push(game.screenshots[i].image);
                                    }

                                    return (
                                        <div key={game.id}>
                                            <Link to={dest} state={{screenshots: [...imgs], prev:null}} onClick={() => {
                                                setFoundGames(null);
                                                setLoading(false);
                                            }}>
                                                <div style={{ backgroundImage: 'url(' + game.background_image + ')' }}></div>
                                            </Link>
                                            <div>
                                                <div>
                                                    {
                                                        game.platforms.map((ptf, i) => {
                                                            return<svg style={{color: 'white'}}key={i}>{res.platform_icons[ptf]}</svg>
                                                        })
                                                    }
                                                </div>
                                                <Link to={dest} state={{screenshots: [...imgs], prev: null}} onClick={() => {
                                                    setFoundGames(null);
                                                    setLoading(false);
                                                }}>
                                                    {game.name}
                                                </Link>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </>
                    ) : null
                }
            </div>
        </div>
    )
}

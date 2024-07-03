"use client"
import { useState, useEffect } from "react";
import Link from "next/link";

const Header = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState(null);

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchQuery.trim()) {
                handleSearch();
            } else {
                setSearchResults([]);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    const handleSearch = async () => {
        setIsSearching(true);
        setError(null);
        try {
            const response = await fetch(`https://api.jikan.moe/v4/anime?q=${searchQuery}&limit=10`);
            const data = await response.json();
            setSearchResults(data.data || []);
        } catch (error) {
            console.error("Error fetching search results:", error);
            setError("Failed to fetch search results.");
        } finally {
            setIsSearching(false);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <>
            <header className="header">
                <div className="header-container">
                    <div className="header-content">
                        <Link href='/' passHref>
                            <div className="header-logo">
                                <h3>ANI<span>FORWARD</span></h3>
                            </div>
                        </Link>
                        <nav className="header-nav">
                            <Link href='/home'>Home</Link>
                            <Link href='/movie'>Movies</Link>
                            <Link href='/series'>TV Series</Link>
                            <Link href='/popular'>Most Popular</Link>
                            <Link href='/airing'>Top Airing</Link>
                        </nav>
                        <div className="header-search">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={handleSearchInputChange}
                                onKeyPress={handleKeyPress}
                                aria-label="Search for anime"
                            />
                            <button onClick={handleSearch} aria-label="Search">
                                <svg fill="#000000" width="30px" height="30px" viewBox="0 -8 72 72" xmlns="http://www.w3.org/2000/svg">
                                    <title>search</title>
                                    <path d="M58.73,44.35l-11-11a21.26,21.26,0,0,1-6.37,6.37l11,11a4.51,4.51,0,0,0,6.38-6.38Z" />
                                    <path d="M48,22A18,18,0,1,0,30,40,18,18,0,0,0,48,22ZM30,35.52A13.53,13.53,0,1,1,43.52,22,13.55,13.55,0,0,1,30,35.52Z" />
                                    <path d="M19.47,22h3A7.52,7.52,0,0,1,30,14.47v-3A10.53,10.53,0,0,0,19.47,22Z" />
                                </svg>
                            </button>
                        </div>
                        <div className="header-login">
                            <Link href='/'>Login</Link>
                        </div>
                    </div>
                    <div className="search-results-flex">
                        {isSearching && <div className="loading">Loading...</div>}
                        {error && <div className="error">{error}</div>}
                        {searchResults.length > 0 && (
                            <div className="search-results">
                                {searchResults.map(anime => (
                                    <Link href={`/home/${anime.mal_id}`} key={anime.mal_id}>
                                        <div className="search-result-item">
                                            <img src={anime.images.jpg.large_image_url} alt={anime.title} />
                                            <span>{anime.title}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header

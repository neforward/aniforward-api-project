import { useState, useEffect } from 'react';

const fetchWithRetry = async (url, options = {}, retries = 5, backoff = 300) => {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            if (response.status === 429 && retries > 0) {
                await new Promise(resolve => setTimeout(resolve, backoff));
                return fetchWithRetry(url, options, retries - 1, backoff * 2);
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        if (retries === 0) throw error;
        await new Promise(resolve => setTimeout(resolve, backoff));
        return fetchWithRetry(url, options, retries - 1, backoff * 2);
    }
};

const useFetchTopAnime = () => {
    const [topAnimeList, setTopAnimeList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTopAnime = async () => {
            try {
                const response = await fetch('https://api.jikan.moe/v4/top/anime');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const top10Anime = data.data.slice(0, 10);
                setTopAnimeList(top10Anime);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTopAnime();
    }, []);

    return { topAnimeList, loading, error };
};

export default useFetchTopAnime;

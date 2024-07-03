import { useEffect, useState } from 'react';

const BASE_URL = 'https://api.jikan.moe/v4';

const useFetchAnime = (page) => {
    const [animeList, setAnimeList] = useState([]);
    const [isLastPage, setIsLastPage] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnime = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${BASE_URL}/anime?page=${page}`);
                const data = await response.json();
                if (data && data.data) {
                    setAnimeList(data.data);
                    setIsLastPage(!data.pagination.has_next_page);
                } else {
                    console.error('No data found in the response.');
                    setAnimeList([]);
                }
            } catch (error) {
                console.error('Error fetching anime list:', error);
                setAnimeList([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAnime();
    }, [page]);

    return { animeList, isLastPage, loading };
};

export default useFetchAnime;

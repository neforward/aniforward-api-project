import { useState, useEffect } from 'react';

const MANGA_API_BASE_URL = 'https://api.jikan.moe/v4';

const useFetchManga = (page = 1) => {
    const [mangaList, setMangaList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isLastPage, setIsLastPage] = useState(false);

    useEffect(() => {
        const fetchManga = async () => {
            try {
                const response = await fetch(`${MANGA_API_BASE_URL}/manga?page=${page}`);
                if (!response.ok) throw new Error('Failed to fetch manga');
                const data = await response.json();
                setMangaList(data.data || []);
                setIsLastPage(data.pagination && !data.pagination.has_next_page);
            } catch (error) {
                console.error(error);
                // Handle error state if needed
            } finally {
                setLoading(false);
            }
        };

        fetchManga();
    }, [page]);

    return { mangaList, loading, isLastPage };
};

export default useFetchManga;

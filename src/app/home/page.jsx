"use client"
import { useState } from "react";
import Header from "@/components/Header";
import Link from 'next/link';
import Loading from '@/components/Loading';
import useFetchAnime from '@/hooks/useFetchAnime';
import useFetchTopAnime from "@/hooks/useFetchTopAnime";
const Home = () => {
    const [page, setPage] = useState(1);
    const { animeList, isLastPage, loading } = useFetchAnime(page);
    const { topAnimeList, loading: topLoading } = useFetchTopAnime();

    const truncateTitle = (title, maxLength = 15) => {
        return title.length > maxLength ? `${title.substring(0, maxLength)}...` : title;
    };

    const handleNextPage = () => {
        if (!isLastPage) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        setPage(prevPage => Math.max(prevPage - 1, 1));
    };
    const formatDuration = (duration) => {
        if (!duration) return '';

        const regex = /(\d+)\s*hr\s*(\d+)\s|\d+\s|\s*hr/;

        const match = duration.match(regex);

        if (!match) return duration;

        if (match[1] && match[2]) {
            return `${match[1]}h ${match[2]}m`;
        } else if (match[1]) {
            return `${match[1]}h`;
        } else {
            return `${match[0]}m`.replace(/\s+/g, '');
        }
    };

    return (
        <>
            <Header />
            <div className="anime">
                <div className="container">
                    {loading ? (
                        <Loading />
                    ) : (
                        <>
                            <div className="flex-anime">
                                <div className="anime-list">
                                    <div className="anime-content">
                                        {Array.isArray(animeList) && animeList.map((anime) => (
                                            <Link href={`/home/${anime.mal_id}`} key={anime.mal_id}>
                                                <div className="anime-box">
                                                    <img src={anime.images.jpg.large_image_url} alt={anime.title} />
                                                    <h6 className="anime-title">{truncateTitle(anime.title_english || anime.title)}</h6>
                                                    <div className="anime-txt">
                                                        <span>{anime.type}</span> <div>•</div> <span>{formatDuration(anime.duration)}</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="pagination">
                                        <button onClick={handlePreviousPage} disabled={page === 1}>
                                            <svg width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <polyline fill="none" stroke="#000000" strokeWidth="2" points="7 2 17 12 7 22" transform="matrix(-1 0 0 1 24 0)" />
                                            </svg>
                                        </button>
                                        <span>{page}</span>
                                        <button onClick={handleNextPage} disabled={isLastPage}>
                                            <svg fill="#000000" height="30px" width="30px" version="1.1" id="XMLID_287_" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                                                viewBox="0 0 24 24" xmlSpace="preserve">
                                                <g id="next">
                                                    <g>
                                                        <polygon points="6.8,23.7 5.4,22.3 15.7,12 5.4,1.7 6.8,0.3 18.5,12" />
                                                    </g>
                                                </g>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <aside className="top-animes">
                                    {topLoading ? (
                                        <Loading />
                                    ) : (
                                        Array.isArray(topAnimeList) && topAnimeList.map((anime, i) => (
                                            <div className="top-anime-boxes" key={anime.mal_id}>
                                                <div className="top-anime-box">
                                                    <h4 className="top-num">{i + 1}</h4>
                                                    <div className="top-data">
                                                        <img src={anime.images.jpg.large_image_url} alt={anime.title} />
                                                        <div className="top-anime-txt">
                                                            <h5>{truncateTitle(anime.title_english || anime.title, 35)}</h5>
                                                            <span>
                                                                <svg height="12px" width="12px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                    viewBox="0 0 512 512" xmlSpace="preserve">

                                                                    <g>
                                                                        <path className="st0" d="M383.788,206.98v51.113c-0.013,35.266-14.301,67.108-37.475,90.318
		c-23.212,23.176-55.042,37.464-90.307,37.464c-35.267,0-67.108-14.288-90.32-37.464c-23.174-23.211-37.462-55.052-37.474-90.318
		V206.98H90.503v51.113c0.036,84.93,64.21,154.935,146.649,164.337V512h37.709v-89.57c82.426-9.402,146.599-79.407,146.636-164.337
		V206.98H383.788z"/>
                                                                        <path className="st0" d="M256.006,344.41c47.589,0,86.305-38.728,86.305-86.318V86.318C342.311,38.728,303.596,0,256.006,0
		c-47.59,0-86.318,38.728-86.318,86.318v171.775C169.688,305.682,208.416,344.41,256.006,344.41z"/>
                                                                    </g>
                                                                </svg>
                                                                {anime.episodes}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </aside>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Home

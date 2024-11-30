"use client";
import { useState } from "react";
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Loading from '@/components/Loading';
import useFetchAnime from '@/hooks/useFetchAnime';
import useFetchTopAnime from '@/hooks/useFetchTopAnime';
import Image from 'next/image';

// Dynamically import components if SSR causes issues
const Header = dynamic(() => import('@/components/Header'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

const Home = () => {
    const [page, setPage] = useState(1);
    const { animeList, isLastPage, loading } = useFetchAnime(page);
    const { topAnimeList, loading: topLoading } = useFetchTopAnime();

    const truncateTitle = (title, maxLength = 15) =>
        title.length > maxLength ? `${title.substring(0, maxLength)}...` : title;

    const handleNextPage = () => {
        if (!isLastPage) setPage(prevPage => prevPage + 1);
    };

    const handlePreviousPage = () => setPage(prevPage => Math.max(prevPage - 1, 1));

    const formatDuration = (duration) => {
        if (!duration) return '';
        const regex = /(\d+)\s*hr\s*(\d+)\s|\d+\s|\s*hr/;
        const match = duration.match(regex);
        if (!match) return duration;
        if (match[1] && match[2]) return `${match[1]}h ${match[2]}m`;
        if (match[1]) return `${match[1]}h`;
        return `${match[0]}m`.replace(/\s+/g, '');
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
                                        {Array.isArray(animeList) &&
                                            animeList.map((anime) => (
                                                <Link href={`/home/${anime.mal_id}`} key={anime.mal_id}>
                                                    <div className="anime-box">
                                                        <Image
                                                            src={anime.images.jpg.large_image_url}
                                                            alt={anime.title}
                                                            width={200}
                                                            height={300}
                                                        />
                                                        <h6 className="anime-title">{truncateTitle(anime.title_english || anime.title)}</h6>
                                                        <div className="anime-txt">
                                                            <span>{anime.type}</span> <div>•</div>{" "}
                                                            <span>{formatDuration(anime.duration)}</span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                    </div>
                                    <div className="pagination">
                                        <button onClick={handlePreviousPage} disabled={page === 1}>
                                            <svg /* SVG content */ />
                                        </button>
                                        <span>{page}</span>
                                        <button onClick={handleNextPage} disabled={isLastPage}>
                                            <svg /* SVG content */ />
                                        </button>
                                    </div>
                                </div>
                                <aside className="top-animes">
                                    <h2>Top 10</h2>
                                    {topLoading ? (
                                        <Loading />
                                    ) : (
                                        Array.isArray(topAnimeList) &&
                                        topAnimeList.map((anime, i) => (
                                            <div className="top-anime-boxes" key={anime.mal_id}>
                                                <div className="top-anime-box">
                                                    <h4 className="top-num">{i + 1}</h4>
                                                    <div className="top-data">
                                                        <Image
                                                            src={anime.images.jpg.large_image_url}
                                                            alt={anime.title}
                                                            width={50}
                                                            height={75}
                                                        />
                                                        <div className="top-anime-txt">
                                                            <h5>{truncateTitle(anime.title_english || anime.title, 35)}</h5>
                                                            <span>{anime.episodes}</span>
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
            <Footer />
        </>
    );
};

export default Home;

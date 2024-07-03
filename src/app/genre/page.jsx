"use client"
import { useEffect, useState } from 'react';
import Header from "@/components/Header";
import Loading from '@/components/Loading';
import Link from 'next/link';

const Genre = () => {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimesByGenre = async () => {
      const path = window.location.pathname;
      const genreId = path.split('/').pop();
      if (!genreId) return;

      setLoading(true);
      
      const BASE_URL = 'https://api.jikan.moe/v4';
      try {
        const response = await fetch(`${BASE_URL}/anime?genres=${genreId}`);
        if (response.status === 429) {
          throw new Error('Rate limit exceeded');
        }

        const data = await response.json();
        setAnimes(data.data);
      } catch (error) {
        console.error("Failed to fetch animes by genre:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimesByGenre();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <Header />
      <div className="genre-animes">
        <div className="container">
          <h2>Animes for Genre</h2>
          <div className="animes-list">
            {animes.map(anime => (
              <Link href={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                <div className="anime-card">
                  <img src={anime.images.jpg.large_image_url} alt={anime.title} />
                  <h3>{anime.title_english || anime.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Genre;

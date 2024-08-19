"use client"
import React, { useEffect, useState } from 'react';
import Header from "@/components/Header";
import Loading from '@/components/Loading';

const JIKAN_API_BASE_URL = 'https://api.jikan.moe/v4';

const Manga = () => {
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMangas = async () => {
      try {
        const response = await fetch(`${JIKAN_API_BASE_URL}/manga`);
        if (!response.ok) throw new Error('Failed to fetch mangas');
        const data = await response.json();
        setMangas(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMangas();
  }, []);

  if (loading) return <div><Loading /></div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Header />
      <div className="anime">
        <div className="container">
          <div className="anime-content">
            {mangas.map((manga) => (
              <div key={manga.mal_id} className="anime-box">
                <img src={manga.images.jpg.large_image_url} alt={manga.title} />
                <h6 className="anime-title">{manga.title}</h6>
                <div className="anime-txt">
                  <span>{manga.type}</span> <div>•</div> <span>{manga.chapters} chapters</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Manga;

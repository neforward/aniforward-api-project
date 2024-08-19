"use client"
import Header from '@/components/Header';
import Loading from '@/components/Loading';
import React, { useEffect, useState } from 'react';

const CharacterDetailsPage = () => {
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const truncateTitle = (title, maxLength = 20) => {
        return title.length > maxLength ? `${title.substring(0, maxLength)}...` : title;
    };
    useEffect(() => {
        const fetchCharacterDetails = async () => {
            const path = window.location.pathname;
            const id = path.split('/').pop();

            if (!id) {
                setLoading(false);
                setError('Character ID is not valid');
                return;
            }

            const BASE_URL = 'https://api.jikan.moe/v4';
            const CHARACTER_URL = `${BASE_URL}/characters/${id}/full`;
            const ANIME_URL = `${BASE_URL}/characters/${id}/anime`;
            const MANGA_URL = `${BASE_URL}/characters/${id}/manga`;
            const VOICES_URL = `${BASE_URL}/characters/${id}/voices`;


            try {
                const responses = await Promise.all([
                    fetch(CHARACTER_URL),
                    fetch(ANIME_URL),
                    fetch(MANGA_URL),
                    fetch(VOICES_URL),
                ]);

                for (const response of responses) {
                    if (!response.ok) {
                        throw new Error(`Failed to fetch data from ${response.url}: ${response.statusText}`);
                    }
                }

                const [characterResponse, animeResponse, mangaResponse, voicesResponse] = responses;
                const characterData = await characterResponse.json();
                const animeData = await animeResponse.json();
                const mangaData = await mangaResponse.json();
                const voicesData = await voicesResponse.json();

                setCharacter({
                    ...characterData.data,
                    anime: animeData.data,
                    manga: mangaData.data,
                    voices: voicesData.data,
                });

                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(error.message || 'Failed to fetch data');
            }
        };

        fetchCharacterDetails();
    }, []);

    if (loading) return <div className="loading"><Loading /></div>;

    if (error) return <div className="error">Error: {error}</div>;

    if (!character) return <div className="not-found">Character not found!</div>;

    const largeImageUrl = character.images && character.images.jpg && character.images.jpg.large_image_url;

    return (
        <>
            <Header />
            <div className="character-details">
                <div className="container">
                    <div className="character-box">
                        {largeImageUrl && <img src={largeImageUrl} alt="" />}
                        <h2>{character.name}</h2>
                        <p>{character.about}</p>

                        <div className="main-anime">
                            <h3>Animeography</h3>
                            <div className="character-anime-content">
                                {character.anime.map((anime, index) => (
                                    <div className="character-animes" key={index}>
                                        <img src={anime.anime.images.jpg.large_image_url} alt="" />
                                        <span>{truncateTitle(anime.anime.title)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="main-manga">
                            <h3>Mangaography</h3>
                            <div className="character-manga-content">
                                {character.manga.map((manga, index) => (
                                    <div className="character-mangas" key={index}>
                                        <img src={manga.manga.images.jpg.large_image_url} alt="" />
                                        <span>{manga.manga.title} - Role: {manga.role}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="main-actors">
                            <h3>Voice Actors</h3>
                            <div className="character-voice-actors">
                                {character.voices.map((voice, index) => (
                                    <div className="voice-actors" key={index}>
                                        <img src={voice.person.images.jpg.image_url} alt="" />
                                        <span>{voice.person.name} {voice.language}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            </>
    );
};

export default CharacterDetailsPage;
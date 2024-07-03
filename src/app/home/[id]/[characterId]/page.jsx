"use client"
import Loading from '@/components/Loading';
import React, { useEffect, useState } from 'react';

const CharacterDetailsPage = () => {
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        <div className="character-details">
            <div className="container">
                <div className="character-box">
                    {largeImageUrl && <img src={largeImageUrl} alt="" />}
                    <h2>{character.name}</h2>
                    <p>{character.about}</p>

                    <div className="anime-list">
                        <h3>Anime Appearances</h3>
                        <ul>
                            {character.anime.map((anime, index) => (
                                <li key={index}>
                                    <img src={anime.anime.images.jpg.large_image_url} alt="" />
                                    <p>{anime.anime.title} - Role: {anime.role}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="manga-list">
                        <h3>Manga Appearances</h3>
                        <ul>
                            {character.manga.map((manga, index) => (
                                <li key={index}>
                                    <img src={manga.manga.images.jpg.large_image_url} alt="" />
                                    <p>{manga.manga.title} - Role: {manga.role}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="main-actors">
                        <h3>Voice Actors</h3>
                        <div className="character-voice-actors">
                            {character.voices.map((voice, index) => (
                                <div className="voice-actors" key={index}>
                                    <img src={voice.person.images.jpg.image_url} alt="" />
                                    <p>{voice.person.name} {voice.language}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CharacterDetailsPage;

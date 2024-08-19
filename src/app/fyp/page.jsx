"use client"
import React, { useEffect, useState } from 'react';

const FYP = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const response = await fetch('https://api.jikan.moe/v4/recommendations/anime');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setRecommendations(data.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            <h1>Anime Recommendations</h1>
            <div>
                {recommendations.map(rec => (
                    <div key={rec.mal_id}>
                        <h2>{rec.content}</h2>
                        <div>
                            {rec.entry.map(entry => (
                                <div key={entry.mal_id}>
                                    <a href={entry.url} target="_blank" rel="noopener noreferrer">
                                        <img src={entry.images.jpg.large_image_url} alt={entry.title} />
                                        <h3>{entry.title}</h3>
                                    </a>
                                </div>
                            ))}
                        </div>
                        <p>Recommended by: <a href={rec.user.url}>{rec.user.username}</a></p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default FYP;

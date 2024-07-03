"use client"
import { useEffect, useState } from 'react';
import Header from "@/components/Header";
import Loading from '@/components/Loading';
import Link from 'next/link';

const cache = {};

const AnimeDetails = () => {
  const [anime, setAnime] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [displayCharacters, setDisplayCharacters] = useState([]);
  const [displayStaff, setDisplayStaff] = useState([]);
  const [showAllCharacters, setShowAllCharacters] = useState(false);
  const [showAllStaff, setShowAllStaff] = useState(false);
  const [loading, setLoading] = useState(true);
  const [staff, setStaff] = useState([]);
  const [showFullSynopsis, setShowFullSynopsis] = useState(false);

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      const path = window.location.pathname;
      const id = path.split('/').pop();
      if (!id) return;

      setLoading(true);

      const BASE_URL = 'https://api.jikan.moe/v4';

      try {
        if (cache[id]) {
          setAnime(cache[id].anime);
          setCharacters(cache[id].characters);
          setDisplayCharacters(cache[id].characters.slice(0, 12));
          setStaff(cache[id].staff);
          setDisplayStaff(cache[id].staff.slice(0, 6));
        } else {
          const [animeResponse, charactersResponse, staffResponse] = await Promise.all([
            fetch(`${BASE_URL}/anime/${id}`),
            fetch(`${BASE_URL}/anime/${id}/characters`),
            fetch(`${BASE_URL}/anime/${id}/staff`)
          ]);

          if (animeResponse.status === 429 || charactersResponse.status === 429 || staffResponse.status === 429) {
            throw new Error('Rate limit exceeded');
          }

          const animeData = await animeResponse.json();
          const charactersData = await charactersResponse.json();
          const staffData = await staffResponse.json();

          cache[id] = {
            anime: animeData.data,
            characters: charactersData.data,
            staff: staffData.data,
          };

          setAnime(animeData.data);
          setCharacters(charactersData.data);
          setDisplayCharacters(charactersData.data.slice(0, 12));
          setStaff(staffData.data);
          setDisplayStaff(staffData.data.slice(0, 6));
        }
      } catch (error) {
        console.error("Failed to fetch anime details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeDetails();
  }, []);

  const toggleShowAllStaff = () => {
    setDisplayStaff(showAllStaff ? staff.slice(0, 6) : staff);
    setShowAllStaff(!showAllStaff);
  };

  const toggleShowAllCharacters = () => {
    setDisplayCharacters(showAllCharacters ? characters.slice(0, 12) : characters);
    setShowAllCharacters(!showAllCharacters);
  };

  const toggleShowFullSynopsis = () => {
    setShowFullSynopsis(!showFullSynopsis);
  };

  if (loading) return <Loading />;
  if (!anime) return <Loading />; // Handle loading state

  const truncatedSynopsis = anime.synopsis && anime.synopsis.length > 150
    ? `${anime.synopsis.slice(0, 150)}...`
    : anime.synopsis;

  const shortenRating = (rating) => {
    const ratingMap = {
      "G - All Ages": "G",
      "PG - Children": "PG",
      "PG-13 - Teens 13 or older": "PG-13",
      "R - 17+ (violence & profanity)": "R",
      "R+ - Mild Nudity": "R+",
      "Rx - Hentai": "Rx",
    };

    return ratingMap[rating] || rating;
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
      {anime && (
        <div className="detail">
          <div className="container">
            <div className="detail-content">
              <div className="detail-all">
                <img src={anime.images.jpg.large_image_url} alt={anime.title} />
                <div className="detail-des">
                  <h2>{anime.title_english || anime.title}</h2>
                  <div className="anime-info">
                    <div className="info-box">
                      <h5 className='info-rating'>{shortenRating(anime.rating)}</h5>
                      <h5 className='info-quality'>HD</h5>
                      <h5 className='info-eps'>   <svg height="12px" width="12px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 512 512" xmlSpace="preserve">

                        <g>
                          <path className="st0" d="M383.788,206.98v51.113c-0.013,35.266-14.301,67.108-37.475,90.318
		c-23.212,23.176-55.042,37.464-90.307,37.464c-35.267,0-67.108-14.288-90.32-37.464c-23.174-23.211-37.462-55.052-37.474-90.318
		V206.98H90.503v51.113c0.036,84.93,64.21,154.935,146.649,164.337V512h37.709v-89.57c82.426-9.402,146.599-79.407,146.636-164.337
		V206.98H383.788z"/>
                          <path className="st0" d="M256.006,344.41c47.589,0,86.305-38.728,86.305-86.318V86.318C342.311,38.728,303.596,0,256.006,0
		c-47.59,0-86.318,38.728-86.318,86.318v171.775C169.688,305.682,208.416,344.41,256.006,344.41z"/>
                        </g>
                      </svg>{anime.episodes}</h5>
                    </div>
                    <div className='dot'>•</div>
                    <span>{anime.type}</span>
                    <div className='dot'>•</div>
                    <span>{formatDuration(anime.duration)}</span>
                  </div>
                  <div className="detail-descriptions">
                    <p>
                      {showFullSynopsis ? anime.synopsis : truncatedSynopsis}
                      {anime.synopsis.length > 150 && (
                        <span onClick={toggleShowFullSynopsis} style={{ fontWeight: 600, cursor: 'pointer' }}>
                          {showFullSynopsis ? ' - Less' : ' + More'}
                        </span>
                      )}
                    </p>
                    <p>AniForward is the best site to watch <span>{anime.title_english || anime.title}</span> SUB online, or you can even watch <span>{anime.title_english || anime.title}</span> DUB in HD quality. You can also find Kyoto Animation anime on AniForward website.</p>
                  </div>
                </div>
                <aside className="detail-txt">
                  <h6>Japanese: <span>{anime.title_japanese}</span></h6>
                  <h6>Synonyms: <span>{anime.title_synonyms.length ? anime.title_synonyms.join(', ') : 'N/A'}</span></h6>
                  <h6>Aired: <span>{anime.aired.string}</span></h6>
                  <h6>Premiered: <span>{anime.season} {anime.year}</span></h6>
                  <h6>Duration: <span>{anime.duration}</span></h6>
                  <h6>Status: <span>{anime.status}</span></h6>
                  <h6>MAL Score: <span>{anime.score}</span></h6>
                  <h6 className='genre'>
                    Genres:
                    {anime.genres.map(genre => (
                      <Link href={`/home/genre/${genre.mal_id}`} key={genre.mal_id}>
                        <span >{genre.name}</span>
                      </Link>
                    ))}
                  </h6>
                  <h6>Studios: <span>{anime.studios.map(studio => studio.name).join(', ')}</span></h6>
                  <h6>Producers: <span>{anime.producers.map(producer => producer.name).join(', ')}</span></h6>
                  <h6>Source: <span>{anime.source}</span></h6>
                </aside>
              </div>
              <div className="characters">
                <div className="characters-title">
                  <h2>Characters</h2>
                </div>
                <div className="detail-characters">
                  {displayCharacters.map((characterData, i) => (
                    <Link href={`/home/${anime.mal_id}/${characterData.character.mal_id}`} key={characterData.character.mal_id}>
                      <div className="character-data">
                        <img src={characterData.character.images.jpg.image_url} alt={characterData.character.name} />
                        <h3 style={{ color: characterData.role === 'Main' ? '#fff' : '' }}>{characterData.character.name}</h3>
                        <span style={{ color: characterData.role === 'Main' ? '#fe5959' : '#bbd0ff' }}>{characterData.role}</span>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="showBtn">
                  {characters.length > 12 && (
                    <button onClick={toggleShowAllCharacters}>
                      {showAllCharacters ? 'Show Less' : 'Show All'}
                    </button>
                  )}
                </div>
              </div>
              <div className="staff">
                <div className="staff-title">
                  <h2>Staff</h2>
                </div>
                <div className="detail-staff">
                  {displayStaff.map((staffData, i) => (
                    <div key={staffData.person.mal_id} className="staff-data">
                      <img src={staffData.person.images.jpg.image_url} alt={staffData.person.name} />
                      <h3>{staffData.person.name}</h3>
                      <span>{staffData.positions.join(', ')}</span>
                    </div>
                  ))}
                </div>
                <div className="showBtn">
                  {staff.length > 6 && (
                    <button onClick={toggleShowAllStaff}>
                      {showAllStaff ? 'Show Less' : 'Show All'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AnimeDetails

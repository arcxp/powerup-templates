import React, { useState, useEffect } from 'react';
import './advanced.scss';
import * as ComposerHandler from '@arcxp/shared-powerup-composer-utils';
import { movieKey } from 'fusion:environment';

//This component is the first frame you see when you open the Power-Up in the UI
//It allows you to search for a movie title, which calls the API and displays it
const AdvancedSearch = () => {
  const [title, setTitle] = useState('');
  const [movie, setMovie] = useState({});

  useEffect(() => {
    //Composer always requires a "ready" message
    ComposerHandler.sendMessage('ready', {
      height: document.documentElement.scrollHeight,
    });
  }, []);

  const handleFieldChange = (value) => {
    setTitle(value);
  };

  const search = async () => {
    //Here we are calling an API to get data for the movie being searched for
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${movieKey}&t=${title}`
    );
    const movie = await response.json();
    setMovie(movie);
  };

  const save = () => {
    //getStarterPowerUpANS creates an object with the necessary ANS keys
    const ansStarter = ComposerHandler.getStarterPowerUpANS();
    const ansCustomEmbed = {
      ...ansStarter,
      //Your data is stored in the config object
      //Here we are storing just the title of the movie
      //So we will have to make another API call in the VIEW component
      config: {
        title,
      },
    };
    //Save the data by sending the ANS object with a "data" message
    ComposerHandler.sendMessage('data', ansCustomEmbed);
  };

  const cancel = () => {
    //Cancel the iFrame by sending a "cancel" message
    ComposerHandler.sendMessage('cancel');
  };

  return (
    <div className="container advanced-search">
      <h2>Find a Movie Title</h2>
      <br />
      <div className="advanced-search-container">
        <input
          type="text"
          className="form-control search-input"
          placeholder="Lorem ipsum dolor sit amet"
          value={title}
          onChange={(e) => handleFieldChange(e.target.value)}
        ></input>
      </div>
      <br />
      {movie?.Title?.length > 0 && (
        <div>
          <h1>Title: {movie?.Title}</h1>
          <p>Year: {movie?.Year}</p>
          <p>Rated: {movie?.Rated}</p>
          <p>Released: {movie?.Released}</p>
          <p>Runtime: {movie?.Runtime}</p>
          <img src={movie?.Poster} />
        </div>
      )}
      <br />
      <div className="btns-container">
        <button onClick={cancel}>Cancel</button>
        <button disabled={!title.length} onClick={search}>
          Search
        </button>
        <button disabled={!Object.keys(movie).length} onClick={save}>
          Save
        </button>
      </div>
    </div>
  );
};

AdvancedSearch.lazy = true;
export default AdvancedSearch;

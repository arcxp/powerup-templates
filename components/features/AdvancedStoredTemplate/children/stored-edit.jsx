import React, { useState, useEffect } from 'react';
import './stored.scss';
import * as ComposerHandler from '@arcxp/shared-powerup-composer-utils';
import { movieKey } from 'fusion:environment';

//This component is usually very similar in structure to the SEARCH component
//with the one difference being it might also display what has already been saved
const AdvancedEdit = () => {
  const [title, setTitle] = useState('');
  const [payload, setPayload] = useState({});
  const [movie, setMovie] = useState({});

  useEffect(() => {
    //Composer always requires a "ready" message
    ComposerHandler.sendMessage('ready', {
      height: document.documentElement.scrollHeight,
    });

    //getPayload parses the data from the iFrame URL
    //giving you access to whatever you have stored in config
    const data = ComposerHandler.getPayload();
    setPayload(data);
    setMovie(data?.config?.movie);
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
    const ansCustomEmbed = {
      //The payload contains the ID created with getStarterPowerUpAns in the SEARCH component
      //so it needs to be included when editing, overwriting only the stored data in config
      ...payload,
      config: {
        movie,
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
      <h2>Edit Title</h2>
      <br />
      <div className="stored-search-container">
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
        <button
          disabled={!title.length && !Object.keys(movie).length}
          onClick={save}
        >
          Save
        </button>
      </div>
    </div>
  );
};

AdvancedEdit.lazy = true;
export default AdvancedEdit;

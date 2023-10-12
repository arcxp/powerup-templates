import React, { useState, useEffect } from 'react';
import { useContent } from 'fusion:content';
import './stored.scss';
import * as ComposerHandler from '@arcxp/shared-powerup-composer-utils';

const AdvancedSearch = () => {
  const [title, setTitle] = useState('');
  const [movie, setMovie] = useState('');

  let movieData = {};
  movieData = useContent({
    source: movie.length ? 'movieAPI' : '',
    query: {
      title: movie,
    },
  });

  useEffect(() => {
    ComposerHandler.sendMessage('ready', {
      height: document.documentElement.scrollHeight,
    });
  }, []);

  const handleFieldChange = (value) => {
    setTitle(value);
  };

  const searchMovie = () => {
    setMovie(title);
  };

  const save = () => {
    const ansStarter = ComposerHandler.getStarterPowerUpANS();
    const ansCustomEmbed = {
      ...ansStarter,
      config: {
        movieData,
      },
    };

    ComposerHandler.sendMessage('data', ansCustomEmbed);
  };

  const cancel = () => {
    ComposerHandler.sendMessage('cancel');
  };

  return (
    <div className="container advanced-search">
      <h2>Find a Movie Title</h2>
      <br />
      <div className="search-container">
        <input
          type="text"
          className="form-control search-input"
          placeholder="Lorem ipsum dolor sit amet"
          value={title}
          onChange={(e) => handleFieldChange(e.target.value)}
        ></input>
      </div>
      <br />
      {movieData?.Title?.length > 0 && (
        <div>
          <h1>Title: {movieData?.Title}</h1>
          <p>Year: {movieData?.Year}</p>
          <p>Rated: {movieData?.Rated}</p>
          <p>Released: {movieData?.Released}</p>
          <p>Runtime: {movieData?.Runtime}</p>
          <img src={movieData?.Poster} />
        </div>
      )}
      <br />
      <div className="btns-container">
        <button onClick={cancel}>Cancel</button>
        <button onClick={searchMovie}>Search</button>
        <button disabled={!title.length} onClick={save}>
          Save
        </button>
      </div>
    </div>
  );
};

AdvancedSearch.lazy = true;
export default AdvancedSearch;

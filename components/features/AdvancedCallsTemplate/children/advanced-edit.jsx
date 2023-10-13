import React, { useState, useEffect } from 'react';
import './advanced.scss';
import * as ComposerHandler from '@arcxp/shared-powerup-composer-utils';
import { movieKey } from 'fusion:environment';

const AdvancedEdit = () => {
  const [title, setTitle] = useState('');
  const [movie, setMovie] = useState({});
  const [payload, setPayload] = useState({});

  useEffect(() => {
    ComposerHandler.sendMessage('ready', {
      height: document.documentElement.scrollHeight,
    });

    const data = ComposerHandler.getPayload();
    setTitle(data?.config?.title);
    setPayload(data);
  }, []);

  const handleFieldChange = (value) => {
    setTitle(value);
  };

  const search = async () => {
    console.log('HITTTTTT');
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${movieKey}&t=${title}`
    );
    const movie = await response.json();
    setMovie(movie);
  };

  const save = () => {
    const ansCustomEmbed = {
      ...payload,
      config: {
        title,
      },
    };
    ComposerHandler.sendMessage('data', ansCustomEmbed);
  };

  const cancel = () => {
    ComposerHandler.sendMessage('cancel');
  };

  if (title.length && !Object.keys(movie).length) {
    search();
  }

  return (
    <div className="container advanced-search">
      <h2>Edit Title</h2>
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

AdvancedEdit.lazy = true;
export default AdvancedEdit;

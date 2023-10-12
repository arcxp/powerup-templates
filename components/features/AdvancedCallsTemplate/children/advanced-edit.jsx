import React, { useState, useEffect } from 'react';
import { useContent } from 'fusion:content';
import './advanced.scss';
import * as ComposerHandler from '@arcxp/shared-powerup-composer-utils';

const AdvancedEdit = () => {
  const [title, setTitle] = useState('');
  const [movie, setMovie] = useState('');
  const [payload, setPayload] = useState({});

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

    const data = ComposerHandler.getPayload();
    setTitle(data?.config?.title);
    setMovie(data?.config?.title);
    setPayload(data);
  }, []);

  const handleFieldChange = (value) => {
    setTitle(value);
  };

  const searchMovie = () => {
    setMovie(title);
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

AdvancedEdit.lazy = true;
export default AdvancedEdit;

import React, { useState, useEffect } from 'react';
import { useContent } from 'fusion:content';
import './stored.scss';
import * as ComposerHandler from '@arcxp/shared-powerup-composer-utils';

const AdvancedEdit = () => {
  const [title, setTitle] = useState('');
  const [payload, setPayload] = useState({});
  const [movieData, setMovieData] = useState({});
  const [search, setSearch] = useState(false);

  let newData = {};
  newData = useContent({
    source: title.length ? 'movieAPI' : '',
    query: {
      title: title,
    },
  });
  setTimeout(() => {
    if (search) {
      setMovieData(newData);
      setSearch(false);
    }
  }, 1000);

  useEffect(() => {
    ComposerHandler.sendMessage('ready', {
      height: document.documentElement.scrollHeight,
    });

    const data = ComposerHandler.getPayload();
    setPayload(data);
    setMovieData(data?.config?.movieData);
  }, []);

  const handleFieldChange = (value) => {
    setTitle(value);
  };

  const searchMovie = () => {
    setSearch(true);
  };

  const save = () => {
    const ansCustomEmbed = {
      ...payload,
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

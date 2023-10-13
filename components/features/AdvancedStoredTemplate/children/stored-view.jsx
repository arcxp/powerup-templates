import React, { useEffect, useState } from 'react';
import './stored.scss';
import * as ComposerHandler from '@arcxp/shared-powerup-composer-utils';

const AdvancedView = () => {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    ComposerHandler.sendMessage('ready', {
      height: document.documentElement.scrollHeight,
    });

    const data = ComposerHandler.getPayload();
    setMovie(data?.config?.movie);
  }, []);

  return (
    <div className="advanced-box">
      <h1>Title: {movie?.Title}</h1>
      <p>Year: {movie?.Year}</p>
      <p>Rated: {movie?.Rated}</p>
      <p>Released: {movie?.Released}</p>
      <p>Runtime: {movie?.Runtime}</p>
      <img src={movie?.Poster} />
    </div>
  );
};

AdvancedView.lazy = true;
export default AdvancedView;

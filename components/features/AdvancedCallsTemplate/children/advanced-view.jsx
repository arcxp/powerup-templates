import React, { useEffect, useState } from 'react';
import { useContent } from 'fusion:content';
import './advanced.scss';
import * as ComposerHandler from '@arcxp/shared-powerup-composer-utils';

const AdvancedView = () => {
  const [movie, setMovie] = useState('');
  let movieData = {};
  movieData = useContent({
    source: 'movieAPI',
    query: {
      title: movie,
    },
  });

  useEffect(() => {
    ComposerHandler.sendMessage('ready', {
      height: document.documentElement.scrollHeight,
    });

    const data = ComposerHandler.getPayload();
    setMovie(data?.config?.title);
  }, []);

  return (
    <div className="advanced-box">
      <h1>Title: {movieData?.Title}</h1>
      <p>Year: {movieData?.Year}</p>
      <p>Rated: {movieData?.Rated}</p>
      <p>Released: {movieData?.Released}</p>
      <p>Runtime: {movieData?.Runtime}</p>
      <img src={movieData?.Poster} />
    </div>
  );
};

AdvancedView.lazy = true;
export default AdvancedView;

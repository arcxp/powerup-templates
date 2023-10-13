import React, { useEffect, useState } from 'react';
import { useContent } from 'fusion:content';
import './advanced.scss';
import * as ComposerHandler from '@arcxp/shared-powerup-composer-utils';

const AdvancedView = () => {
  const [title, setTitle] = useState('');

  let movie = {};
  movie = useContent({
    source: 'movieAPI',
    query: {
      title,
    },
  });

  useEffect(() => {
    ComposerHandler.sendMessage('ready', {
      height: document.documentElement.scrollHeight,
    });

    const data = ComposerHandler.getPayload();
    setTitle(data?.config?.title);
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

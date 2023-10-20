import React, { useEffect, useState } from 'react';
import { useContent } from 'fusion:content';
import './advanced.scss';
import * as ComposerHandler from '@arcxp/shared-powerup-composer-utils';

//This component is the frame that displays your data in the story in the UI
//In this version we have stored only the movie title so we have to
//do an additional API call to get the movie data to display
const AdvancedView = () => {
  const [title, setTitle] = useState('');

  let movie = {};
  //Here we are using useContent and our movieAPI source
  //to get the data so that it will be cached
  movie = useContent({
    source: 'movieAPI',
    query: {
      title,
    },
  });

  useEffect(() => {
    //Composer always requires a "ready" message
    ComposerHandler.sendMessage('ready', {
      height: document.documentElement.scrollHeight,
    });

    //getPayload parses the data from the iFrame URL
    //giving you access to whatever you have stored in config
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

import React, { useEffect, useState } from 'react';
import './stored.scss';
import * as ComposerHandler from '@arcxp/shared-powerup-composer-utils';

//This component is the frame that displays your data in the story in the UI
//In this version we have stored all of the movie data so we do not have to
//do an additional API call to get it
const AdvancedView = () => {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    //Composer always requires a "ready" message
    ComposerHandler.sendMessage('ready', {
      height: document.documentElement.scrollHeight,
    });

    //getPayload parses the data from the iFrame URL
    //giving you access to whatever you have stored in config
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

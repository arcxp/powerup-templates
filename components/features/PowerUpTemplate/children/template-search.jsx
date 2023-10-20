import React, { useState, useEffect } from 'react';
import './template.scss';
import * as ComposerHandler from '@arcxp/shared-powerup-composer-utils';

//This component is the first frame you see when you open the Power-Up in the UI
//It captures the message in local state and adds it to the ANS on save
const TemplateSearch = () => {
  const [headline, setHeadline] = useState('');

  useEffect(() => {
    //Composer always requires a "ready" message
    ComposerHandler.sendMessage('ready', {
      height: document.documentElement.scrollHeight,
    });
  }, []);

  const handleFieldChange = (value) => {
    setHeadline(value);
  };

  const save = () => {
    //getStarterPowerUpANS creates an object with the necessary ANS keys
    const ansStarter = ComposerHandler.getStarterPowerUpANS();
    const ansCustomEmbed = {
      ...ansStarter,
      //Your data is stored in the config object
      config: {
        headline,
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
    <div className="container template-search">
      <h2>Add A Headline</h2>
      <br />
      <div className="template-search-container">
        <input
          type="text"
          className="form-control search-input"
          placeholder="Lorem ipsum dolor sit amet"
          value={headline}
          onChange={(e) => handleFieldChange(e.target.value)}
        ></input>
      </div>
      <br />
      <div className="btns-container">
        <button onClick={cancel}>Cancel</button>
        <button disabled={!headline.length} onClick={save}>
          Save
        </button>
      </div>
    </div>
  );
};

TemplateSearch.lazy = true;
export default TemplateSearch;

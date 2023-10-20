import React, { useState, useEffect } from 'react';
import './template.scss';
import * as ComposerHandler from '@arcxp/shared-powerup-composer-utils';

//This component is usually very similar in structure to the SEARCH component
//with the one difference being it might also display what has already been saved
const TemplateEdit = () => {
  const [headline, setHeadline] = useState('');
  const [payload, setPayload] = useState({});

  useEffect(() => {
    //Composer always requires a "ready" message
    ComposerHandler.sendMessage('ready', {
      height: document.documentElement.scrollHeight,
    });

    //getPayload parses the data from the iFrame URL
    //giving you access to whatever you have stored in config
    const data = ComposerHandler.getPayload();
    setHeadline(data?.config?.headline);
    setPayload(data);
  }, []);

  const handleFieldChange = (value) => {
    setHeadline(value);
  };

  const save = () => {
    const ansCustomEmbed = {
      //The payload contains the ID created with getStarterPowerUpAns in the SEARCH component
      //so it needs to be included when editing, overwriting only the stored data in config
      ...payload,
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
      <h2>Edit Headline</h2>
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

TemplateEdit.lazy = true;
export default TemplateEdit;

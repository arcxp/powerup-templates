import React, { useState, useEffect } from 'react';
// import { sendMessage, getKey } from '../../../../util/powerups/index';
import './template.scss';
import * as ComposerHandler from '@arcxp/shared-powerup-composer-utils';

const TemplateSearch = () => {
  const [headline, setHeadline] = useState('');

  useEffect(() => {
    ComposerHandler.sendMessage('ready', {
      height: document.documentElement.scrollHeight,
    });
  }, []);

  const handleFieldChange = (value) => {
    setHeadline(value);
  };

  const save = () => {
    const ansCustomEmbed = {
      config: {
        headline,
      },
    };
    ComposerHandler.sendMessage('data', ansCustomEmbed);
  };

  const cancel = () => {
    ComposerHandler.sendMessage('cancel');
  };

  return (
    <div className="container template-search">
      <h2>Add A Headline</h2>
      <br />
      <div className="search-container">
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

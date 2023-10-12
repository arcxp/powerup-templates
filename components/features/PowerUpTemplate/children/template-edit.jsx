import React, { useState, useEffect } from 'react';
import get from 'lodash.get';
// import {
//   sendMessage,
//   getKey,
//   parseQueryString,
// } from '../../../../util/powerups/index';
import './template.scss';
import * as ComposerHandler from '@arcxp/shared-powerup-composer-utils';

const TemplateEdit = () => {
  const [headline, setHeadline] = useState('');

  useEffect(() => {
    ComposerHandler.sendMessage('ready', {
      height: document.documentElement.scrollHeight,
    });

    const data = ComposerHandler.getPayload();
    setHeadline(data?.config?.headline);
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
      <h2>Edit Headline</h2>
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

TemplateEdit.lazy = true;
export default TemplateEdit;

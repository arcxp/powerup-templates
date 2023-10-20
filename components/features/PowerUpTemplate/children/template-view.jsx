import React, { useEffect, useState } from 'react';
import './template.scss';
import * as ComposerHandler from '@arcxp/shared-powerup-composer-utils';

//This component is the frame that displays your data in the story in the UI
//It can either display stored data or use a stored search term to get data
//from a third-party API
const TemplateView = () => {
  const [headline, setHeadline] = useState('');

  useEffect(() => {
    //Composer always requires a "ready" message
    ComposerHandler.sendMessage('ready', {
      height: document.documentElement.scrollHeight,
    });

    //getPayload parses the data from the iFrame URL
    //giving you access to whatever you have stored in config
    const data = ComposerHandler.getPayload();
    setHeadline(data?.config?.headline);
  }, []);

  return (
    <div className="template-box">
      <h1>{headline}</h1>
    </div>
  );
};

TemplateView.lazy = true;
export default TemplateView;

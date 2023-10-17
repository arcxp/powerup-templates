import React, { useEffect, useState } from 'react';
import './template.scss';
import * as ComposerHandler from '@arcxp/shared-powerup-composer-utils';

const TemplateView = () => {
  const [headline, setHeadline] = useState('');

  useEffect(() => {
    ComposerHandler.sendMessage('ready', {
      height: document.documentElement.scrollHeight,
    });

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

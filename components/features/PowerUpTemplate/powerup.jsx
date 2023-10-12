import React, { useEffect, useState } from 'react';
import get from 'lodash.get';
import TemplateSearch from './children/template-search.jsx';
import TemplateView from './children/template-view.jsx';
import TemplateEdit from './children/template-edit.jsx';

const PowerUpTemplate = () => {
  const [actionID, setActionID] = useState('');

  const getActionParam = () => {
    const actionHash = get(window, 'location.hash', 'NONE');
    setActionID(actionHash.toUpperCase());
  };

  useEffect(() => getActionParam(), []);

  return (
    <div>
      {actionID.includes('#SEARCH') && <TemplateSearch />}
      {actionID.includes('#VIEW') && <TemplateView />}
      {actionID.includes('#EDIT') && <TemplateEdit />}
    </div>
  );
};

export default PowerUpTemplate;

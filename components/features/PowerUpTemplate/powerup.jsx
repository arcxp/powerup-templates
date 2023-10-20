import React, { useEffect, useState } from 'react';
import get from 'lodash.get';
import TemplateSearch from './children/template-search.jsx';
import TemplateView from './children/template-view.jsx';
import TemplateEdit from './children/template-edit.jsx';

//This component is the Block that is added to a page
//and it controls which frame to display based on the URL
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

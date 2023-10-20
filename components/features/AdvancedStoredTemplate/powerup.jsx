import React, { useEffect, useState } from 'react';
import get from 'lodash.get';
import StoredSearch from './children/stored-search.jsx';
import StoredView from './children/stored-view.jsx';
import StoredEdit from './children/stored-edit.jsx';

//This component is the Block that is added to a page
//and it controls which frame to display based on the URL
const StoredTemplate = () => {
  const [actionID, setActionID] = useState('');

  const getActionParam = () => {
    const actionHash = get(window, 'location.hash', 'NONE');
    setActionID(actionHash.toUpperCase());
  };

  useEffect(() => getActionParam(), []);

  return (
    <div>
      {actionID.includes('#SEARCH') && <StoredSearch />}
      {actionID.includes('#VIEW') && <StoredView />}
      {actionID.includes('#EDIT') && <StoredEdit />}
    </div>
  );
};

export default StoredTemplate;

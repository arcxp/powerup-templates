import React, { useEffect, useState } from 'react';
import get from 'lodash.get';
import StoredSearch from './children/stored-search.jsx';
import StoredView from './children/stored-view.jsx';
import StoredEdit from './children/stored-edit.jsx';

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

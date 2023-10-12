import React, { useEffect, useState } from 'react';
import get from 'lodash.get';
import AdvancedSearch from './children/advanced-search.jsx';
import AdvancedView from './children/advanced-view.jsx';
import AdvancedEdit from './children/advanced-edit.jsx';

const AdvancedTemplate = () => {
  const [actionID, setActionID] = useState('');

  const getActionParam = () => {
    const actionHash = get(window, 'location.hash', 'NONE');
    setActionID(actionHash.toUpperCase());
  };

  useEffect(() => getActionParam(), []);

  return (
    <div>
      {actionID.includes('#SEARCH') && <AdvancedSearch />}
      {actionID.includes('#VIEW') && <AdvancedView />}
      {actionID.includes('#EDIT') && <AdvancedEdit />}
    </div>
  );
};

export default AdvancedTemplate;

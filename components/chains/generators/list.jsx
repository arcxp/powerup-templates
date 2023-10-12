import React from 'react'

export default (ListType, ItemType = 'li') => ({ children }) =>
  <ListType>
    {
      children.map(
        (child, index) =>
          <ItemType key={child.key || index}>{child}</ItemType>
      )
    }
  </ListType>

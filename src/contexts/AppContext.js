import React from 'react';

const AppContext = React.createContext({
  userId: null,
  setUserId: () => { },
});

export default AppContext;
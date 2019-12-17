import React from 'react';

const HomeContext = React.createContext({
  messages: [],
  addMessage: (newMsg) => { },
  isLoadingGet: null,
  isLoadingPost: null,
});

export default HomeContext;
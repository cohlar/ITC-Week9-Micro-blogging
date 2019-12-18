import React from 'react';

const HomeContext = React.createContext({
  messages: [],
  postMessage: (newMsg) => { },
  isLoadingGet: null,
  isLoadingPost: null,
  errorGet: '',
  errorPost: '',
});

export default HomeContext;
import React from 'react';

const HomeContext = React.createContext({
  messages: [],
  addMessage: (newMsg) => { },
  isLoadingGet: null,
  isLoadingPost: null,
  errorGet: '',
  errorPost: '',
});

export default HomeContext;
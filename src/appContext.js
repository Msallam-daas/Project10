import React from 'react';

export const AppContext = React.createContext({
  addCard: () => {},
  editCard: () => {},
  markCard: () => {},
  setActiveCard: () => {},
  removeCard: () => {},
  removeAllCards: () => {},
  insertDummyData: () => {},
  cards: [],
  markedCards: [],
  activeCard: undefined,
});

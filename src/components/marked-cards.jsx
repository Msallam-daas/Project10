import React from 'react';
import ReviewCards from './review-cards';
import { AppContext } from '../appContext';

const MarkedCards = () => {
  return (
    <AppContext.Consumer>
      {(values) => <ReviewCards cards={values.markedCards} />}
    </AppContext.Consumer>
  );
};

export default MarkedCards;

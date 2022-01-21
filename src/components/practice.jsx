import React from 'react';
import ReviewCards from './review-cards';
import { AppContext } from '../appContext';

const Practice = () => {
  return (
    <AppContext.Consumer>
      {(values) => <ReviewCards cards={values.cards} />}
    </AppContext.Consumer>
  );
};

export default Practice;

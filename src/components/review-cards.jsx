import React, { Fragment, useEffect, useState } from 'react';
import ProgressBar from './progress-bar';

const ReviewCards = ({ cards }) => {
  const [showAnswer, toggleShowAnswer] = useState(false);
  const [curIndex, moveCurIndex] = useState(0);
  const [completePercentage, setPercentage] = useState(0);

  let addPercentage = 0;
  useEffect(() => {
    addPercentage = showAnswer ? (1 / cards.length / 2).toFixed(2) * 100 : 0;

    curIndex === cards.length - 1 && showAnswer
      ? setPercentage(100)
      : setPercentage(
          (curIndex / cards.length).toFixed(2) * 100 + addPercentage
        );
  }, [curIndex, showAnswer]);

  const nextCard = () => {
    curIndex === cards.length - 1
      ? moveCurIndex(0)
      : moveCurIndex(curIndex + 1);
    toggleShowAnswer(false);
  };

  const prevCard = () => {
    curIndex === 0
      ? moveCurIndex(cards.length - 1)
      : moveCurIndex(curIndex - 1);
    toggleShowAnswer(false);
  };

  return (
    <Fragment>
      <div className='container mt-5'>
        <ProgressBar complete={completePercentage} />
        {cards.length > 0 ? (
          <Fragment>
            <div
              className='review-area text-center mt-1'
              onClick={() => toggleShowAnswer(!showAnswer)}
            >
              <h2 className='card-content'>
                {showAnswer ? cards[curIndex].answer : cards[curIndex].question}
              </h2>
            </div>
            <div className='text-center practice-progress mt-4'>
              <i
                className='fas fa-arrow-left fa-lg'
                onClick={() => prevCard()}
              ></i>
              <span className='mx-5'>{`${curIndex + 1} / ${
                cards.length
              }`}</span>
              <i
                className='fas fa-arrow-right fa-lg'
                onClick={() => nextCard()}
              ></i>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <h3 className='text-center mt-5'>
              There is no flashcards to display.
            </h3>
            <h5 className='text-center'>
              Start by adding new cards or check the star on cards you created.
            </h5>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default ReviewCards;

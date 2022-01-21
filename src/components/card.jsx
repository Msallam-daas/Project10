import React from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../appContext";
import DeleteModal from "./delete-modal";
import "./card.css";

class Card extends React.Component {
  randomizeHex() {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    this.setState({
      hex: randomColor,
    });
  }
  constructor(props) {
    super(props);
    this.state = {
      background: "black",
      current: "null",
    };
  }
  changeColor = () => {
    this.setState({ background: "red" });
  };

  render() {
    const { id, question, answer, marked } = this.props;
    const { cards, setActiveCard, markCard } = this.context;
    const colors = [
      "palevioletred",
      "red",
      "green",
      "blue",
      "yellow",
      "orange",
    ];

    return (
      <div className="col mb-4">
        <div className="card h-100">
          <div className="flip-card">
            <div
              className="flip-card-inner"
              style={{ background: this.state.background }}
            >
              <div className="flip-card-front ">
                <p className="card-title">{question}</p>
              </div>
              <div className="flip-card-back ">
                <p className="card-context">{answer}</p>
              </div>
            </div>
          </div>
          <div className="card-footer card-footer-bg text-center">
            <div>
              <DeleteModal
                handleDelete={() => {
                  const index = cards.findIndex((card) => {
                    return card.id === id;
                  });

                  if (index !== -1) {
                    setActiveCard(index);
                  }
                }}
              />
            </div>

            <Link to="/update">
              <div>
                <i
                  className="far fa-edit fa-lg fa-fw icon-btn"
                  onClick={() => {
                    const index = cards.findIndex((card) => {
                      return card.id === id;
                    });

                    if (index !== -1) {
                      setActiveCard(index);
                    }
                  }}
                ></i>
              </div>
            </Link>

            <div>
              {marked ? (
                <i
                  className="fas fa-star fa-lg fa-fw icon-starBtn"
                  onClick={() => markCard(id)}
                ></i>
              ) : (
                <i
                  className="far fa-star fa-lg fa-fw icon-btn"
                  onClick={() => markCard(id)}
                ></i>
              )}
            </div>
          </div>
        </div>
        <div className="containerColor">
          {colors.map((color, index) => (
            <div Key={index} className="cardColor">
              <div
                style={{ background: color }}
                className="boxColor"
                onClick={() => this.setState({ background: color })}
              ></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Card.contextType = AppContext;

export default Card;

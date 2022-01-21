import React from "react";
import { Redirect } from "react-router-dom";
import { AppContext } from "../appContext";
import { v4 as uuidv4 } from "uuid";

class CardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      answer: "",
      redirect: null,
      hex: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.reset = this.reset.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { activeCard, addCard, editCard } = this.context;
    const { question, answer } = this.state;
    const { title } = this.props;

    if (title === "Create New Card") {
      const newCard = {
        id: uuidv4(),
        question,
        answer,
        marked: false,
      };
      addCard(newCard);
    } else {
      const card = {
        id: activeCard.id,
        question,
        answer,
      };
      editCard(card);
    }

    this.reset();
  }

  reset() {
    this.setState({
      question: "",
      answer: "",
      redirect: "/",
    });
  }

  componentDidMount() {
    const { activeCard } = this.context;
    const { title } = this.props;
    if (title === "Update Card" && activeCard) {
      this.setState({
        question: activeCard.question,
        answer: activeCard.answer,
      });
    }
  }
  randomizeHex() {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    this.setState({
      hex: randomColor,
    });
  }

  render() {
    const { question, answer, redirect } = this.state;
    const { title } = this.props;

    // This is a class component, so we need to use a state to decide when to render this <Redirect /> component
    if (redirect) {
      return <Redirect to={redirect} />;
    }

    return (
      <div className="container">
        <h1 className="text-center">{title}</h1>
        <form className="mt-5" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="question">Question:</label>
            <textarea
              type="text"
              className="form-control"
              value={question}
              name="question"
              onChange={this.handleChange}
              autoFocus
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="answer">Answer:</label>
            <textarea
              type="text"
              className="form-control"
              value={answer}
              name="answer"
              onChange={this.handleChange}
            ></textarea>
          </div>

          <div className="form-group text-center text-sm-right mt-5">
            <button
              type="button"
              className="btn btn-danger btn-fixStyle mr-2"
              onClick={this.reset}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-secondary btn-fixStyle">
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}

CardForm.contextType = AppContext;

export default CardForm;

import React from "react";
import ViewCards from "./view-cards";
import Practice from "./practice";
import MarkedCards from "./marked-cards";
import CreateCard from "./create-card";
import UpdateCard from "./update-card";
import NotFound from "./not-found";
import Nav from "./nav";
import { AppContext } from "../appContext";
import dummyCards from "../testData";
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter, Route, Switch } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      markedCards: [],
      activeCard: undefined,
      addCard: (newCard) => this.addCard(newCard),
      editCard: (card) => this.editCard(card),
      markCard: (id) => this.markCard(id),
      insertDummyData: () => this.insertDummyData(),
      setActiveCard: (index) => this.setActiveCard(index),
      removeCard: () => this.removeCard(),
      removeAllCards: () => this.removeAllCards(),
    };
    this.addCard = this.addCard.bind(this);
    this.editCard = this.editCard.bind(this);
  }

  componentDidMount() {
    try {
      const cards = JSON.parse(localStorage.getItem("flash-cards"));
      if (cards) {
        this.setState({
          cards,
          markedCards: cards.filter((card) => card.marked),
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  saveCards() {
    localStorage.setItem("flash-cards", JSON.stringify(this.state.cards));
  }

  addCard(card) {
    this.setState(
      {
        cards: [...this.state.cards, card],
      },
      this.saveCards
    );
  }

  editCard(updatedCard) {
    this.setState(
      (prevState) => ({
        cards: prevState.cards.map((card) => {
          if (card.id === updatedCard.id) {
            return {
              ...card,
              ...updatedCard,
            };
          } else {
            return card;
          }
        }),
      }),
      this.saveCards
    );
  }

  markCard(id) {
    this.setState(
      (prevState) => ({
        cards: prevState.cards.map((card) => {
          if (card.id === id) {
            card.marked = !card.marked;
          }
          return card;
        }),
      }),
      this.setMarkedCards
    );
  }

  insertDummyData() {
    this.setState(
      {
        cards: [
          ...this.state.cards,
          ...dummyCards.map((card) => {
            const cardWithID = {
              ...card,
              id: uuidv4(),
            };
            return cardWithID;
          }),
        ],
      },
      this.saveCards
    );
  }

  // Re-generate markedCards array since cards array is updated, and update the cards stored in localStorage
  setMarkedCards() {
    this.setState(
      {
        markedCards: this.state.cards.filter((card) => card.marked),
      },
      this.saveCards
    );
  }

  setActiveCard(index) {
    this.setState((prevState) => ({
      activeCard: prevState.cards[index],
    }));
  }

  removeCard() {
    this.setState(
      {
        cards: this.state.cards.filter((card) => {
          return card.id !== this.state.activeCard.id;
        }),
      },
      this.saveCards
    );
  }

  removeAllCards() {
    this.setState(
      {
        cards: [],
      },
      this.saveCards
    );
  }

  render() {
    return (
      <BrowserRouter>
        <AppContext.Provider value={this.state}>
          <Nav />
          <Switch>
            <Route exact path="/" component={ViewCards} />
            <Route exact path="/practice" component={Practice} />
            <Route exact path="/marked" component={MarkedCards} />
            <Route exact path="/add" component={CreateCard} />
            <Route exact path="/update" component={UpdateCard} />
            <Route component={NotFound} />
          </Switch>
        </AppContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;

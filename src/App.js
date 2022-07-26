import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '',
      cardAttr2: '',
      cardAttr3: '',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
      savedCards: [],
      filter: '',
    };
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value }, () => {
      const { cardName, cardDescription,
        cardImage, cardRare, cardAttr1,
        cardAttr2, cardAttr3 } = this.state;
      const fieldSize = 90;
      const maxFieldSize = 210;
      if (cardName.length > 0 && cardDescription.length > 0
        && cardImage.length > 0 && cardRare.length > 0
        && Number(cardAttr1) >= 0 && Number(cardAttr1 <= fieldSize)
        && Number(cardAttr2) >= 0 && Number(cardAttr2 <= fieldSize)
        && Number(cardAttr3) >= 0 && Number(cardAttr3 <= fieldSize)
        && Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3) <= maxFieldSize) {
        this.setState({ isSaveButtonDisabled: false });
      } else {
        this.setState({ isSaveButtonDisabled: true });
      }
    });
  };

  onSaveButtonClick = () => {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    } = this.state;

    const newCard = {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    };

    const { savedCards } = this.state;

    this.setState({ savedCards: [...savedCards, newCard] }, () => {
      this.setState({
        cardName: '',
        cardDescription: '',
        cardAttr1: '0',
        cardAttr2: '0',
        cardAttr3: '0',
        cardImage: '',
        cardRare: 'normal',
        cardTrunfo: false,
        isSaveButtonDisabled: true,
      });
      this.superTrunfo();
    });
  };

  superTrunfo = () => {
    const { savedCards } = this.state;
    const hasTrunfo = savedCards.some((card) => card.cardTrunfo);
    this.setState({ hasTrunfo });
  };

  onDeleteButtonClick = (deleted) => {
    const { savedCards } = this.state;
    this.setState({ savedCards: savedCards.filter((_card, index) => index !== deleted),
    }, () => {
      this.superTrunfo();
    });
  };

  setFilterValue =(event) => {
    this.setState({ filter: event.target.value });
  }

  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      savedCards, filter } = this.state;

    const filteredCards = savedCards.filter((card) => {
      const filteredCard = card.cardName;
      return filteredCard.includes(filter);
    });

    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          hasTrunfo={ hasTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onInputChange={ this.onInputChange }
          onSaveButtonClick={ this.onSaveButtonClick }
        />
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
        />
        <div>
          <h1>Filter</h1>
          <input
            type="text"
            onChange={ this.setFilterValue }
            data-testid="name-filter"
          />
        </div>
        <div>
          <h1>Card List</h1>
          { filteredCards.map((card, index) => (
            <div key={ index }>
              <Card
                cardName={ card.cardName }
                cardDescription={ card.cardDescription }
                cardAttr1={ card.cardAttr1 }
                cardAttr2={ card.cardAttr2 }
                cardAttr3={ card.cardAttr3 }
                cardImage={ card.cardImage }
                cardRare={ card.cardRare }
                cardTrunfo={ card.cardTrunfo }
              />
              <button
                type="button"
                data-testid="delete-button"
                onClick={ () => this.onDeleteButtonClick(index) }
              >
                Excluir
              </button>
            </div>))}
        </div>
      </div>
    );
  }
}

export default App;

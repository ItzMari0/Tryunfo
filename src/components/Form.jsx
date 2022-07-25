import React, { Component } from 'react';

class Form extends Component {
  constructor() {
    super();

    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '',
      cardAttr2: '',
      cardAttr3: '',
      cardImage: '',
      cardRare: '',
      cardTrunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: false,
    };
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value });
  }

  // onSaveButtonClick, uma callback;

  render() {
    const { cardName, cardDescription, cardAttr1,
      cardAttr2, cardAttr3, cardImage, cardRare,
      cardTrunfo, hasTrunfo, isSaveButtonDisabled } = this.state;
    return (
      <form>
        <label htmlFor="input">
          <input
            type="text"
            data-testid="name-input"
            value={ cardName }
            onChange={ this.onInputChange }
          />
        </label>
        <label htmlFor="textarea">
          <textarea
            data-testid="description-input"
            value={ cardDescription }
            onChange={ this.onInputChange }
          />
        </label>
        <label htmlFor="input">
          <input
            type="number"
            data-testid="attr1-input"
            value={ cardAttr1 }
            onChange={ this.onInputChange }
          />
        </label>
        <label htmlFor="input">
          <input
            type="number"
            data-testid="attr2-input"
            value={ cardAttr2 }
            onChange={ this.onInputChange }
          />
        </label>
        <label htmlFor="input">
          <input
            type="number"
            data-testid="attr3-input"
            value={ cardAttr3 }
            onChange={ this.onInputChange }
          />
        </label>
        <label htmlFor="input">
          <input
            type="text"
            data-testid="image-input"
            value={ cardImage }
            onChange={ this.onInputChange }
          />
        </label>
        <label htmlFor="select">
          <select
            data-testid="rare-input"
            value={ cardRare }
            onChange={ this.onInputChange }
          >
            <option value="normal">normal</option>
            <option value="raro">raro</option>
            <option value="muito raro">muito raro</option>
          </select>
        </label>
        <label htmlFor="input">
          <input
            type="checkbox"
            data-testid="trunfo-input"
            checked={ cardTrunfo }
            onChange={ this.onInputChange }
          />
        </label>
        <button
          type="button"
          data-testid="save-button"
          disabled={ isSaveButtonDisabled }
          onClick={ this.onSaveButtonClick }
        >
          Salvar
        </button>
      </form>
    );
  }
}

export default Form;

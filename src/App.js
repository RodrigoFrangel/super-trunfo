import React from 'react';
import Card from './components/Card';
import Form from './components/Form';

class App extends React.Component {
  state = {
    cardName: '',
    cardDescription: '',
    cardImage: '',
    cardAttr1: '0',
    cardAttr2: '0',
    cardAttr3: '0',
    cardRare: 'normal',
    cardTrunfo: false,
    hasTrunfo: false,
    isSaveButtonDisabled: true,
    savedCards: [],
    nameFilter: '',
    rareFilter: '',
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value }, this.isButtonEnabled);
  }

  isButtonEnabled = () => {
    const {
      cardName,
      cardDescription,
      cardImage,
      cardAttr1,
      cardAttr2,
      cardAttr3,
    } = this.state;

    const attrInput1 = Number(cardAttr1);
    const attrInput2 = Number(cardAttr2);
    const attrInput3 = Number(cardAttr3);
    const allAttrInputs = (attrInput1 + attrInput2 + attrInput3);

    if (
      cardName !== ''
      && cardImage !== ''
      && cardDescription !== ''
      && cardAttr1 <= '90' && cardAttr1 >= '0'
      && cardAttr2 <= '90' && cardAttr2 >= '0'
      && cardAttr3 <= '90' && cardAttr3 >= '0'
      && allAttrInputs <= '210') {
      this.setState({ isSaveButtonDisabled: false });
    } else {
      this.setState({ isSaveButtonDisabled: true });
    }
  }

  saveTrunfoCards = () => {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      savedCards,
    } = this.state;

    if (cardTrunfo) {
      this.setState({ hasTrunfo: true });
    }

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

    const trunfoCardList = savedCards;
    trunfoCardList.push(newCard);
    this.setState({
      cardName: '',
      cardDescription: '',
      cardImage: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardRare: 'normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
      savedCards: trunfoCardList,
    });
  }

  deleteCard = (deckCard) => {
    const { savedCards, hasTrunfo } = this.state;
    if (hasTrunfo) {
      this.setState({ hasTrunfo: false });
    }
    const clearDeck = savedCards.filter((card) => (card.cardName !== deckCard));
    this.setState({ savedCards: clearDeck });
  }

  filterCardsByName = ({ target }) => {
    this.setState({
      nameFilter: target.value,
    });
  }

  filterCardByRarity = ({ target }) => {
    if (target.value === 'todas') {
      this.setState({
        rareFilter: '',
      });
    } else {
      this.setState({
        rareFilter: target.value,
      });
    }
  }

  render() {
    const {
      savedCards,
      nameFilter,
      rareFilter,
    } = this.state;

    return (
      <section>
        <h1 id="header">SUPER TRUNFO</h1>
        <section id="main-content">
          <section id="add-card">
            <h2 id="form-title">Adicionar nova carta</h2>
            <Form
              { ...this.state }
              onInputChange={ this.handleChange }
              onSaveButtonClick={ this.saveTrunfoCards }
            />
          </section>
          <section id="preview-card">
            <h2 id="card-title">Pré-visualização</h2>
            <Card
              { ...this.state }
            />
          </section>
        </section>
        <section id="card-list">
          <h2 id="deck-title">Cartas do Deck</h2>
          <div id="filter-container">
            <h3 id="filter-title">Filtro:</h3>
            <input
              type="text"
              data-testid="name-filter"
              id="name-filter"
              placeholder="Nome da carta"
              onChange={ this.filterCardsByName }
            />
            <select
              data-testid="rare-filter"
              id="rare-filter"
              placeholder="Raridade"
              onChange={ this.filterCardByRarity }
            >
              <option>todas</option>
              <option>normal</option>
              <option>raro</option>
              <option>muito raro</option>
            </select>
          </div>
          <div id="deck-cards">
            {savedCards
              .filter((card) => card.cardName.includes(nameFilter))
              .filter((card) => (
                (rareFilter.length > 0 ? card.cardRare === rareFilter : card)))
              .map((card) => (
                <div id="saved-card" key={ card.cardName }>
                  <Card
                    { ...card }
                  />
                  <button
                    type="button"
                    data-testid="delete-button"
                    id="delete-button"
                    onClick={ () => this.deleteCard(card.cardName) }
                  >
                    Excluir
                  </button>
                </div>
              ))}
          </div>
        </section>
      </section>
    );
  }
}

export default App;

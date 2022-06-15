import React from 'react';
import Card from './components/Card';
import Form from './components/Form';

class App extends React.Component {
  state = {
    cardName: '',
    cardDescription: '',
    cardImage: '',
    cardAttr1: '0', // precisa ser uma string
    cardAttr2: '0', // para depois ser convertido
    cardAttr3: '0', // em um tipo number
    cardRare: '',
    cardTrunfo: false,
    hasTrunfo: false,
    isSaveButtonDisabled: true,
    savedCards: [], // vamos armazenar todas cartas? vamoooss!
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value }, this.isButtonEnabled);
  }

  // mudança de nome pra ficar mais semântico
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

  // funçãozinha para salvar as cartas
  saveTrunfoCards = () => {
    const { cardTrunfo } = this.state;
    if (cardTrunfo) {
      this.setState({ hasTrunfo: true });
    }

    this.setState((prevState) => ({
      savedCards: [...prevState.savedCards, prevState],
      cardName: '',
      cardDescription: '',
      cardImage: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardRare: 'normal',
      cardTrunfo: false,
    }));
  }

  deleteCard = (deckCard) => {
    const { savedCards } = this.state;
    const isSuperTrunfo = savedCards.find(() => (deckCard.cardTrunfo));
    if (isSuperTrunfo.cardTrunfo) {
      this.setState({ hasTrunfo: false });
    }
    const clearDeck = savedCards.filter((card) => (deckCard.cardName !== card.cardName));
    this.setState({ savedCards: clearDeck });
  }

  render() {
    const { savedCards } = this.state;

    return (
      <section>
        <h1 id="header">TRYUNFO</h1>
        <section id="main-content">
          <section id="add-card">
            <h2 id="form-title">Adicionar nova carta</h2>
            <Form
              { ...this.state } // santo spread operator 🙏
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
          {savedCards.map((card, index) => (
            <div id="saved-card" key={ `${card.cardName} ${index}` }>
              <Card
                cardName={ card.cardName }
                cardImage={ card.cardImage }
                cardDescription={ card.cardDescription }
                cardAttr1={ card.cardAttr1 }
                cardAttr2={ card.cardAttr2 }
                cardAttr3={ card.cardAttr3 }
                cardRare={ card.cardRare }
                cardTrunfo={ card.cardTrunfo }
              />
              <button
                type="button"
                data-testid="delete-button"
                id="delete-button"
                onClick={ () => this.deleteCard(card) }
              >
                Excluir
              </button>
            </div>
          ))}
        </section>
      </section>
    );
  }
}

export default App;

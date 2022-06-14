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
    savedCards: [], // vamos armazenar todas cartas? vamoooss!
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  // se a função não for chamada aqui, requisito 6 falha :(
  resetState = () => {
    this.setState({
      cardName: '',
      cardDescription: '',
      cardImage: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardRare: 'normal',
    });
  }

  // funçãozinha para salvar as cartas
  saveTrunfoCards = () => {
    const {
      cardName,
      cardDescription,
      cardImage,
      cardAttr1,
      cardAttr2,
      cardAttr3,
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
      cardImage,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardRare,
      cardTrunfo,
    };

    const trunfoCardsList = savedCards;
    trunfoCardsList.push(newCard);

    this.setState({
      savedCards: trunfoCardsList,
    });

    this.resetState();
  }

  //               ↓↓↓ 'target' pega um card lá do array 'savedCards'
  deleteCard = ({ target }) => {
    if (target) {
      this.setState({
        savedCards: [],
      });
    }
  }

  render() {
    const {
      cardName,
      cardRare,
      cardTrunfo,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      hasTrunfo,
      savedCards,
    } = this.state;

    const attrInput1 = Number(cardAttr1);
    const attrInput2 = Number(cardAttr2);
    const attrInput3 = Number(cardAttr3);
    const allAttrInputs = (attrInput1 + attrInput2 + attrInput3);

    const buttonDemands = cardName !== ''
    && cardDescription !== ''
    && cardImage !== ''
    && cardRare !== ''
    && cardAttr1.length > 0
    && cardAttr2.length > 0
    && cardAttr3.length > 0
    && cardAttr1 <= '90' && cardAttr1 >= '0' // precisa ser uma string
    && cardAttr2 <= '90' && cardAttr2 >= '0' // caso contrário, não passa
    && cardAttr3 <= '90' && cardAttr3 >= '0' // (provavelmente por causa da validação)
    && allAttrInputs <= '210';

    return (
      <section>
        <h1 id="header">TRYUNFO</h1>
        <section id="main-content">
          <section id="add-card">
            <h2 id="form-title">Adicionar nova carta</h2>
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
              onInputChange={ this.handleChange }
              isSaveButtonDisabled={ !buttonDemands } // se não atender as demandas, botão fica desativado
              onSaveButtonClick={ this.saveTrunfoCards }
            />
          </section>
          <section id="preview-card">
            <h2 id="card-title">Pré-visualização</h2>
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
          </section>
        </section>
        <section id="card-list">
          <h2 id="deck-title">Cartas do Deck</h2>
          {savedCards.map((savedCard, keyProp) => (
            <div id="saved-card" key={ keyProp }>
              <Card
                cardName={ savedCard.cardName }
                cardImage={ savedCard.cardImage }
                cardDescription={ savedCard.cardDescription }
                cardAttr1={ savedCard.cardAttr1 }
                cardAttr2={ savedCard.cardAttr2 }
                cardAttr3={ savedCard.cardAttr3 }
                cardRare={ savedCard.cardRare }
                cardTrunfo={ savedCard.cardTrunfo }
              />
              <button
                type="button"
                data-testid="delete-button"
                id="delete-button"
                onClick={ this.deleteCard }
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

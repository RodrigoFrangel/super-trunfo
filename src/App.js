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
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
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
              onInputChange={ this.handleChange }
              isSaveButtonDisabled={ !buttonDemands } // se não atender as demandas, botão fica desativado
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
      </section>
    );
  }
}

export default App;

import React from 'react';

class Form extends React.Component {
  render() {
    return (
      <div>
        <form>
          <h2>Adicionar nova carta</h2>
          <label htmlFor="name-input">
            Nome
            <br />
            <input
              type="text"
              data-testid="name-input"
              id="name-input"
              placeholder="Placeholder"
            />
          </label>
          <label htmlFor="description-input">
            <br />
            Descrição
            <br />
            <textarea data-testid="description-input" id="description-input" />
          </label>
          <br />
          <label htmlFor="attr1-input">
            Attr01
            <input type="number" data-testid="attr1-input" id="attr1-input" />
          </label>
          <br />
          <label htmlFor="attr2-input">
            Attr02
            <input type="number" data-testid="attr2-input" id="attr2-input" />
          </label>
          <br />
          <label htmlFor="attr3-input">
            Attr03
            <input type="number" data-testid="attr3-input" id="attr3-input" />
          </label>
          <br />
          <label htmlFor="image-input">
            Imagem
            <input type="text" data-testid="image-input" id="image-input" />
          </label>
          <label htmlFor="rare-input">
            <br />
            Raridade
            <br />
            <select data-testid="rare-input" id="rare-input">
              <option value="normal">Normal</option>
              <option value="raro">Raro</option>
              <option value="muito raro">Muito raro</option>
              <option selected hidden disabled>Placeholder</option>
            </select>
          </label>
          <br />
          <label htmlFor="trunfo-input">
            <input type="checkbox" data-testid="trunfo-input" id="trunfo-input" />
            Super Trybe Trunfo
          </label>
          <br />
          <button type="submit" data-testid="save-button">Salvar</button>
        </form>
      </div>
    );
  }
}

export default Form;

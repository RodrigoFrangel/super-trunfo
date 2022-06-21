import React from 'react';
import PropTypes from 'prop-types';

class Card extends React.Component {
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
    } = this.props;

    return (
      <section id="card-preview">
        <div id="main-info">
          <h2 data-testid="name-card" id="name-card">{ cardName }</h2>
          <img data-testid="image-card" src={ cardImage } alt={ cardName } />
          <p data-testid="description-card" id="description-card">{ cardDescription }</p>
        </div>
        <div id="attributes">
          <div className="attr">
            <p className="attr-title">Atributo 1</p>
            <h4 data-testid="attr1-card" className="attr-card">{ cardAttr1 }</h4>
          </div>
          <div className="attr">
            <p className="attr-title">Atributo 2</p>
            <h4 data-testid="attr2-card" className="attr-card">{ cardAttr2 }</h4>
          </div>
          <div className="attr">
            <p className="attr-title">Atributo 3</p>
            <h4 data-testid="attr3-card" className="attr-card">{ cardAttr3 }</h4>
          </div>
        </div>
        <div id="other-info">
          <p data-testid="rare-card" id="rare-card">{ cardRare }</p>
          {
            cardTrunfo
              && <p data-testid="trunfo-card" id="trunfo-card">Super Trunfo</p>
          }
        </div>
      </section>
    );
  }
}

Card.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired, // de 'string' para 'bool' again
};

export default Card;

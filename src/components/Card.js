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
      <div id="card-preview">
        <h2 data-testid="name-card" id="name-card">{ cardName }</h2>
        <img src={ cardImage } alt={ cardName } data-testid="image-card" />
        <p data-testid="description-card" id="description-card">{ cardDescription }</p>
        <h4 data-testid="attr1-card" id="attr1-card">{ cardAttr1 }</h4>
        <h4 data-testid="attr2-card" id="attr2-card">{ cardAttr2 }</h4>
        <h4 data-testid="attr3-card" id="attr3-card">{ cardAttr3 }</h4>
        <p data-testid="rare-card" id="rare-card">{ cardRare }</p>
        {
          cardTrunfo
            ? <p data-testid="trunfo-card" id="trunfo-card">Super Trunfo</p>
            : false
        }
      </div>
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
  cardTrunfo: PropTypes.bool.isRequired,
};

export default Card;

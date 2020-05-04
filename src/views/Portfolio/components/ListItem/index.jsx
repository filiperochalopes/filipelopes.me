import React, { Component } from 'react';

class PortfolioItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      backgroundColor: '#000',
      nextTimes: this.props.times,
    };
  }

  filterItem = (item) => {
    if (item.type) {
      switch (item.type) {
        case 'cover':
          return (
            <img
              className="children"
              src={'/img/portfolio/cover/' + item.url}
              alt="Imagem de capa de potfólio"
            />
          );
        case 'img':
          return (
            <img
              className="children"
              src={'/img/portfolio/' + item.url}
              alt="Imagem de Porfólio"
            />
          );
        case 'text':
          return <div className="children">{item.url}</div>;
        case 'link':
          return <div className="children">{item.url}</div>;
        case 'video':
          return <div className="children">{item.url}</div>;
        default:
          return <div className="children">{item.url}</div>;
      }
    } else {
      return 'Erro, sem resultados';
    }
  };

  render() {
    const item = this.props.item;

    return (
      <div className="portfolio_item_container">
        <div className="portfolio_item">{this.filterItem(item)}</div>
      </div>
    );
  }
}

export default PortfolioItem;

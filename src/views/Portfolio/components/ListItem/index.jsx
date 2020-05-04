import React, { Component } from 'react';

import IconButton from '@material-ui/core/IconButton';
import ButtonBase from '@material-ui/core/ButtonBase';

import OnVisible from 'react-on-visible';

import Palette from 'react-palette';

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
            />
          );
          break;
        case 'img':
          return (
            <img className="children" src={'/img/portfolio/' + item.url} />
          );
          break;
        case 'text':
          return <div className="children">{item.url}</div>;
          break;
        case 'link':
          return <div className="children">{item.url}</div>;
          break;
        case 'video':
          return <div className="children">{item.url}</div>;
          break;
        default:
          return <div className="children">{item.url}</div>;
          break;
      }
    } else {
      return 'Erro, sem resultados';
    }
  };

  // componentWillReceiveProps = (nextProps) => {
  // 	console.log("recebeu props", nextProps);
  // 	console.log("recebeu props", this.props);
  // }

  // shouldComponentUpdate = (nextProps, nextState) => {
  // 	console.log("chamou should item", nextProps.times == this.state.nextTimes);

  // 	// if(nextProps.times == this.state.nextTimes){
  // 	// 	return false;
  // 	// }

  //   return true;
  // }

  // componentDidUpdate = () => {
  // 	console.log("update");
  // }

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

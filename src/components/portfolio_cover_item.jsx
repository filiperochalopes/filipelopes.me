import React, { Component } from 'react';
import Pixelate from 'pixelate';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class PortfolioCoverItem extends Component {

  constructor(props) {
    super(props);

    this.coverRef = React.createRef();

    this.state = {
      data: [],
      pixel: 0
    }

  }

  requestAnimation = null;

  logFunc = (num) => {
    //Math.log(x) / Math.log(outraBase)
    return ((Math.log(num) / Math.log(250)) + 2.5) * 0.38
  }

  over = () => {
    let pixelState = this.state.pixel;
    cancelAnimationFrame(this.requestAnimation);

    let pixel = this.state.pixel + 0.1;
    this.pixelate.setAmount(this.logFunc(pixelState)).render();
    if (this.state.pixel < 1) {
      this.setState({ pixel })
      this.requestAnimation = requestAnimationFrame(this.over);
    } else {
      this.setState({ pixel: 0.8 });
    }
  }

  out = () => {
    let pixelState = this.state.pixel;
    cancelAnimationFrame(this.requestAnimation);

    let pixel = this.state.pixel - 0.08;
    this.pixelate.setAmount(this.logFunc(pixelState)).render();
    if (this.state.pixel > 0) {
      this.setState({ pixel });
      this.requestAnimation = requestAnimationFrame(this.out);
    } else {
      this.setState({ pixel: 0 });
    }
  }

  // getPortfolio = () => {
  // fetch("http://localhost/sites/server.filipelopes.me/get_portfolio.php")
  // // fetch("https://server.filipelopes.me/get_put_views.php")
  // .then(function(response) {
  //   return response.text();
  // }).then((data) => {     
  //   data = JSON.parse(data);
  //   console.log(data);

  //   this.setState({
  // 		data
  //   })    
  // })
  // }

  componentDidMount = () => {
    this.pixelate = new Pixelate(this.coverRef.current)
  }

  render() {
    const item = this.props.item;

    if (item.items) {
      return (
        <div className="portfolio_item_wrap" onMouseOver={() => {
          window.requestAnimationFrame(this.over);
        }} onMouseOut={() => {
          window.requestAnimationFrame(this.out);
        }} key={item.id}>
          <Link to={"/portfolio/" + item.slug}>
            <div className="info">
              <h4>{item.name}</h4>
              <ul className="categories">{item.categories.map(category => (
                <li key={category} >{category}</li>
              ))}</ul>
              <span className="description">{item.description}</span>
              <ul className="tags">{item.tags.map(tag => (
                <li key={tag} >{tag}</li>
              ))}</ul>
            </div>
            <div className="curtain"></div>
            <div className="curtain_over"></div>
            {item.items.filter(portfolioItem => (
              portfolioItem.type == "cover"
            )).map((portfolioItem, i) => (
              <img key={i} ref={this.coverRef} src={"/img/portfolio/cover/" + portfolioItem.url} />
            ))}
          </Link>
        </div>
      )
    }
  }

}

export default PortfolioCoverItem;

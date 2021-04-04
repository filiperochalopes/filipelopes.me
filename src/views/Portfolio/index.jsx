import PortfolioItem from './components/ListItem';
import PortfolioCoverItem from './components/SlideItem';

import AppContext from 'services/AppContext';
import Contato from '../../components/Contact';
import Footer from '../../components/Footer';

import IconButton from '@material-ui/core/IconButton';
import ShareBt from 'components/ShareBt';
import Carousel from 'nuka-carousel';
import React, { Component } from 'react';
import OnVisible from 'react-on-visible';
import Palette from 'react-palette';
import { Link } from 'react-router-dom';

class Portfolio extends Component {
  constructor(props) {
    super(props);

    this.backgroundRef = React.createRef();
    this.portfolioItemsBaseColors = [];

    this.state = {
      data: [
        {
          name: 'Carregando...',
          slug: 'carregando',
          description: 'carregando...',
          items: [{ type: 'cover', url: 'carregando.jpg' }],
          categories: ['carregando...'],
          tags: ['carregando...'],
        },
      ],
      atual: {
        items: [],
      },
      pixel: 0,
      backgroundColor: '#252525',
      currentIndex: 0,
    };
  }

  requestAnimation = null;

  getPortfolio = () => {
    fetch('http://192.168.0.64/sites/server.filipelopes.me/get_portfolio.php')
      // fetch("https://server.filipelopes.me/get_put_views.php")
      .then(function (response) {
        return response.text();
      })
      .then(data => {
        data = JSON.parse(data);
        console.log(data);

        this.setState({
          data,
        });
      });
  };

  getPortfolioItem = slug => {
    fetch(
      'http://192.168.0.64/sites/server.filipelopes.me/get_portfolio_item.php?slug=' +
        slug
    )
      // fetch("https://server.filipelopes.me/get_put_views.php")
      .then(function (response) {
        return response.text();
      })
      .then(atual => {
        atual = JSON.parse(atual);
        this.setState({
          atual,
        });
      });
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    console.log(
      'chamou should',
      nextProps.match.params.name === this.props.match.params.name
    );

    if (this.props.match.params.name) {
      // if (this.state.atual.slug === nextState.atual.slug && this.state.nextTimes === nextState.nextTimes) {
      if (this.state.atual.slug === nextState.atual.slug) {
        return false;
      }
    }

    return true;
  };

  componentDidUpdate = () => {
    if (this.props.match.params.name) {
      this.getPortfolioItem(this.props.match.params.name);
    }
  };

  componentDidMount = () => {
    if (this.props.match.params.name) {
      this.getPortfolioItem(this.props.match.params.name);
    }
  };

  goBack = () => {
    this.setState({
      atual: {
        items: [],
      },
    });
    window.history.back();
  };

  getBackground = e => {
    console.log('pediu pra trocar');
    console.log(e.target.backgroundcolor);
  };

  getUrl = item => {
    switch (item.type) {
      case 'cover':
        return '/img/portfolio/cover/' + item.url;
      case 'img':
        return '/img/portfolio/' + item.url;
      default:
        return '/img/portfolio/defaultBackground.jpg';
    }
  };

  backgroundArrayPush = (palette, i) => {
    console.log(palette);

    this.portfolioItemsBaseColors[i] = palette.darkMuted;
    console.log(this.portfolioItemsBaseColors, this.state.currentIndex);

    this.backgroundRef.current.style.backgroundColor = this.portfolioItemsBaseColors[
      this.state.currentIndex
    ];
  };

  afterSlide = currentIndex => {
    if (this.props.match.params.name) {
      //estava dando erro caso passasse o slide e fechasse antes de completar
      this.setState(
        {
          currentIndex,
        },
        () => {
          this.backgroundRef.current.style.backgroundColor = this.portfolioItemsBaseColors[
            this.state.currentIndex
          ];
        }
      );
    }
  };

  changeIndex = move => {
    if (this.backgroundRef.current) {
      let prev = this.state.currentIndex - 1;
      let next = this.state.currentIndex + 1;

      console.log('changeIndex', move, prev, next);

      if (move === 'prev') {
        this.setState({
          currentIndex: prev,
        });
        this.backgroundRef.current.style.backgroundColor = this.portfolioItemsBaseColors[
          prev
        ];
      } else if (move === 'next') {
        this.setState({
          currentIndex: next,
        });
        this.backgroundRef.current.style.backgroundColor = this.portfolioItemsBaseColors[
          next
        ];
      }
    }
  };

  render() {
    if (this.props.match.params.name) {
      return (
        <section
          id="portfolio_item"
          ref={this.backgroundRef}
          style={{
            backgroundColor: this.state.backgroundColor,
          }}
        >
          {this.state.atual.items.map((item, i) => (
            <Palette key={i} image={this.getUrl(item)}>
              {palette => (
                <div
                  className="getBackground"
                  style={{
                    backgroundColor: palette.lightMuted,
                    display: 'none',
                  }}
                >
                  {this.backgroundArrayPush(palette, i)}
                </div>
              )}
            </Palette>
          ))}
          <header>
            <IconButton onClick={this.goBack}>
              <i className="fas fa-long-arrow-alt-left"></i>
            </IconButton>
            {this.state.atual.name}
          </header>
          {/* <Palette> */}
          <div id="carousel" times={this.state.nextTimes}>
            <Carousel
              renderCenterLeftControls={({ previousSlide }) => (
                <IconButton
                  size="small"
                  onClick={() => {
                    previousSlide();
                    this.changeIndex('prev');
                  }}
                >
                  <i className="fas fa-arrow-left"></i>
                </IconButton>
              )}
              renderCenterRightControls={({ nextSlide }) => (
                <IconButton
                  onClick={() => {
                    nextSlide();
                    this.changeIndex('next');
                  }}
                >
                  <i className="fas fa-arrow-right"></i>
                </IconButton>
              )}
              renderBottomCenterControls={() => null}
              afterSlide={currentIndex => {
                this.afterSlide(currentIndex);
              }}
              swiping={true}
            >
              {this.state.atual.items.map((item, i) =>
                console.log(i)(
                  <PortfolioItem
                    // backgroundColor={this.changeBackColor}
                    item={item}
                    key={i}
                    backgroundColor={i}
                  />
                )
              )}
            </Carousel>
          </div>
          {/* </Palette> */}
        </section>
      );
    } else {
      return [
        <AppContext.Consumer key="contextConsumer">
          {context => (
            <section>
              <div className="container">
                <h1>
                  <Link to="/portfolio">
                    Portfólio <i className="fas fa-external-link-alt"></i>
                  </Link>{' '}
                  <ShareBt whatsapp="whatsapp://send?text=Veja o meu currículo: https://filipelopes.me/curriculo" />
                </h1>
                {/* <PortfolioSearch/> */}
                <OnVisible
                  className="flex"
                  visibleClassName="visible"
                  percent={150}
                  wrappingElement="div"
                  onChange={this.getPortfolio}
                >
                  {this.state.data.map((item, i) => (
                    <PortfolioCoverItem key={i} item={item} />
                  ))}
                </OnVisible>
              </div>
            </section>
          )}
        </AppContext.Consumer>,
        <Contato key="contact" />,
        <Footer key="footer" />,
      ];
    }
  }
}

export default Portfolio;

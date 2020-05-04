import React, { Component } from 'react';
import AvatarHeader from './Header/components/Avatar';
import NavHeader from './header_nav';
import SobreMim from '../views/Index/components/AboutMe/header_sobremim';
import UnderConstruction from './under_construction';
import Button from '@material-ui/core/Button';

const headerTheme = {
  neutral: {
    background: '#363636',
    color: '#a8a8a8',
    avatarBackground: '#363636',
    avatarShirt: '#363636',
  },
  orange: {
    background: '#954223',
    color: '#bebebe',
    avatarBackground: '#954223',
    avatarShirt: '#bebebe',
  },
  green: {
    background: '#2d5248',
    color: '#f2f2f2',
    avatarBackground: '#2d5248',
    avatarShirt: '#f2f2f2',
  },
  purple: {
    background: '#442d52',
    color: '#e0e0e0',
    avatarBackground: '#442d52',
    avatarShirt: '#e0e0e0',
  },
};

class Header extends Component {
  constructor(props) {
    super(props);

    const arrayTheme = ['neutral', 'orange', 'green', 'purple'];
    const metaThemeColor = document.querySelector('meta[name=theme-color]');

    let selectedTheme =
      arrayTheme[Math.floor(Math.random() * arrayTheme.length)];

    this.changeHeaderTheme = () => {
      let selectedTheme =
        arrayTheme[Math.floor(Math.random() * arrayTheme.length)];
      this.setState(
        {
          headerTheme: {
            background: headerTheme[selectedTheme].background,
            color: headerTheme[selectedTheme].color,
          },
        },
        () => {
          metaThemeColor.setAttribute(
            'content',
            this.state.headerTheme.background
          );
        }
      );
    };

    this.state = {
      headerTheme: {
        background: headerTheme[selectedTheme].background,
        color: headerTheme[selectedTheme].color,
      },
    };

    metaThemeColor.setAttribute('content', this.state.headerTheme.background);
  }

  render() {
    return (
      <React.Fragment>
        <UnderConstruction headerTheme={this.state.headerTheme} />
        <header style={this.state.headerTheme}>
          <div className="container bigpadd header">
            <NavHeader />
            <div className="block">
              <div className="flex-center nowrap">
                <AvatarHeader />
                <SobreMim />
                <Button
                  className="bt_header_theme"
                  onClick={this.changeHeaderTheme}
                >
                  Alterar tema
                </Button>
              </div>
            </div>
          </div>
        </header>
      </React.Fragment>
    );
  }
}

export default Header;

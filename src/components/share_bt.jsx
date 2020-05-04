import IconButton from '@material-ui/core/IconButton';
import React, { Component } from 'react';
import OnVisible from 'react-on-visible';

class ShareBt extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: 'none',
    };
  }

  changeStatus = () => {
    if (this.state.status == 'none') {
      this.setState({ status: 'flex' });
    } else {
      this.setState({ status: 'none' });
    }
  };

  render() {
    return (
      <div className="share_bt">
        <IconButton onClick={this.changeStatus}>
          <i className="fas fa-share-alt"></i>
        </IconButton>
        <div className="submenu" style={{ display: this.state.status }}>
          <a
            href="whatsapp://send?text=Veja o site de Filipe Lopes. https://filipelopes.me"
            data-action="share/whatsapp/share"
          >
            <IconButton className="whatsapp" onClick={this.changeStatus}>
              <i className="fab fa-whatsapp"></i>
            </IconButton>
          </a>
          <a
            href="mailto:?Subject=Simple Share Buttons&amp;Body=I%20saw%20this%20and%20thought%20of%20you!%20 https://simplesharebuttons.com"
            target="_blank"
          >
            <IconButton className="mail" onClick={this.changeStatus}>
              <i className="far fa-envelope"></i>
            </IconButton>
          </a>
          <a
            href="http://www.facebook.com/sharer.php?u=https://simplesharebuttons.com"
            target="_blank"
          >
            <IconButton className="facebook" onClick={this.changeStatus}>
              <i className="fab fa-facebook-f"></i>
            </IconButton>
          </a>
        </div>
      </div>
    );
  }
}

export default ShareBt;

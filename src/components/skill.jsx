import React, { Component } from 'react';

import OnVisible from 'react-on-visible';
import Button from '@material-ui/core/Button';

class Skill extends Component {
  constructor(props) {
    super(props);

    this.state = {
      barStatus: 0,
      barStatusLimit: props.percent,
      isToggleOn: true,
      resumeDisplay: "block",
      detailsDisplay: "none"
    }
  }

  readSkills = (skills) => {
    let listSkills = [];
    skills.map((data, i) => {
      listSkills.push(<li key={i}><div className="img"><img src={`/img/${data[2] || data[0]}.jpg`}/></div><span>{data[0]}<span className={this.returnBarColor(this.props.percent)} style={{ width: `${data[1]}px`}}></span></span></li>);
    });

    return (
      listSkills
    );
  }

  step = () => {
    let p = this.state.barStatus + 1;
    this.setState({ barStatus: p })
    if (this.state.barStatus < this.state.barStatusLimit) {
      requestAnimationFrame(this.step);
    }
  }

  click = () => {
    if(this.state.isToggleOn){
      this.setState({ isToggleOn: false, resumeDisplay: "none", detailsDisplay: "block"});
    }else{
      this.setState({ isToggleOn: true, resumeDisplay: "block", detailsDisplay: "none"});
    }

    console.log("click");
  }

  returnBarColor = (percent) => {
    if(percent >= 70){
      return "__good"
    }else if(percent < 40){
      return "__bad"
    }else{
      return "__normal"
    }
  }

  render() {
    return (
      <OnVisible
        className={this.props.className}
        visibleClassName="visible"
        percent={150}
        wrappingElement="li"
        onChange={() => {
          window.requestAnimationFrame(this.step);
        }}>
        <div className="img" style={{ backgroundImage : `url(/img/${this.props.img})` }}></div>
        <div className="info">
          <div className="title" onClick={this.click}>{this.props.children}</div>
          <div className="bar">
          <div className={`fill ${this.returnBarColor(this.props.percent)}`} style={{ width: this.state.barStatus + "%" }}><div className="number">{this.state.barStatus}%</div></div></div>
          <div className="resume" style={{ 
            display: this.state.resumeDisplay }}>{this.props.resume}</div>
          <ul className="details" style={{ 
            display: this.state.detailsDisplay }}>
            <li className="skillsub">
              <ul>{this.readSkills(this.props.skills)}</ul>
            </li>
            <li className="xp"></li>
            <li className="courses"></li>
            {/* <li className="portfolio"><Button>Ver em portfólio</Button></li> */}
          </ul>
        </div>
      </OnVisible>
    );
  }
}

export default Skill;
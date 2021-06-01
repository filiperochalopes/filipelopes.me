import Skill from './styles';

import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';
import OnVisible from 'react-on-visible';

export default ({ level, imgUrl, description, children, skills }) => {
  const [visible, setVisible] = useState(false);
  const [barStatus, setBarStatus] = useState(0);
  const barStatusLimit = level;
  const [state, setState] = useState({
    isToggleOn: true,
    resumeDisplay: 'block',
    detailsDisplay: 'none',
  });

  const readSkills = skills => {
    let listSkills = [];
    skills.forEach(({ name, icon, level }, i) => {
      listSkills.push(
        <li key={i}>
          <div className="img">
            <img src={icon} alt="Habilidade" />
          </div>
          <span>
            {name}
            <span
              className={returnBarColor(level)}
              style={{ width: `${level}px` }}
            ></span>
          </span>
        </li>
      );
    });

    return listSkills;
  };

  const step = useCallback(() => {
    setBarStatus(barStatus + 1);
  }, [barStatus]);

  useEffect(() => {
    if (barStatus < barStatusLimit && visible) {
      window.requestAnimationFrame(step);
    }
  }, [barStatus, barStatusLimit, step, visible]);

  const click = () => {
    if (readSkills(skills).length > 0) {
      if (state.isToggleOn) {
        setState({
          isToggleOn: false,
          resumeDisplay: 'none',
          detailsDisplay: 'block',
        });
      } else {
        setState({
          isToggleOn: true,
          resumeDisplay: 'block',
          detailsDisplay: 'none',
        });
      }
    }
  };

  const returnBarColor = percent => {
    if (percent >= 70) {
      return '__good';
    } else if (percent < 40) {
      return '__bad';
    } else {
      return '__normal';
    }
  };

  return (
    <OnVisible
      visibleClassName="visible"
      wrappingElement="li"
      bounce={false}
      percent={150}
      onChange={visible => {
        setVisible(visible);
      }}
    >
      <Skill className={visible ? 'visible' : ''}>
        <div
          className="img"
          style={{ backgroundImage: `url(${imgUrl})` }}
        ></div>
        <div className="info">
          <div
            className={`title ${readSkills(skills).length > 0 ? 'click' : ''}`}
            onClick={click}
          >
            {children}
          </div>
          <div className="bar">
            <div
              className={`fill ${returnBarColor(level)}`}
              style={{ width: barStatus + '%' }}
            >
              <div className="number">{barStatus}%</div>
            </div>
          </div>
          <div
            className="resume"
            style={{
              display: state.resumeDisplay,
            }}
          >
            {description}
          </div>
          <ul
            className="details"
            style={{
              display: state.detailsDisplay,
            }}
          >
            {readSkills(skills)}
            {/* <li className="xp"></li> */}
            {/* <li className="courses"></li> */}
            {/* <li className="portfolio"><Button>Ver em portfólio</Button></li> */}
          </ul>
        </div>
      </Skill>
    </OnVisible>
  );
};

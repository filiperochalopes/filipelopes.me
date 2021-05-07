import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';
import OnVisible from 'react-on-visible';
import Skill from './styles';

export default ({ percent, className, imgUrl, resume, children, skills }) => {
  const [visible, setVisible] = useState(false);
  const [barStatus, setBarStatus] = useState(0);
  const barStatusLimit = percent;
  const [state, setState] = useState({
    isToggleOn: true,
    resumeDisplay: 'block',
    detailsDisplay: 'none',
  });

  const readSkills = skills => {
    let listSkills = [];
    skills.forEach((data, i) => {
      listSkills.push(
        <li key={i}>
          <div className="img">
            <img src={`/img/${data[2] || data[0]}.jpg`} alt="Habilidade" />
          </div>
          <span>
            {data[0]}
            <span
              className={returnBarColor(percent)}
              style={{ width: `${data[1]}px` }}
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
      className={className}
      visibleClassName="visible"
      wrappingElement="li"
      bounce={false}
      percent={150}
      onChange={visible => {
        setVisible(visible);
      }}
    >
      <Skill className={visible ? `${className} visible` : className}>
        <div
          className="img"
          style={{ backgroundImage: `url(/img/${imgUrl})` }}
        ></div>
        <div className="info">
          <div className="title" onClick={click}>
            {children}
          </div>
          <div className="bar">
            <div
              className={`fill ${returnBarColor(percent)}`}
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
            {resume}
          </div>
          <ul
            className="details"
            style={{
              display: state.detailsDisplay,
            }}
          >
            <li className="skillsub">
              <ul>{readSkills(skills)}</ul>
            </li>
            <li className="xp"></li>
            <li className="courses"></li>
            {/* <li className="portfolio"><Button>Ver em portfólio</Button></li> */}
          </ul>
        </div>
      </Skill>
    </OnVisible>
  );
};

import { Navigation, Buttons, Line } from './styles';

import TextLang from 'components/TextLang';
import React, { useRef, useState, useEffect } from 'react';

export default ({ items, activeItem, moveTo }) => {
  // Active navigation item. Should be underlined
  const activeItemRef = useRef(null);
  // Initial style params of underline
  const offsetTop = 10;
  const [lineParams, setParams] = useState({
    top: offsetTop,
    width: 0,
  });

  // If any item is active, create line
  useEffect(() => {
    if (activeItem === null || activeItem === 'intro') {
      setParams({
        top: lineParams.top,
        left: lineParams.left,
        width: 0,
      });
    }
    if (typeof activeItem !== 'undefined' && activeItemRef.current) {
      setParams({
        top: activeItemRef.current.offsetTop + offsetTop,
        left: activeItemRef.current.offsetLeft,
        width: activeItemRef.current.offsetWidth,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeItemRef, activeItem]);

  const handleOver = e => {
    setParams({
      top: e.target.offsetTop + offsetTop,
      left: e.target.offsetLeft,
      width: e.target.offsetWidth,
    });
  };

  const handleOut = e => {
    if (activeItem !== null) {
      setParams({
        top: activeItemRef.current.offsetTop + offsetTop,
        left: activeItemRef.current.offsetLeft,
        width: activeItemRef.current.offsetWidth,
      });
    } else {
      setParams({
        top: e.target.offsetTop + offsetTop,
        left: e.target.offsetLeft + e.target.offsetWidth / 2,
        width: 0,
      });
    }
  };

  return (
    <Navigation>
      <Buttons>
        {items.map((content, i) => (
          <a data-scroll href={`#${content.reference}`} key={i}>
            <button
              ref={i === activeItem ? activeItemRef : null}
              onMouseOver={handleOver}
              onMouseOut={handleOut}
              onClick={moveTo(i)}
              className={i === activeItem ? 'active' : null}
            >
              <TextLang ptBR={content.title_ptBR} enUS={content.title_enUS} />
            </button>
          </a>
        ))}
      </Buttons>
      <Line
        top={lineParams.top}
        left={lineParams.left}
        width={lineParams.width}
        background={true}
      />
    </Navigation>
  );
};

import { PixeledLogoWrap, PixeledLogo, Pixel } from './styles';

import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useContext,
} from 'react';
import AppContext from 'services/AppContext';
import { fetchData } from 'services/getters';
const logoColorMap = [
    '#3a3a3a',
    '#494949',
    '#626262',
    '#353535',
    '#3f3f3f',
    '#f8f8f8',
    '#fefefe',
  ],
  logoMatrix = [
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2],
    [0, 0, 0, 5, 5, 5, 6, 6, 6, 6, 6, 6, 1, 1, 1, 3, 3, 3],
    [0, 0, 0, 5, 5, 5, 6, 6, 6, 6, 6, 6, 1, 1, 1, 3, 3, 3],
    [0, 0, 0, 5, 5, 5, 6, 6, 6, 6, 6, 6, 1, 1, 1, 3, 3, 3],
    [1, 1, 1, 5, 5, 5, 4, 4, 4, 4, 4, 4, 5, 5, 5, 3, 3, 3],
    [1, 1, 1, 5, 5, 5, 4, 4, 4, 4, 4, 4, 5, 5, 5, 3, 3, 3],
    [1, 1, 1, 5, 5, 5, 4, 4, 4, 4, 4, 4, 5, 5, 5, 3, 3, 3],
    [1, 1, 1, 4, 4, 4, 6, 6, 6, 4, 4, 4, 6, 6, 6, 4, 4, 4],
    [1, 1, 1, 4, 4, 4, 6, 6, 6, 4, 4, 4, 6, 6, 6, 4, 4, 4],
    [1, 1, 1, 4, 4, 4, 6, 6, 6, 4, 4, 4, 6, 6, 6, 4, 4, 4],
    [3, 3, 3, 4, 4, 4, 4, 4, 4, 6, 6, 6, 5, 5, 5, 4, 4, 4],
    [3, 3, 3, 4, 4, 4, 4, 4, 4, 6, 6, 6, 5, 5, 5, 4, 4, 4],
    [3, 3, 3, 4, 4, 4, 4, 4, 4, 6, 6, 6, 5, 5, 5, 4, 4, 4],
    [1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1],
  ];

export default () => {
  const { language } = useContext(AppContext);
  const [logoMatrixState, setLogoMatrixState] = useState(logoMatrix);
  const [showPixeledLogoText, setShowPixeledLogoText] = useState(false);
  const [logoText, setLogoText] = useState(false);
  let interval = useRef();

  useEffect(() => {
    fetchData('/posts/pixel', language).then(data => setLogoText(data));
  }, [language]);

  const changeMatrix = useCallback(matrix => {
    if (matrix) {
      setLogoMatrixState(matrix);
    } else {
      let _logoMatrixState = [];
      for (let i = 0; i < 18; i++) {
        _logoMatrixState.push([]);
        for (let j = 0; j < 18; j++) {
          if (Math.random() >= 0.5) {
            _logoMatrixState[i][j] = Math.floor(Math.random() * 7);
          } else {
            _logoMatrixState[i][j] = logoMatrixState[i][j];
          }
        }
      }
      setLogoMatrixState(_logoMatrixState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startInterval = useCallback(() => {
    const logoMatrixCopy = [];
    logoMatrix.forEach(row => logoMatrixCopy.push([...row]));
    setLogoMatrixState(logoMatrixCopy);
    interval.current = setInterval(() => {
      changeMatrix();
    }, 2000);
  }, [changeMatrix]);

  useEffect(() => {
    startInterval();
  }, [startInterval]);

  useEffect(() => {
    console.log('Page has been mounted');
  }, []);

  return (
    <PixeledLogoWrap
      onMouseEnter={() => {
        clearInterval(interval.current);
        changeMatrix(logoMatrix);
      }}
      onMouseLeave={() => {
        clearInterval(interval.current);
        changeMatrix();
        interval.current = setInterval(() => {
          changeMatrix();
        }, 2000);
        setShowPixeledLogoText(false);
      }}
      onClick={() => {
        const matrix = new Array(18).fill(new Array(18).fill(0));
        changeMatrix(matrix);
        setShowPixeledLogoText(true);
      }}
    >
      {showPixeledLogoText && (
        <span>
          <h2>{logoText.title}</h2>
          <p>{logoText.content}</p>
        </span>
      )}
      <PixeledLogo>
        {logoMatrixState.map((line, i) =>
          line.map((colorIndex, j) => (
            <Pixel
              key={`${i}${j}`}
              color={logoColorMap[colorIndex]}
              transitionTime={Math.random() * 2}
            />
          ))
        )}
      </PixeledLogo>
    </PixeledLogoWrap>
  );
};

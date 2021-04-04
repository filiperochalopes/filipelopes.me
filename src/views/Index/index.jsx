import Wrap, { PixeledLogo, Pixel } from './styles';
import React, { useState, useEffect, useCallback, useRef } from 'react';

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
  const logoMatrixCopy = [];
  const [logoMatrixState, setLogoMatrixState] = useState(logoMatrix);
  let interval = useRef();
  const changeMatrix = useCallback(matrix => {
    if (matrix) {
      setLogoMatrixState(matrix);
    } else {
      let _logoMatrixState = [];
      for (let i = 0; i < 18; i++) {
        _logoMatrixState.push([]);
        for (let j = 0; j < 18; j++) {
          _logoMatrixState[i][j] = Math.floor(Math.random() * 7);
        }
      }
      setLogoMatrixState(_logoMatrixState);
    }
  }, []);

  const startInterval = useCallback(() => {
    logoMatrix.forEach(row => logoMatrixCopy.push([...row]));
    setLogoMatrixState(logoMatrixCopy);
    interval.current = setInterval(() => {
      changeMatrix();
    }, 2000);
  }, []);

  useEffect(() => {
    startInterval();
  }, []);

  return (
    <Wrap>
      <PixeledLogo
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
        }}
      >
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
      <h1>Página em construção</h1>
    </Wrap>
  );
};

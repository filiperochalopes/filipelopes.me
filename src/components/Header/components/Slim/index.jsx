import React from 'react';
import { Link } from 'react-router-dom';

export default function header_slim() {
  return (
    <header id="header_slim">
      <Link to="/">
        <img src="/img/logo.jpg" />
      </Link>
      <Link to="/portfolio">Portfólio</Link>&nbsp;&nbsp;&#9642;&nbsp;&nbsp;
      <Link to="/curriculo">Currículo</Link>
    </header>
  );
}

import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const AppBar = (props) => {
    return (
      <div className='appBar'><Link to="/"><IconButton><i className="fas fa-arrow-left"></i></IconButton></Link> 
            <strong>Página Principal</strong>
        </div>
    );
}

export default AppBar;
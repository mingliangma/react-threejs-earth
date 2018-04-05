import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Earth from './earth';
import registerServiceWorker from './registerServiceWorker';

let planetTexture = require("./img/map_h.jpg");
ReactDOM.render(<Earth planetTexture={planetTexture}/>, document.getElementById('root'))

registerServiceWorker();

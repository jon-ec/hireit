import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import './font-awesome-4.7.0/css/font-awesome.min.css'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

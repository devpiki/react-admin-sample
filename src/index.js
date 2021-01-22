import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'mobx-react';
import RootStore from "./stores";
import {Helmet} from "react-helmet";
import Logo192 from './images/logo192.png';

import './css/Fonts.css';
import './css/App.scss';


const stores = new RootStore();
ReactDOM.render(
  /*<React.StrictMode>
    <App />
  </React.StrictMode>*/
    <Provider {...stores}>
        <Helmet>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <meta name="theme-color" content="#000000"/>
            <meta
                name="description"
                content="Web site created using create-react-app"
            />
            <title>React App</title>
            <link rel="apple-touch-icon" href={Logo192} />
        </Helmet>
        <App />
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

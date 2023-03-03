import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'
import Test from './screen';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  // <div id='table'> <A /> </div>
  // </React.StrictMode>
  //<React.StrictMode>
    <Test />
  //</React.StrictMode>
);
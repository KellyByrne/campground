import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const container = document.getElementById('root');

// create a root
const root = ReactDOM.createRoot(container); 

//render app to root
root.render(<App />);
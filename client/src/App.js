import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './container/header/Header';
import MainContent from './container/maincontent/MainContent';
import Footer from './components/footer/Footer';
import "./App.scss";
import { BrowserRouter } from 'react-router-dom';

function App() {
  return ( 
    <Fragment>
		<BrowserRouter >			
        	<MainContent />    	
		</BrowserRouter>
    </Fragment>  
  );
};

export default App;

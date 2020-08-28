import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import Attractions from './pages/Attractions';
import ContactUs from './pages/ContactUs';
import Gallery from './pages/Gallery';
import Amenities from './pages/Amenities';
import Rates from './pages/Rates';
import Header from './Header';
import Footer from './Footer';
import ParkMap from './pages/ParkMap';
import BookOnline from './pages/BookOnline';
import configureStore from '../store';
// import {ConnectedRouter} from 'react-router-redux';
import {Provider} from 'react-redux';

export const store = configureStore();

const App = () => {
    return (
        <div> 
            <Provider store={store}>
                <Router>
                    <Header/>
                    <div>
                        <Route path="/" exact component={HomePage}/>
                        <Route path="/amenities"  component={Amenities}/> 
                        <Route path="/rates"  component={Rates}/> 
                        <Route path="/parkmap"  component={ParkMap}/> 
                        <Route path="/attractions"  component={Attractions}/>
                        <Route path="/gallery"  component={Gallery}/> 
                        <Route path="/contactus"  component={ContactUs}/>   
                        <Route path="/book"  component={BookOnline}/>  
                    </div>
                    <Footer/>
                </Router>
            </Provider>
        </div> 
    );
};

export default App;

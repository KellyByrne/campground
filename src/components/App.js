import React from 'react';
// import {ConnectedRouter} from 'react-router-redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import configureStore from '../store';
import Footer from './Footer';
import Header from './Header';
import Amenities from './pages/Amenities';
import Attractions from './pages/Attractions';
import BookOnline from './pages/BookOnline';
import ContactUs from './pages/ContactUs';
import Details from './pages/Details';
import Gallery from './pages/Gallery';
import HomePage from './pages/HomePage';
import ParkMap from './pages/ParkMap';
import Payment from './pages/Payment';
import Rates from './pages/Rates';

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
                        <Route path="/book" component={BookOnline} />  
                        <Route path="/payment" component={Payment} />  
                        <Route path="/details"  component={Details}/>  
                    </div>
                    <Footer/>
                </Router>
            </Provider>
        </div> 
    );
};

export default App;

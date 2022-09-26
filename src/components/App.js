import React from 'react';
// import {ConnectedRouter} from 'react-router-redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
                        <Routes>
                        <Route path="/" exact element={< HomePage />}/>
                        <Route path="/amenities"  element={< Amenities />}/> 
                        <Route path="/rates"  element={< Rates />}/> 
                        <Route path="/parkmap"  element={< ParkMap />}/> 
                        <Route path="/attractions"  element={< Attractions />}/>
                        <Route path="/gallery"  element={< Gallery />}/> 
                        <Route path="/contactus"  element={< ContactUs />}/>   
                        <Route path="/book" element={< BookOnline />} />  
                        <Route path="/payment/:id" element={< Payment />} />  
                        <Route path="/details"  element={< Details />}/>  
                        </Routes>
                    </div>
                    <Footer/>
                </Router>
            </Provider>
        </div> 
    );
};

export default App;

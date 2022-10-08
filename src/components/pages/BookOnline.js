import React, { useEffect, useState } from 'react';
import sitemap from '../../images/cane-creek-camp-map.png';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AvailableSites from './AvailableSites';
import axios from '../../apis/data';

const BookOnline = () => {
    const today = new Date(new Date().setHours(0,0,0,0));
    let checkin = localStorage.getItem('checkin') ? new Date(localStorage.getItem('checkin')) : new Date(new Date().setHours(0,0,0,0));
    let checkout = localStorage.getItem('checkout') ? new Date(localStorage.getItem('checkout')) : '';//new Date(localStorage.getItem('checkin')).getTime()  + 60 * 60 * 24 * 1000;

    const [bookingDates, setBookingDates] = useState({
        checkin,
        checkout
    });

    const [availability, setAvailableSites] = useState({});

    const getSitesApiRequest = async () => await axios.post(`/available-sites`, {
        startDate: bookingDates.checkin,
        endDate: bookingDates.checkout
    });

    useEffect(() => {
        if (!availability.availableSites) {
            async function fetchData() {
                const availableSitesData = await getSitesApiRequest();
                setAvailableSites(availableSitesData.data);
              }
              fetchData();
        }
    });
  
    const setCheckin = async (date) => {
        checkin = date;

        if (date < today) {
            return alert('cannot set checkin prior to today');
        } else if (checkin && checkout && date > checkout) {
            // clear checkout if resetting checking to a later date than checkout
            checkout = null;
            localStorage.setItem('checkout', '');
        } else if (`${date}` === `${checkout}`) {
            return alert('you must reserve at least one night');
        }

        setBookingDates({checkout, checkin});
        localStorage.setItem('checkin', date);
    }

    const setCheckout = (date) => {
        checkout = date;

        if (date < new Date(today.getTime() + 60 * 60 * 24 * 1000)) {
            return alert('cannot set checkout prior to tomorrow');
        } else if (checkin && checkout && date < checkin) {
            return alert('cannot set checkout date prior to checkin date');
        } else if (`${date}` === `${checkin}`) {
            return alert('you must reserve at least one night');
        }
        setBookingDates({...bookingDates, checkout: date });
        localStorage.setItem('checkout', date);
    }

    const getAvailableSites = async (startDate, endDate) => {
        // console.log('site avail dates', startDate, 'end', endDate);
        if (bookingDates.checkin !== '' && bookingDates.checkout !== '') {
            localStorage.setItem('checkin', new Date(startDate));
            localStorage.setItem('checkout', new Date(endDate));
            setAvailableSites(await getSitesApiRequest());
        }
    }

    return (
        <div className="container-fluid" id="scrollElement">
            <div className="booking-strip">
                <div className="form-group">
                    <label className="form-label">Checkin </label>
                    <DatePicker selected={bookingDates.checkin} onChange={(date) => setCheckin(date)} />
                </div>
                <div className="form-group">
                    <label className="form-label">Checkout </label>
                    <DatePicker selected={bookingDates.checkout} onChange={(date) => setCheckout(date)} />
                </div>
                <button className="carousel-button blue" onClick={async () => getAvailableSites(bookingDates.checkin, bookingDates.checkout)}>Update</button>
            </div>

            <div className="row available-sites-with-map">
                <div className="col-lg-6 section-left available-sites">
                    {availability.availableSites && availability.availableSites.length !== 0 ? <h3>Available Sites</h3> : ''}
                    <AvailableSites getAvailableSites={getAvailableSites} setBookingDates={setBookingDates} availability={availability} checkin={bookingDates.checkin} checkout={bookingDates.checkout}></AvailableSites>
                </div>
                <div className="col-lg-6 section-right sitemap">
                    <h3>Site Map</h3>
                    <img width="100%" alt="tree" src={sitemap}/>
                </div>
            </div>
        </div>
    );

}

export default BookOnline;
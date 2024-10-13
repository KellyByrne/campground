import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../apis/data';

const AvailableSites = (props) => {
    const navigate = useNavigate();
    const [showConfirmBtn, setConfirmBtnValue] = useState({});
    const [selectedSite, setSelectedSite] = useState(null);

    const savePaymentData = async () => { 
        const payment = await axios.post('/payment', {selectedSite, checkin: props.checkin, checkout: props.checkout, numberOfNights: props.availability.numberOfNights});
        navigate(`/payment/${payment.data.id}`)
     };

    const selectSite = (id) => {
        let allSites = document.getElementsByClassName('site');
        let identifier = id;
        let element = document.getElementById(identifier);
        for (var i = 0; i < allSites.length; i++) {
            allSites[i].style.borderColor = '#6c757d';
            allSites[i].style.borderWidth = '1px';
        }
        element.style.borderColor = '#6FA9B4';
        element.style.borderWidth = '3px';

        setConfirmBtnValue({[id] : true});
        setSelectedSite(props.availability.availableSites.find(s => s.id === id));
    };

    if (props.availability.availableSites !== undefined && props.availability.availableSites.length !== 0) {
        return (props.availability.availableSites.map((available, idx) => {
            return (
                <div style={{'cursor': 'pointer'}} key={'site-' + idx}>
                    <div className="site" id={available.id} onClick={() => selectSite(available.id)}>
                        <h4>Site {available.number}</h4>
                        <p>Price per night: ${available.price}</p>
                        <p>Number of nights: {props.availability.numberOfNights}</p>
                        <p>Total Price: ${available.price * props.availability.numberOfNights}</p>
                        {/* <p>Dates: {`${props.checkin.toLocaleDateString('en-US')} - ${props.checkout.toLocaleDateString('en-US')}`}</p> */}
                        <button key={showConfirmBtn[available.id]} onClick={async () => await savePaymentData()} className={showConfirmBtn[available.id] ? "carousel-button blue longer" : 'hide'}>
                            Confirm &amp; Pay
                        </button>
                    </div>
                </div>
            )
        }))
    } else if (props.availability.availableDatesForSites && Object.keys(props.availability.availableDatesForSites).length) {
        return <div className="no-sites-text">
            Darn, we are all booked up for these date, but here are some available dates. Click a date range or enter new dates to search again.

        {Object.keys(props.availability.availableDatesForSites).map(key =>  {
                return <div key={`site-${key}`}>
                    <div className="site" id={key}>
                        <h4>Site {key}</h4>
                        {props.availability.availableDatesForSites[key].map((date) => {
                            return <div style={{'cursor': 'pointer'}} onClick={() => { props.setBookingDates({checkin: new Date(date.startDate), checkout: new Date(date.endDate)}); props.getAvailableSites(date.startDate, date.endDate)}} key={`${key}${date.startDate}`} className="no-sites-text">
                                {date.startDate} - {date.endDate}
                            </div>

                            })}
                    </div>
                </div>
            })}
         </div>
    }
}

AvailableSites.defaultProps = {
    selectedSite: null,
};


export default AvailableSites;
  

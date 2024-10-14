import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from '../../apis/data';
import CheckoutForm from '../CheckoutForm';
// eslint-disable-next-line no-undef
const stripePromise = loadStripe('pk_test_51HLYv6AazfTTlzsuUHbiiolAwJGMFsSM2ubmvO8WQ5Rxnla68lffPwTGQ3x9KUTI4KYhz6bbIOVKk32tUd3m04q400W9Wf14pg');

const Payment = (props) =>  {
    const { id } = useParams();
    const [bookingData, setBookingData] = useState({
        startDate: undefined,
        endDate: undefined,
        totalPrice: 0,
        numberOfNights: 0,
        taxes: 0,
        name: undefined,
        email: undefined,
        phone: undefined,
    });

    useEffect(() => {
        if (!bookingData.startDate) {
            async function fetchData() {
                const data = await axios.get(`/booking/${id}`);
                setBookingData(data.data);
              }
              fetchData();
        }
        // console.log('bookingData', bookingData);
        
    });

    const handleChange = (e, inputName) => {
        setBookingData({...bookingData, [inputName]: e.target.value})
    }

        if (bookingData.status === 'confirmed') {
            // TODO: redirect to the payment success page instead
            return (<div className="container-fluid" id="scrollElement">
                <div style={{height: '500px'}} className="col-lg-12">
                Your booking is already confirmed for {new Date(bookingData?.startDate).toLocaleDateString('en-US') } - {new Date(bookingData?.endDate).toLocaleDateString('en-US')}
                </div>
            </div>)
        }

        return (
            <div className="container-fluid" id="scrollElement">
                <div className="col-lg-12">
                    <form className="payment-form">
                    <div><h3>Reservation Details</h3></div>
                        <div className="form-group">
                            <label className="form-label">Check-in </label>
                            <input 
                                className="form-input form-control"
                                key="checkin"
                                required
                                disabled
                                value={new Date(bookingData?.startDate).toLocaleDateString('en-US')}
                                />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Checkout </label>
                            <input 
                                className="form-input form-control"
                                key="checkout"
                                required
                                disabled
                                value={new Date(bookingData?.endDate).toLocaleDateString('en-US')}
                                />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Rate/Night</label>
                            <input 
                                className="form-input form-control"
                                key="nightlyRate"
                                required
                                disabled
                                value={(bookingData?.totalPrice / bookingData?.numberOfNights).toFixed(2)}
                                />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Price </label>
                            <input 
                                className="form-input form-control"
                                key="price"
                                required
                                disabled
                                value={bookingData?.totalPrice.toFixed(2)}
                                />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Taxes </label>
                            <input 
                                className="form-input form-control"
                                key="taxes"
                                required
                                disabled
                                value={bookingData?.taxes.toFixed(2)}
                                />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Total ({bookingData?.numberOfNights} nights)</label>
                            <input 
                                className="form-input form-control"
                                key="total"
                                required
                                disabled
                                value={(bookingData?.totalPrice + bookingData?.taxes).toFixed(2)}
                                />
                        </div>
                        <div>
                            <div><h3>Payment Info</h3></div>
                            <div className="form-group">
                                <label className="form-label">Name </label>
                                <input 
                                    className="form-input form-control"
                                    key="name"
                                    required
                                    value={bookingData?.name || ''}
                                    onChange={(e) => {handleChange(e, 'name')}}
                                    />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email </label>
                                <input 
                                    className="form-input form-control"
                                    key="email"
                                    required
                                    value={bookingData?.email || ''}
                                    onChange={(e) => {handleChange(e, 'email')}}
                                    />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Phone </label>
                                <input 
                                    className="form-input form-control"
                                    key="phone"
                                    required
                                    value={bookingData?.phone || ''}
                                    onChange={(e) => {handleChange(e, 'phone')}}
                                    />
                            </div>
                        </div>
                    </form>
                    <div className="payment-form">
                        <Elements stripe={stripePromise}>
                            <CheckoutForm product={`Campsite ${bookingData?.SiteId}: ${bookingData?.numberOfNights} nights`} bookingData={bookingData}/>
                        </Elements>
                    </div>
                </div>
            </div>
        );

}

export default Payment;
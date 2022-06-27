import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import StripeCheckout from 'react-stripe-checkout';
import { fetchAvailability, setFormDataItem, setPaymentDataItem } from '../../_actions';
import CheckoutForm from '../CheckoutForm';
const TAX_RATE = .11;
// eslint-disable-next-line no-undef
const stripePromise = loadStripe('pk_test_51IFU8YCfUXRmPJhQRA71KsskANdyQ4FRRSyyB0GfKBUwCaidq9f2tWEQFenKyZ9A6TltldDS60SyoKMYL7WaWOPz00LyMlDM1W');

class Payment extends React.Component {

    constructor(props) {
        super(props);

        this.scrollElement = React.createRef();

        this.state = {
            product: {name:'Campsite', price: 1}
        }
    }

    componentDidMount() {
        if (this.props.formData.checkin !== '' && this.props.formData.checkout !== '') {
            this.props.fetchAvailability(this.props.formData.checkin, this.props.formData.checkout);
        }
       
        const subTotal = this.props.availability.numberOfNights * this.props.formData.selectedSite.price || 0
        const taxes = subTotal * TAX_RATE || 0;

        this.props.setFormDataItem({
            alert: this.props.formData.alert || {},
            adults: this.props.formData.adults || 0,
            kids: this.props.formData.kids || 0,
            pets: this.props.formData.pets || 0,
            totalPrice: subTotal + taxes,
            subTotal,
            taxes,
            startDate: this.props.formData.checkin || '',
            endDate: this.props.formData.checkout || '',
        });

        // window.addEventListener('scroll', this.handleScroll);

        // window.scrollTo(100, 0)

        const list = ReactDOM.findDOMNode(this.scrollElement.current);
        // console.log(list);
        list.addEventListener('scroll', this.handleScroll());
        // console.log(list);
        // node.addEventListener('scroll', this.handleScroll.bind(this))
        // node.addEventListener("scroll", this.handleScroll);
     
    }

    componentDidUpdate() {
        console.log(this.props.availability);
    }

    handleScroll = (e) => {
        console.log('scrolling');
        // console.log(e.clientX);
        let useWindow;
        const target = document.getElementById('scrollElement')
        const position = target.getBoundingClientRect();
        console.log(position);
        // console.log(target.scrollX);
        // console.log(target.scrollY)
     
        return useWindow
          ? { x: window.scrollX, y: window.scrollY }
          : { x: position.left, y: position.top }
    }

    displayAlert = () => {

    }

    handleChange = (e, inputName) => {
        this.props.setFormDataItem({[inputName]: e.target.value});
    }

    handlePaymentUpdate = (e, inputName) => {
        this.props.setPaymentDataItem({ [inputName]: e.target.value });
    }

    update = () => {
        if (this.props.formData.checkin !== '' && this.props.formData.checkout !== '') {
            this.props.fetchAvailability(this.props.formData.checkin, this.props.formData.checkout);
        }
    }

    render() {
        return (
            <div className="container-fluid" id="scrollElement"  ref={this.scrollElement}>
                <div className="row">
                    <div className="col-lg-7 section-left payment">
                        <h3>Payment Details</h3>
                        <p>Review reservation and enter payment info</p>
                        <div className="row">
                            <div className="col-lg-3">
                                <p><b>Dates</b></p>
                                <p>{this.props.formData.checkin}-{this.props.formData.checkout}</p>
                            </div>
                            <div className="col-lg-3">
                                <p><b>Rates</b></p>
                                <p>${(this.props.formData.selectedSite.price.toFixed(2))}/ night</p>
                            </div>
                            <div className="col-lg-3">
                                <p><b>Nights</b></p>
                                <p>{this.props.availability.numberOfNights}</p>
                                <p><b>Taxes:</b></p>
                                <p><b>Total Due:</b></p>
                                {/* <p><b>Reservation Deposit</b></p> */}
                                {/* <p><b>Amount Due</b></p> */}
                            </div> 
                            <div className="col-lg-3">
                                <p><b>Price</b></p>
                                <p>${(this.props.availability.numberOfNights * this.props.formData.selectedSite.price).toFixed(2)}</p>
                                <p><b>${(this.props.formData.taxes).toFixed(2)}</b></p>
                                <p><b>${(this.props.formData.totalPrice).toFixed(2)}</b></p> 
                                {/* <p><b></b></p> */}
                                {/* <p><b>Amount Due</b></p>  */}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 section-right details">
                        <div className="reservation-details">
                            <h4>Lakeside Pines RV Park</h4>
                            <p>1645 E Highway 25, Dandridge, TN 37725</p>
                            <p>(832) 465-6700</p>
                            <Link to="/cancellation">Cancellation Guidelines</Link>

                            <h4>Reservation Details</h4>
                            <p>Site {this.props.formData.selectedSite.number}</p> 
                            <p>Checkin: {this.props.formData.checkin}</p>
                            <p>Checkout: {this.props.formData.checkout}</p>
                            <p>Number in party: {this.props.formData.guestDisplay}</p>
                            <p>Campsite Type: {this.props.formData.unitType}</p>
                           
                            <Link to="/book">Edit Reservation</Link>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-5 section-right details">
                        <Elements stripe={stripePromise}>
                            <CheckoutForm product={this.state.product} formData={this.props.formData}/>
                        </Elements>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <button className="carousel-button blue longer"><Link to="/payment">Reserve &amp; Pay</Link></button>
                    </div>
                </div>
            </div>
        );
    };
}


const mapStateToProps = (state, ownProps) => {
    return {
        formData: state.formData,
        availability: state.availability,
        paymentData: state.paymentData,
    }

}

export default connect(mapStateToProps, {fetchAvailability, setFormDataItem, setPaymentDataItem}) (Payment);
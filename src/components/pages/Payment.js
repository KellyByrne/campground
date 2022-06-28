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
            name: this.props.formData.name,
            email: this.props.formData.email,
            phone: this.props.formData.phone
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
        // console.log(this.props.availability);
    }

    handleScroll = (e) => {
        // console.log('scrolling');
        // console.log(e.clientX);
        let useWindow;
        const target = document.getElementById('scrollElement')
        const position = target.getBoundingClientRect();
        // console.log(position);
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
                <div className="col-lg-12">
                    <form>
                    <div><h3>Reservation Details</h3></div>
                        <div className="form-group">
                            <label className="form-label">Check-in </label>
                            <input 
                                className="form-input form-control"
                                key="checkin"
                                required
                                disabled
                                value={this.props.formData.checkin}
                                />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Checkout </label>
                            <input 
                                className="form-input form-control"
                                key="checkout"
                                required
                                disabled
                                value={this.props.formData.checkout}
                                />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Rate/Night</label>
                            <input 
                                className="form-input form-control"
                                key="nightlyRate"
                                required
                                disabled
                                value={(this.props.formData.selectedSite.price.toFixed(2))}
                                />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Price </label>
                            <input 
                                className="form-input form-control"
                                key="price"
                                required
                                disabled
                                value={(this.props.availability.numberOfNights * this.props.formData.selectedSite.price).toFixed(2)}
                                />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Taxes </label>
                            <input 
                                className="form-input form-control"
                                key="taxes"
                                required
                                disabled
                                value={(this.props.formData.taxes.toFixed(2))}
                                />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Total ({this.props.availability.numberOfNights} nights)</label>
                            <input 
                                className="form-input form-control"
                                key="total"
                                required
                                disabled
                                value={(this.props.formData.totalPrice).toFixed(2)}
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
                                    value={this.props.formData.name}
                                    onChange={(e) => {this.handleChange(e, 'name')}}
                                    />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email </label>
                                <input 
                                    className="form-input form-control"
                                    key="email"
                                    required
                                    value={this.props.formData.email}
                                    onChange={(e) => {this.handleChange(e, 'email')}}
                                    />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Phone </label>
                                <input 
                                    className="form-input form-control"
                                    key="phone"
                                    required
                                    value={this.props.formData.phone}
                                    onChange={(e) => {this.handleChange(e, 'phone')}}
                                    />
                            </div>
                        </div>
                    </form>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm product={this.state.product} formData={this.props.formData}/>
                    </Elements>
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
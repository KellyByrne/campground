import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import StripeCheckout from 'react-stripe-checkout';
import { clearPaymentData, fetchAvailability, setFormDataItem, setPaymentDataItem } from '../../_actions';
import CheckoutForm from '../CheckoutForm';
const TAX_RATE = .11;
// eslint-disable-next-line no-undef
const stripePromise = loadStripe('pk_test_51IFU8YCfUXRmPJhQRA71KsskANdyQ4FRRSyyB0GfKBUwCaidq9f2tWEQFenKyZ9A6TltldDS60SyoKMYL7WaWOPz00LyMlDM1W');


class Payment extends React.Component {

    constructor(props) {
        super(props);

        this.scrollElement = React.createRef();

        this.state = {
            product: { name: 'Campsite', price: 1 },
            popupShow: false
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
            checkin: this.props.formData.checkin || '',
            checkout: this.props.formData.checkout || '',
            email: this.props.formData.email || '',
            phone: this.props.formData.phone || '',
            name: this.props.formData.name || ''
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
        if (this.props.paymentData.status === 'success') {
            if (!this.state.popupShow) {
                this.setState({ popupShow: true })
            } 
        }
    }

    clearPaymentData() {
        this.setState({ popupShow: false });
        this.props.clearPaymentData();
        this.props.history.push('/');
        this.props.setFormDataItem({
            alert: {},
            adults: 0,
            kids: 0,
            pets: 0,
            totalPrice: 0,
            subTotal: 0,
            taxes: 0,
            checkin: '',
            checkout: '',
            email: '',
            phone: '',
            name: ''
        });

       // should this show reservation details or redirect to home?
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

    displayAlert = (formItemName) => {
        if (Object.keys(this.props.formData).length !== 0) {
            if (this.props.formData.alert[formItemName] !== undefined) {
                return (
                    <p className={this.props.formData.alert[formItemName] ? 'error-message' : 'hidden'}>{this.props.formData.alert[formItemName]}</p> 
                )
            }
        }
    }

    render() {
        return (
            <div className="container-fluid payment-page" id="scrollElement"  ref={this.scrollElement}>
                <div className="row">
                    <div className="col-lg-6 section-left payment">
                        <h4>Reservation Details</h4>
                        {/* <p>Review reservation and enter payment info</p> */}
                                <p><b>Site {this.props.formData.selectedSite.number}</b> </p> 
                                <p>Checkin: {this.props.formData.checkin}</p>
                                <p>Checkout: {this.props.formData.checkout}</p>
                                <p>Number in party: {this.props.formData.guestDisplay}</p>
                                <p>Campsite Type: {this.props.formData.unitType}</p>
                                <Link to="/book">Edit Reservation</Link>

                                <p><b>Number of Nights:</b> {this.props.availability.numberOfNights}</p>
                                <p><b>Price:</b>{this.props.availability.numberOfNights * this.props.formData.selectedSite.price}</p>
                                <p><b>Tax: <p><b>{this.props.formData.taxes}</b></p></b></p>
                                <p><b>Amount Due: {this.props.formData.totalPrice}</b></p>
                                <Link to="/cancellation">Cancellation Guidelines</Link>
                                
                                {/* <div className="reservation-details">
                                    <h4>Lakeside Pines RV Park</h4>
                                    <p>1645 E Highway 25, Dandridge, TN 37725</p>
                                    <p>(832) 465-6700</p>
                                </div> */}
                        </div>
                    <div className="col-lg-6 section-right details">
                        <label>Name</label>
                        {this.displayAlert('name')}
                        <input 
                            className="form-input form-control"
                            type="name"
                            key="name"
                            placeholder="Name"
                            value={this.props.formData.name}
                            onChange={(e) => this.handleChange(e, 'name')} 
                        />
                        <label>Email Address</label>
                        {this.displayAlert('email')}
                        <input 
                            className="form-input form-control"
                            type="email"
                            key="email"
                            placeholder="Email Address"
                            value={this.props.formData.email}
                            onChange={(e) => this.handleChange(e, 'email')} 
                        />
                        {this.displayAlert('phone')}
                        <label>Phone Number</label>
                        <input 
                            className="form-input form-control"
                            type="phone"
                            key="phone"
                            placeholder="Phone Number"
                            value={this.props.formData.phone}
                            onChange={(e) => this.handleChange(e, 'phone')} 
                        />
                        <Elements stripe={stripePromise}>
                            <CheckoutForm product={this.state.product} formData={this.props.formData}/>
                        </Elements>
                    </div>
                </div>
                <div className={this.state.popupShow ? 'popup' : 'hidden'}>
                    <div className="popup-inner-table">
                        <button className="material-icons table-close" onClick={() => this.clearPaymentData()}>X</button>
                        <div className="title-container">
                            <p>
                                Thank you for your payment. We will email your receipt and reservation details.
                            </p>
                        </div>
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

export default connect(mapStateToProps, {fetchAvailability, setFormDataItem, setPaymentDataItem, clearPaymentData}) (Payment);
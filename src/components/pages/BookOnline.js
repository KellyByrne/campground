import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import sitemap from '../../images/cane-creek-camp-map.png';
import { fetchAvailableSites, setFormDataItem } from '../../_actions';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AvailableSites from './AvailableSites';

class BookOnline extends React.Component {

    constructor(props) {
        super(props);

        this.scrollElement = React.createRef();
        this.today = new Date(new Date().setHours(0,0,0,0));
        const tomorrow = new Date(this.today.getTime()  + 60 * 60 * 24 * 1000);
        if (new Date(localStorage.getItem('checkout')) < tomorrow) {
            this.props.formData.checkout = tomorrow;
            this.setState(({checkout: tomorrow}));
            localStorage.setItem('checkout', tomorrow);
        }

        // TODO: if checkout is less than tomorrow clear checkout
        this.state = {
            checkin: this.props.formData.checkin || localStorage.getItem('checkin') ? new Date(localStorage.getItem('checkin')) : new Date(new Date().setHours(0,0,0,0)),
            checkout: this.props.formData.checkout || localStorage.getItem('checkin') ? new Date(localStorage.getItem('checkout')) : new Date(localStorage.getItem('checkout')),
            // numberOfACs: 0,
            // tentCamping: false,
        };
    }

    componentDidMount() {
        this.props.fetchAvailableSites(
            localStorage.getItem('checkin') ? new Date(localStorage.getItem('checkin')) : new Date(new Date().setHours(0,0,0,0)),
            localStorage.getItem('checkin') ? new Date(localStorage.getItem('checkout')) : new Date(localStorage.getItem('cehckout'))
        );
        

        this.props.setFormDataItem({
            alert: this.props.formData.alert || {},
            adults: this.props.formData.adults || 0,
            kids: this.props.formData.kids || 0,
            pets: this.props.formData.pets || 0,
            totalPrice: 0,
            subTotal: 0,
            taxes: 0,
            checkin: this.state.checkin || '',
            checkout: this.state.checkout || ''
        });

        const list = ReactDOM.findDOMNode(this.scrollElement.current);
        list.addEventListener('scroll', this.handleScroll());
      
    }

    handleScroll = (e) => {
        let useWindow;
        const target = document.getElementById('scrollElement')
        const position = target.getBoundingClientRect();
      
        return useWindow
          ? { x: window.scrollX, y: window.scrollY }
          : { x: position.left, y: position.top }
    }

    setCheckin(date) {
        this.props.formData.checkin = date;
        this.setState(({checkin: date}));
    }

    setCheckout(date) {
        this.props.formData.checkout = date;
        this.setState(({checkout: date}));
    }


    handleChange = (e, inputName) => {
        this.props.setFormDataItem({[inputName]: e.target.value}); 
    }

    getAvailableSites = () => {
        console.log('this.state', this.state);
        if (this.state.checkin !== '' && this.state.checkout !== '') {
            localStorage.setItem('checkin', this.state.checkin);
            localStorage.setItem('checkout', this.state.checkout);
            this.props.fetchAvailableSites(this.state.checkin, this.state.checkout);
        }
    }

    render() {
        return (
            <div className="container-fluid" id="scrollElement" ref={this.scrollElement}>
                <div className="booking-strip">
                    <div className="form-group">
                        <label className="form-label">Checkin </label>
                        <DatePicker selected={this.state.checkin} onChange={(date) => this.setCheckin(date)} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Checkout </label>
                        <DatePicker selected={this.state.checkout} onChange={(date) => this.setCheckout(date)} />
                    </div>
                    <button className="carousel-button blue" onClick={() => this.getAvailableSites()}>Update</button>
                </div>

                <div className="row available-sites-with-map">
                    <div className="col-lg-6 section-left available-sites">
                        <h3>Available Sites</h3>
                        <AvailableSites availability={this.props.availability} checkin={this.state.checkin} checkout={this.state.checkout}></AvailableSites>
                    </div>
                    <div className="col-lg-6 section-right sitemap">
                        <h3>Site Map</h3>
                        <img width="100%" alt="tree" src={sitemap}/>
                    </div>
                </div>
            </div>
        );

    };
}


const mapStateToProps = (state, ownProps) => {
    return {
        formData: state.formData,
        availability: state.availability
    }

}

export default connect(mapStateToProps, {fetchAvailableSites, setFormDataItem}) (BookOnline);
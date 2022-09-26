import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import singletree from '../../images/CreativeMarket9-01.png';
import nighttrees from '../../images/turqnight.JPG';
import '../../style.css';
import { fetchAvailableSites, setFormDataItem } from '../../_actions';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.today = new Date(new Date().setHours(0,0,0,0));

        localStorage.setItem('checkin', this.today);

        this.scrollElement = React.createRef();

        this.state = {
          checkin: this.today,
          checkout: null,
        //   unitTypes: [
        //     {value: "motorhome" , name: "Motorhome"},
        //     {value: "motorhome-towing" , name: "Motorhome Towing"},
        //     {value: "fifth-wheel" , name: "Fifth Wheel"},
        //     {value: "tent-trailer" , name: "Tent Trailer"},
        //     {value: "travel-trailer" , name: "Travel Trailer"},
        //     {value: "pickup-camper" , name: "Pickup Camper"},
        //     {value: "van" , name: "Van"},
        //     {value: "automobile" , name: "Automobile"},
        //     {value: "bike-motorcycle" , name: "Bike/Motorcycle"},
        //     {value: "tent" , name: "Tent"},
        //     {value: "other" , name: "Other"},
        //     {value: "storage" , name: "Storage"},
        //     {value: "toy-hauler" , name: "Toy Hauler"},
        //  ]
        };
    }

    componentDidMount() {
        // this.props.fetchAvailableSites();

        this.props.setFormDataItem({
            alert: {},
            adults: 0,
            kids: 0,
            pets: 0,
            totalPrice: 0,
            subTotal: 0,
            taxes: 0,
            checkin: this.today,
            checkout: ''
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
        if (date < this.today) {
            // TODO: alert error that cannot set checkin before today
            return alert('cannot set checkin prior to today');
        } else if (this.state.checkin && this.state.checkout && date > this.state.checkout) {
            // TODO
            return alert('cannot set checkin date later than checkout date');
        }
        this.props.formData.checkin = date;
        this.setState(({checkin: date}));
        localStorage.setItem('checkin', date);
    }

    setCheckout(date) {
        if (date < new Date(this.today.getTime()  + 60 * 60 * 24 * 1000)) {
            // TODO: alert error that cannot set checkin before today
            return alert('cannot set checkout prior to tomorrow');
        } else if (this.state.checkin && this.state.checkout && this.state.checkin > date) {
            // TODO
            return alert('cannot set checkout date prior to checkin date');
        }
        this.props.formData.checkout = date;
        this.setState(({checkout: date}));
        localStorage.setItem('checkout', date);
    }

    callNow = () => {

    }

    // handleChange = (e, inputName) => {
    //     this.props.setFormDataItem({[inputName]: e.target.value}); 
    // }

    render() {
        return (
            <div className="container-fluid" id="scrollElement"  ref={this.scrollElement}>
                <div className="row">
                    <div className="col-lg-12 col-sm-12">
                        <div className="hero">
                            <div className="overlay"></div>
                            <p className="message">Now Booking!</p>
                            <div className="box">
                                <h2>New Lakeside RV and Tent Sites</h2>
                                <div>
                                <ul style={{'listStyleType': 'none', 'marginLeft': '-40px', 'textAlign': 'center', 'fontStyle': 'italic'}}>
                                    <li>Indoor Pool and Hot Tub</li> <br></br>
                                    <li>Paddleboard, Kayak, Canoe Rental</li> <br></br>
                                    <li>Clean and Private bathroom and showers</li><br></br>
                                    <li>Natural Beauty and quiet on Douglas Lake</li><br></br>
                                    </ul>
                                    <Link to="/" className="carousel-button blue" onClick={this.callNow}>CALL NOW</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-sm-12">
                        <div className="booking-strip">
                            <div className="form-group">
                                <label className="form-label">Checkin </label>
                                <DatePicker selected={this.state.checkin} onChange={(date) => this.setCheckin(date)} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Checkout </label>
                                <DatePicker selected={this.state.checkout} onChange={(date) => this.setCheckout(date)} />
                            </div>
                            <button className="carousel-button blue"><Link to="/book">Book Now</Link></button>
                        </div>
                    </div>
                </div>
                <section className="amenities">
                    <div className="row">
                        <div className="photo-sc">
                            <img alt="tree" src={nighttrees}/>
                        </div>
                        <div className="copy-sc">
                            <span className="amenity-tree"><img alt="tree" src={singletree}/></span>
                            <h3>Amenities </h3>
                            <ul>
                                <li>Access to Douglas Lake</li>
                                <li>Indoor Pool </li>
                                <li>Leash free dog park</li>
                                <li>Free &amp; Fast Wifi</li>
                                <li>Clean, tiled restrooms &amp; showers</li>
                                <li>Free laundry</li>
                                <li>10 minutes to grocery shopping</li>
                            </ul>
                        </div>
                    </div>
                </section>
                <section className="testimonials">
                    <div className="overlay"></div>
                    <div className="dark-overlay"></div>
                    <div className="row">
                        <div className="col-lg-12 col-sm-12">
                            <div className="quote-container">
                                <p>"The location is perfect, the bathrooms are clean and the atmosphere is peaceful."</p>
                                <h3>Timothy Vickery</h3>
                            </div>
                        </div>
                    </div>
                </section>
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

export default connect(mapStateToProps, {fetchAvailableSites, setFormDataItem})(HomePage);
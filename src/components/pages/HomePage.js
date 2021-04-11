import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import singletree from '../../images/CreativeMarket9-01.png';
import nighttrees from '../../images/turqnight.JPG';
import '../../style.css';
import { fetchAvailability, setFormDataItem } from '../../_actions';
import DatePicker from '../DatePicker';
import GuestDropDown from '../GuestDropDown';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.scrollElement = React.createRef();

        this.state = {
          unitTypes: [
            {value: "motorhome" , name: "Motorhome"},
            {value: "motorhome-towing" , name: "Motorhome Towing"},
            {value: "fifth-wheel" , name: "Fifth Wheel"},
            {value: "tent-trailer" , name: "Tent Trailer"},
            {value: "travel-trailer" , name: "Travel Trailer"},
            {value: "pickup-camper" , name: "Pickup Camper"},
            {value: "van" , name: "Van"},
            {value: "automobile" , name: "Automobile"},
            {value: "bike-motorcycle" , name: "Bike/Motorcycle"},
            {value: "tent" , name: "Tent"},
            {value: "other" , name: "Other"},
            {value: "storage" , name: "Storage"},
            {value: "toy-hauler" , name: "Toy Hauler"},
         ]
        };
    }

    componentDidMount() {
        this.props.fetchAvailability();

        this.props.setFormDataItem({
            alert: {},
            adults: 0,
            kids: 0,
            pets: 0,
            totalPrice: 0,
            subTotal: 0,
            taxes: 0,
            checkin: '',
            checkout: ''
        });

        // window.addEventListener('scroll', this.handleScroll);

        // window.scrollTo(100, 0)

        const list = ReactDOM.findDOMNode(this.scrollElement.current);
        console.log(list);
        list.addEventListener('scroll', this.handleScroll());
        // console.log(list);
        // node.addEventListener('scroll', this.handleScroll.bind(this))
        // node.addEventListener("scroll", this.handleScroll);
      
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

    logit = () => {
        console.log(this.props.availability);
        console.log(this.props.formData);
    }

    displayAlert = () => {

    }

    handleChange = (e, inputName) => {
        this.props.setFormDataItem({[inputName]: e.target.value}); 
    }

    generateUnitOptions = () => {
        if (Object.keys(this.props.formData).length !== 0) {
            return (this.state.unitTypes.map(option => {
                return (
                    <option value={option.value}>{option.name}</option>
                )
            }))
        }
    }

    render() {
        return (
            <div className="container-fluid" id="scrollElement"  ref={this.scrollElement}>
                <div className="row">
                    <div className="col-lg-12 col-sm-12">
                        <div className="hero">
                            <div className="overlay"></div>
                            <p className="message">Now Booking!</p>
                            <div className="box">
                                <h2>Private, Shaded 30/50 Amp Sites</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <br/> <br/> Questions?</p> 
                                <Link to="/" className="carousel-button blue" onClick={this.logit}>CALL NOW</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-sm-12">
                        <form>
                            <div className="booking-strip">
                                <div><p>Booking Info</p></div>
                                <DatePicker placeholder="Checkin" formItemName="checkin" containerClass={"form-group"} labelText="Checkin"/>
                                <DatePicker placeholder="Checkout" formItemName="checkout" containerClass={"form-group"} labelText="Checkout"/>
                                <GuestDropDown/>
                                <div>
                                    {this.displayAlert()}
                                    <div className="form-group">
                                        <label className="form-label">Unit Type </label>
                                        <select 
                                            className="form-input form-control"
                                            key="unitType"
                                            value={this.props.formData.unitType}
                                            onChange={(e) => {this.handleChange(e, 'unitType')}}
                                        >
                                            <option>Select Unit Type</option>
                                            {this.generateUnitOptions()}
                                        </select>
                                    </div>
                                </div>
                                <button className="carousel-button blue"><Link to="/book">Book Online</Link></button>
                            </div>
                        </form> 
                    </div>
                </div>
                <div className="row amenities">
                    <div className="col-lg-6 col-sm-12 photo-sc">
                        <img alt="tree" src={nighttrees}/>
                    </div>
                    <div className="col-lg-6 col-sm-12 copy-sc">
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
                <div className="row amenities">
                    <div className="col-lg-12 col-sm-12">
                        "The location is perfect, the bathrooms are clean and the atmosphere is peaceful. "
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

export default connect(mapStateToProps, {fetchAvailability, setFormDataItem})(HomePage);
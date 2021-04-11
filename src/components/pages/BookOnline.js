import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import sitemap from '../../images/cane-creek-camp-map.png';
import { fetchAvailability, setFormDataItem } from '../../_actions';
import DatePicker from '../DatePicker';
import GuestDropDown from '../GuestDropDown';

class BookOnline extends React.Component {

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
        ],
        showConfirmBtn: false
        };
    }

    componentDidMount() {
        if (this.props.formData.checkin !== '' && this.props.formData.checkout !== '') {
            this.props.fetchAvailability(this.props.formData.checkin, this.props.formData.checkout);
        }
        

        this.props.setFormDataItem({
            alert: this.props.formData.alert || {},
            adults: this.props.formData.adults || 0,
            kids: this.props.formData.kids || 0,
            pets: this.props.formData.pets || 0,
            totalPrice: 0,
            subTotal: 0,
            checkin: this.props.formData.checkin || '',
            checkout: this.props.formData.checkout || ''
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
    
    generateUnitOptions = () => {
        if (Object.keys(this.props.formData).length !== 0) {
            return (this.state.unitTypes.map(option => {
                return (
                    <option value={option.value}>{option.name}</option>
                )
            }))
        }
    }

    generateAvailableSites = () => {
        if (this.props.availability.availableSites !== undefined) {
            return (this.props.availability.availableSites.map(available => {
                return (
                    <div className="site" id={available.id} onClick={() => this.selectSite(available.id)}>
                        <h4>Site {available.number}</h4>
                        <p>Price per night: ${available.price}</p>
                        <p>Number of nights: {this.props.availability.numberOfNights}</p>
                        <p>Total Price: {available.price * this.props.availability.numberOfNights}</p>
                    </div>
                )
            }))
        }
    }

    selectSite = (id) => {
        let allSites = document.getElementsByClassName('site');
        let identifier = id;
        let element = document.getElementById(identifier);
        for (var i = 0; i < allSites.length; i++) {
            allSites[i].style.borderColor = '#6c757d';
            allSites[i].style.borderWidth = '1px';
        }
        element.style.borderColor = '#6FA9B4';
        element.style.borderWidth = '3px';
        this.setState({ showConfirmBtn: true });

        this.props.availability.availableSites.forEach(site => {
            if (site.id === id) {
                this.props.setFormDataItem({ selectedSite: site});
            }
        })
    }

    handleChange = (e, inputName) => {
        this.props.setFormDataItem({[inputName]: e.target.value}); 
    }

    update = () => {
        if (this.props.formData.checkin !== '' && this.props.formData.checkout !== '') {
            this.props.fetchAvailability(this.props.formData.checkin, this.props.formData.checkout);
        }
    }

    render() {
        return (
            <div className="container-fluid" id="scrollElement"  ref={this.scrollElement}>
                <div className="row" >
                    <div className="col-12">
                        <div className="booking-strip">
                                {/* <div><p>Change Booking Info</p></div> */}
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
                                <button className="carousel-button blue" onClick={() => this.update()}>Update</button>
                            </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 section-left available-sites">
                        <h3>Available Sites</h3>
                        {this.generateAvailableSites()}
                    </div>
                    <div className="col-lg-6 section-right sitemap">
                        <h3>Site Map</h3>
                        <img alt="tree" src={sitemap}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <button className={this.state.showConfirmBtn ? "carousel-button blue longer" : 'hide'}><Link to="/details">Confirm Date &amp; Site</Link></button>
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

export default connect(mapStateToProps, {fetchAvailability, setFormDataItem}) (BookOnline);
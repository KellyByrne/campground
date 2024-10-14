import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {setFormDataItem } from '../../_actions';

class Payment extends React.Component {

    constructor(props) {
        super(props);

        this.scrollElement = React.createRef();

        this.state = {
        }
    }

    componentDidMount() {
        // if (this.props.formData.checkin !== '' && this.props.formData.checkout !== '') {
        //     this.props.fetchAvailableSites(this.props.formData.checkin, this.props.formData.checkout);
        // }
        

        this.props.setFormDataItem({
            alert: this.props.formData.alert || {},
            adults: this.props.formData.adults || 0,
            kids: this.props.formData.kids || 0,
            pets: this.props.formData.pets || 0,
            totalPrice: 0,
            subTotal: 0,
            taxes: 0,
            checkin: this.props.formData.checkin || '',
            checkout: this.props.formData.checkout || ''
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

    render() {
        return (
            <div className="container-fluid" id="scrollElement"  ref={this.scrollElement}>
                <div className="row">
                    <div className="col-lg-7 section-left payment">
                        <h3>Site Details</h3>
                        <div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <h3>Pull thru, 50/30 Amps, Full hookup</h3>
                                    <p>Up to 6 people</p>
                                    <p>Firepit</p>
                                    <p>Gravel</p>
                                    <p>Pets Allowed</p>
                                </div>
                                <div className="col-lg-6">
                                    <p>{this.props.formData.selectedSite.price}/ night</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 section-right details">
                        <div className="reservation-details">
                            {/* TODO: add cancellation guidelines and link to cancel */}
                            {/* <h4>Lakeside Pines RV Park</h4>
                            <p>1645 E Highway 25, Dandridge, TN 37725</p>
                            <p>(832) 465-6700</p> */}
                            {/* <Link to="/cancellation">Cancellation Guidelines</Link> */}

                            <h4>Reservation Details</h4>
                            <p>Site {this.props.formData.selectedSite.number}</p>
                            <p>Number of Nights: {this.props.availability.numberOfNights}</p>
                            <p>Price per night: ${(this.props.formData.selectedSite.price).toFixed(2)}</p>
                            <p>Total Price: ${(this.props.formData.selectedSite.price * this.props.availability.numberOfNights).toFixed(2)}</p>
                            <p>Checkin: {this.props.formData.checkin}</p>
                            <p>Checkout: {this.props.formData.checkout}</p>
                            {/* <p>Number in party: {this.props.formData.guestDisplay}</p> */}
                            {/* <p>Campsite Type: {this.props.formData.unitType}</p> */}
                            
                            <Link to="/book">Edit Reservation</Link>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
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
        availability: state.availability
    }

}

export default connect(mapStateToProps, {setFormDataItem}) (Payment);
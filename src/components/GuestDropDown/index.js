import React from 'react';
import { connect } from 'react-redux';
import { setFormDataItem } from '../../_actions';

class GuestDropDown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          show: false
        };
       
    }

    componentDidUpdate() {
        if (Object.keys(this.props.formData).length > 0 && this.props.required && !this.props.formData.formRequired.includes(this.props.formItemName)) {
            this.props.formData.formRequired.push(this.props.formItemName);
        }
    }

    handleChange = (e, inputName) => {
        this.props.setFormDataItem({[inputName]: e.target.value}); 
    }

    onSubmit = (e) => {
        e.preventDefault();
        const adults = this.props.formData.adults === 1 ? "Adult" : "Adults";
        const kids = this.props.formData.kids === 1 ? "Kid" : "Kids";
        const pets = this.props.formData.pets === 1 ? "Pet" : "Pets";
        const response = this.props.formData.adults + ' ' + adults +'/ ' + this.props.formData.kids + ' ' + kids+ '/ ' + this.props.formData.pets + ' ' + pets;
        this.props.setFormDataItem({guestDisplay: response }); 
        this.setState({show: false});
    }

    updateNumber = (action, inputName) => {
        let amount = this.props.formData[inputName];
        if (action === "add") {
            amount += 1;
        } else {
            amount -= 1;
        }
        console.log(amount, inputName, action);
        this.props.setFormDataItem({[inputName]: amount }); 
    }

    displayAlert = () => {
        console.log(this.props.formData);
        if (Object.keys(this.props.formData).length !== 0) {
            if (this.props.formData.alert[this.props.formItemName] !== undefined) {
                return (
                    <p className={this.props.formData.alert[this.props.formItemName] ? 'error-message' : 'hidden'}>{this.props.formData.alert[this.props.formItemName]}</p> 
                )
            }
        }
    }

    render() {
        return (
            <div>
                {this.displayAlert()}
                <div className="form-group">
                    <label className="form-label">Guest Information </label>
                    <input 
                        className="form-input form-control guest-info"
                        type="text"
                        key="guests"
                        placeholder="Guest Information"
                        value={this.props.formData.guestDisplay}
                        onFocus={() => this.setState({show:true})} 
                    />
                    <div className={this.state.show ? 'dropdown-div' : 'hidden'}>
                        <div className="form-group">
							<label className="form-label">Adults 18+</label>
                            <div className="input-group" >
                                <span className="input-group-btn">
                                    <button type="button" className="btn" onClick={() => this.updateNumber("remove", "adults")}>
                                        <i className="material-icons">remove</i>
                                    </button>
                                </span>
                                <input 
                                    className="form-input form-control"
                                    type="number"
                                    key="adults"
                                    placeholder="0"
                                    value={this.props.formData.adults}
                                    onChange={(e) => this.handleChange(e, 'adults')} 
                                />
                                <span className="input-group-btn">
                                    <button type="button" className="btn" onClick={() => this.updateNumber("add", "adults")}>
                                        <i className="material-icons">add</i>
                                    </button>
                                </span>
                            </div>
                        </div>
                        <div className="form-group">
							<label className="form-label">Kids</label>
                            <div className="input-group" >
                                <span className="input-group-btn">
                                    <button type="button" className="btn" onClick={() => this.updateNumber("remove", "kids")}>
                                        <i className="material-icons">remove</i>
                                    </button>
                                </span>
                                <input 
                                    className="form-input form-control"
                                    type="number"
                                    key="kids"
                                    placeholder="0"
                                    value={this.props.formData.kids}
                                    onChange={(e) => this.handleChange(e, 'kids')} 
                                />
                                <span className="input-group-btn">
                                    <button type="button" className="btn" onClick={() => this.updateNumber("add", "kids")}>
                                        <i className="material-icons">add</i>
                                    </button>
                                </span>
                            </div>
                        </div>
                        <div className="form-group">
							<label className="form-label">Pets</label>
                            <div className="input-group" >
                                <span className="input-group-btn">
                                    <button type="button" className="btn" onClick={() => this.updateNumber("remove", "pets")}>
                                        <i className="material-icons">remove</i>
                                    </button>
                                </span>
                                <input 
                                    className="form-input form-control"
                                    type="number"
                                    key="pets"
                                    placeholder="0"
                                    value={this.props.formData.pets}
                                    onChange={(e) => this.handleChange(e, 'pets')} 
                                />
                                <span className="input-group-btn">
                                    <button type="button" className="btn" onClick={() => this.updateNumber("add", "pets")}>
                                        <i className="material-icons">add</i>
                                    </button>
                                </span>
                            </div>
                        </div>
                        <button className="carousel-button blue" onClick={(e) => this.onSubmit(e)}>ADD</button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        formData: state.formData
    }

}

export default connect(mapStateToProps, {setFormDataItem})(GuestDropDown);
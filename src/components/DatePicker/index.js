import React from 'react';
import {connect} from 'react-redux';
import {setFormDataItem} from '../../_actions';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
const currentYear = new Date().getFullYear();
const fromMonth = new Date(currentYear, 0);
const toMonth = new Date(currentYear + 5, 11);


function YearMonthForm({ date, localeUtils, onChange }) {
    const months = localeUtils.getMonths();
  
    const years = [];
    for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
      years.push(i);
    }
  
    const handleChange = function handleChange(e) {
      const { year, month } = e.target.form;
      onChange(new Date(year.value, month.value));
    };
  
    return (
      <form className="DayPicker-Caption">
        <select name="month" onChange={handleChange} value={date.getMonth()}>
          {months.map((month, i) => (
            <option key={month} value={i}>
              {month}
            </option>
          ))}
        </select>
        <select name="year" onChange={handleChange} value={date.getFullYear()}>
          {years.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </form>
    );
  }

class DatePicker extends React.Component {
    constructor(props) {
        super(props);

        this.handleYearMonthChange = this.handleYearMonthChange.bind(this);

        this.state = {
          show: false,
          month: this.props.fromMonth,
          selectedDay: null
        };
       
    }

    handleDayClick = (day, {selected}) => {
        this.setState({
            selectedDay: selected ? undefined : day,
        });
        const correctFormat = day.toLocaleDateString();
        this.handleChange(this.props.inputKey, correctFormat);
    } 

    handleYearMonthChange(month) {
      this.setState({ month });
    }

    componentDidUpdate() {
        if (Object.keys(this.props.formData).length > 0 && this.props.required && !this.props.formData.formRequired.includes(this.props.formItemName)) {
            this.props.formData.formRequired.push(this.props.formItemName);
        }
    }

    handleChange = (e, date) => {
        this.props.setFormDataItem({[this.props.formItemName]: date}); 
        this.setState({show: false});
    }

    displayAlert = () => {
        if (Object.keys(this.props.formData).length !== 0) {
            if (this.props.formData.alert[this.props.formItemName] !== undefined) {
                return (
                    <p className={this.props.formData.alert[this.props.formItemName] ? 'error-message' : 'hidden'}>{this.props.formData.alert[this.props.formItemName]}</p> 
                )
            }
        }
    }

    render() {
        const containerStyle = {
            // position: 'relative'
        }
        return (
            <div style={containerStyle}>
                {this.displayAlert()}
                <div className={this.props.containerClass}>
                    <label className="form-label">{this.props.labelText} </label>
                    <input 
                        className={this.state.show ? 'hidden form-input form-control' : 'form-input form-control'}
                        type="text"
                        key={this.props.formItemName}
                        placeholder={this.props.placeholder}
                        value={this.props.formData[this.props.formItemName]}
                        onFocus={() => this.setState({show:true})} 
                    />
                    <div className={this.state.show ? 'calendar-div' : 'hidden'}>
                        <div className="YearNavigation">
                            <DayPicker
                                month={this.state.month}
                                fromMonth={fromMonth}
                                toMonth={toMonth}
                                selectedDays={this.state.selectedDay}
                                onDayClick={this.handleDayClick}
                                captionElement={({ date, localeUtils }) => (
                                <YearMonthForm
                                    date={date}
                                    fromMonth={fromMonth}
                                    toMonth={toMonth}
                                    localeUtils={localeUtils}
                                    onChange={this.handleYearMonthChange}
                                />
                                )}
                            />
                        </div>
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

export default connect(mapStateToProps, {setFormDataItem})(DatePicker);
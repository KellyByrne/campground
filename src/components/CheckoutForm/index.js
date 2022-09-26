import { CardNumberElement, ElementsConsumer } from "@stripe/react-stripe-js";
import React from "react";
import CardSection from "../CardSection";
import axios from '../../apis/data';

class CheckoutForm extends React.Component {
  
  handleSubmit = async (event) => {
    
    // const alert = {};
    // const emailValidation = (/^\S+@\S+\.\S+$/);
    // // const phoneValidation = (/^\s*(?:\+?(\d{1,3}))?[-.(]*(\d{3})[-.)]*(\d{3})[-.]*(\d{4})(?:*x(\d+))?\s*$/);
    // if (Object.keys(this.props.bookingData).length !== 0) {
    //   if (!emailValidation.test(this.props.bookingData.email) || this.props.bookingData.email === '' ) {
    //       alert['email'] = "Please enter a valid email address"
    //   } 
    //   // if (!phoneValidation.test(this.props.bookingData.phone) || this.props.bookingData.phone === '') {
    //   // //   alert['phone'] = "Please enter a valid phone number"
    //   // }


    //   if (this.props.bookingData.name === '') {
    //     alert['name'] = "Please enter a name"
    //   }

    // }


    event.preventDefault();
    // console.log(this.props);

    const { stripe, elements } = this.props;
    console.log('ths.props', this.props);
    // if (!stripe || !elements || (Object.keys(this.props.bookingData.alert).length >= 1)) {
    //   return;
    // }

    const card = elements.getElement(CardNumberElement);
    const result = await stripe.createToken(card);
    if (result.error) {
      // console.log(result.error.message);
    } else {
      const paymentId = this.props.bookingData.id;
      const response = await axios.put(`/payment/${paymentId}`, {bookingData: this.props.bookingData, ...result});
      console.log('response', response);
      if (response.data.error) {
        // TODO: create toast alert
        alert(response.data.error);
      }
    }
  };


  render() {
    return (
      <div className="DemoWrapper">
        <form onSubmit={this.handleSubmit}>
          <CardSection />
          <button style={{float: 'left', marginBottom: '20px'}} disabled={!this.props.stripe} className='carousel-button blue longer'>
            Submit Payment
          </button>
        </form>
      </div>
    );
  }
}

const InjectedCheckoutForm = (props) => (
 <ElementsConsumer>
     {({ stripe, elements }) => (
         <CheckoutForm 
         stripe={stripe} elements={elements}  {...props}
         />
     )}
 </ElementsConsumer>
);

export default InjectedCheckoutForm;


// export default function InjectedCheckoutForm() {
//   return (
//     <ElementsConsumer>
//       {({ stripe, elements }) => (
//         <CheckoutForm stripe={stripe} elements={elements}/>
//       )}
//     </ElementsConsumer>
//   );
// }
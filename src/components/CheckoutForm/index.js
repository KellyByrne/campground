import { CardNumberElement, ElementsConsumer } from "@stripe/react-stripe-js";
import React from "react";
import CardSection from "../CardSection";
import axios from '../../apis/data';

class CheckoutForm extends React.Component {
  
  handleSubmit = async (event) => {

    event.preventDefault();
    // console.log(this.props);

    const { stripe, elements } = this.props;
    // console.log('ths.props', this.props);

    const card = elements.getElement(CardNumberElement);
    const result = await stripe.createToken(card);
    if (result.error) {
      // TODO: display payment error message
      // console.log(result.error.message);
    } else {
      const paymentId = this.props.bookingData.id;
      const response = await axios.put(`/payment/${paymentId}`, {bookingData: this.props.bookingData, ...result});
      // console.log('response', response);
      if (response.data.error) {
        // TODO: redirect to payment success page with order details instead
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
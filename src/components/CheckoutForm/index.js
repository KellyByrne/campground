import { CardElement, ElementsConsumer } from "@stripe/react-stripe-js";
import React from "react";
import { connect } from 'react-redux';
import { handleToken, setFormDataItem } from "../../_actions";
import CardSection from "../CardSection";


class CheckoutForm extends React.Component {
  
  handleSubmit = async event => {
    
    const alert = {};
    const emailValidation = (/^\S+@\S+\.\S+$/);
    // const phoneValidation = (/^\s*(?:\+?(\d{1,3}))?[-.(]*(\d{3})[-.)]*(\d{3})[-.]*(\d{4})(?:*x(\d+))?\s*$/);
    if (Object.keys(this.props.formData).length !== 0) {
      if (!emailValidation.test(this.props.formData.email) || this.props.formData.email === '' ) {
          alert['email'] = "Please enter a valid email address"
      } 
      // if (!phoneValidation.test(this.props.formData.phone) || this.props.formData.phone === '') {
      // //   alert['phone'] = "Please enter a valid phone number"
      // }


      if (this.props.formData.name === '') {
        alert['name'] = "Please enter a name"
      }
    }

    this.props.setFormDataItem({ alert })


    event.preventDefault();
    // console.log(this.props);

    const { stripe, elements } = this.props;
    if (!stripe || !elements || (Object.keys(this.props.formData.alert).length >= 1)) {
      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    if (result.error) {
      // console.log(result.error.message);
    } else {
      this.props.handleToken(result);
      // console.log(result.token);
    }
  };


  render() {
    return (
      <div className="DemoWrapper">
        <form onSubmit={this.handleSubmit}>
          <CardSection />
          <button disabled={!this.props.stripe} className='carousel-button blue longer'>
            Reserve &amp; Pay
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {  }
};

const mapDispachToProps = (dispatch, ownProps) => {
  return {
    storePaymentIntent: (y) => dispatch({ type: "PAYMENT_INTENT", value: y }),
    handleToken: (token) => dispatch(handleToken({ ...ownProps, ...token })),
    setFormDataItem: (inputName, value) => dispatch(setFormDataItem({...ownProps, ...inputName, ...value}))
  };
};

const InjectedCheckoutForm = (props) => (
 <ElementsConsumer>
     {({ stripe, elements }) => (
         <CheckoutForm 
         stripe={stripe} elements={elements}  {...props}
         />
     )}
 </ElementsConsumer>
);

export default connect(mapStateToProps, mapDispachToProps)(InjectedCheckoutForm);


// export default function InjectedCheckoutForm() {
//   return (
//     <ElementsConsumer>
//       {({ stripe, elements }) => (
//         <CheckoutForm stripe={stripe} elements={elements}/>
//       )}
//     </ElementsConsumer>
//   );
// }
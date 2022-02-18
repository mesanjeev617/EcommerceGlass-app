import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';


function PaymentMethodScreen(props) {
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart;
    if(!shippingAddress.shippingAddress){
        navigate('/signin/shipping');
    }
    const [paymentMethod, setPaymentMethod] = useState('Paypal');
    
    const dispatch = useDispatch();
    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder');
    }
  return <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <form className='form' onSubmit={submitHandler}>
          <div>
              <h1>Payment Method</h1>
          </div>
          <div>
              <div>
                  <input type='radio' id='paypal' value='Paypal' name='paymentmethod' required checked
                  onChange={(e)=> setPaymentMethod(e.target.value)}></input>
                  <label htmlFor='paypal'>Paypal</label>
              </div>
          </div>

          <div>
              <div>
                  <input type='radio' id='stripe' value='Stripe' name='paymentmethod' required 
                  onChange={(e)=> setPaymentMethod(e.target.value)}></input>
                  <label htmlFor='stripe'>Stripe</label>
              </div>
          </div>
          <div>
              <button className='primary' type='submit'>Continue</button>
          </div>
      </form>
  </div>;
}

export default PaymentMethodScreen;

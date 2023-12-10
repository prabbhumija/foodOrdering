import classes from './Checkout.module.css';
import { useRef ,useState} from 'react';


const isEmpty = value =>value.trim() === '';
const isFiveChars = value => value.trim().length === 6;
const Checkout = (props) => {

    const [formInputsValidity , setFormInputsValidity]=useState({
        name : true,
        street : true,
        city : true ,
        postalCode : true
    });
    const nameInputRef =useRef();
    const streetInputRef =useRef();
    const postalCodeInputRef =useRef();
    const cityInputRef =useRef();
  
  const confirmHandler=(event )=>{

    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid =!isEmpty(enteredName);
    const enteredStreetIsValid =!isEmpty(enteredStreet);
    const enteredPostalCodeIsValid  = isFiveChars(enteredPostalCode);
    const enteredCityIsValid =!isEmpty(enteredCity);

    setFormInputsValidity({
        name : enteredNameIsValid,
         street : enteredStreetIsValid,
         city : enteredCityIsValid,
         postalCode: enteredPostalCodeIsValid
    });

    const formIsValid=
    enteredNameIsValid &&
    enteredCityIsValid &&
    enteredPostalCodeIsValid &&
    enteredStreetIsValid ;
     

    if(!formIsValid){
        return ;
    }
   props.onConfirm({
    name: enteredName,
    street: enteredStreet,
    city: enteredCity,
    postalCode : enteredPostalCode,
   });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef}/>
        {!formInputsValidity.name && <p>Please ener a valid name!</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef}/>
        {!formInputsValidity.street && <p>Please ener a valid street!</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeInputRef}/>
        {!formInputsValidity.postalCode && <p>Please ener a valid postalcode 5 ch!</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef}/>
        {!formInputsValidity.city && <p>Please ener a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
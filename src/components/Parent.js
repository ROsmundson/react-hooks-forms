import React, { useState } from "react";
import Form from "./Form";
import DisplayData from "./DisplayData";
import NumberForm from "./NumberForm"
function Parent() {
  const [firstName, setFirstName] = useState("Andy");
  const [lastName, setLastName] = useState("Dandy");
  const [number, setNumber] = useState(0);
  const [isInvalidNumber, setIsInvalidNumber] = useState(null);
  
  
  function handleFirstNameChange(event) {
    setFirstName(event.target.value);
  }
  function handleLastNameChange(event) {
    setLastName(event.target.value);
  }

  function handleNumberChange(event) {
    const newNumber = parseInt(event.target.value);
    if (newNumber >= 0 && newNumber <= 5) {
      setNumber(newNumber);
      setIsInvalidNumber(null);
    } else {
      setIsInvalidNumber(`${newNumber} is not a valid number!`)
    }
  }

  return (
    <div>
      <Form
        firstName={firstName}
        lastName={lastName}
        handleFirstNameChange={handleFirstNameChange}
        handleLastNameChange={handleLastNameChange}
      />
      <DisplayData
        firstName={firstName} 
        lastName={lastName}
      />
      <NumberForm
        number={number}
        handleNumberChange={handleNumberChange}
        />
        {isInvalidNumber ? <span style={{color: "red"}}>{isInvalidNumber}</span> : null}

    </div>
  )
}

export default Parent;
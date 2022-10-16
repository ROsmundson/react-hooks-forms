import React from 'react';

function NumberForm({
  number,
  handleNumberChange}) {

  return (
    <form>
      <label htmlFor="number">Number Form</label>
      <input 
        id="number"
        type="number" 
        value={number} 
        onChange={handleNumberChange} />
    </form>
  )
  }

export default NumberForm;
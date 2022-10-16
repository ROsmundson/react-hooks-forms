# Controlled Components

## Learning Goals

- Understand what "controlled components" are in React
- Implement controlled components by synchronizing input values with component
  state.

## Introduction
Setting up controlled inputs in React:
> Note: Form submission functionality is omitted for simplicity.

## Controlling Form Values From State
Forms in React are similar to regular HTML forms. The JSX is almost identical but how we store and handle form data is different (new).
A controlled form is a form that derives its input values from state.
In the setup below, the two text input elements will display the corresponding state value.
This is not a controlled form because there is no way to change the state.
Although the text inputs will display the corresponding state values, there is no way to change the state.
The inputs will be stuck displaying whatever state is set to.
```jsx
import React, { useState } from "react";
function Form() {
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Henry");
  return (
    <form>
      <input type="text" value={firstName} />
      <input type="text" value={lastName} />
      <button type="submit">Submit</button>
    </form>
  );
}
export default Form;
```
To control a form, we also need our form to _update_ state.
Changing state values causes React to re-render and our inputs will display the new state.
`setFirstName` and `setLastName` are what we'll need to initiate a state change.
It should fire every time the input value changes, and should display whatever change a user makes.
Every letter typed in an input should be displayed.
To do that, we use the event listener `onChange`, which React has set up for us:
```jsx
function Form() {
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Henry");
  return (
    <form>
    <input type="text" onChange={handleFirstNameChange} value={firstName} />
    <input type="text" onChange={handleLastNameChange} value={lastName} />
    <button type="Submit">Submit</button>
    </form>
  );
}
```
- `onChange` fires every time the value of an input changes.
- To use `onChange`, pass a callback that accepts `event` as its argument.
- The `event` data being passed in is automatically provided by the `onChange` event listener.`The `event` contains data 
about the `target`, which is whatever DOM element the `event` is triggered on.
- That `target`, being an `input` element, has a `value` attribute.
- The attribute is equal to whatever is currently entered into that particular `input`.
- The attribute is not the value provided from state.
- When we read `event.target.value`, we get whatever content is present when the event fired.
- For instance, in the case of our first input, that would be a combination of whatever `firstName` is equal to _plus_ the last key stroke.
- So if you press 's', `event.target.value` would be "Johns".
- Inside both handler functions is a function to update state. `setFirstName()` and `setLastName()`.
- In these functions, we're updating state based on `event.target.value`.
- T- his causes a re-render and the cycle completes.
- The new state values we set are used to set the `value` attributes of our two `input`s.
- From a **user**'s perspective, the form behaves exactly how we'd expect, displaying the text that is typed. 
- From React's perspective, we gain control over form values, giving us the ability to more easily manipulate (or restrict) what 
our `inputs`s display, and send form data to other parts of the app or out onto the internet...
- Controlling forms makes it more convenient to share form values between components.
- Since the form values are stored in state, they are easily passed down as props or sent upward via a function supplied in props.
```jsx
function Form() {
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Henry");
  function handleFirstNameChange(event) {
      setFirstName(event.target.value);
  }
  function handleLastNameChange(event) {
        setLastName(event.target.value);
  }
  return (
    <form>
    <input type="text" onChange={handleFirstNameChange} value={firstName} />
    <input type="text" onChange={handleLastNameChange} value={lastName} />
    <button type="Submit">Submit</button>
    </form>
  );
}
```
## Form Element Types
Form elements include 
`<input>`, 
`<textarea>`, 
`<select>`, and 
`<form>` itself.
When we talk about inputs in this lesson, we broadly mean the form elements
(`<input>`, 
`<textarea>`, 
`<select>`),
and not always specifically just `<input>`.
To control the value of these inputs, we use a prop specific to that type of input:
- `<input>`, `<textarea>`, and `<select>`: -- use `value`.
- For a checkbox (`<input type="checkbox">`), use `checked`:
- Each of the input types has an `onChange` event listener, allowing us to update state when a user interacts with a form. 
- Once that happens, the `value` or `checked` attribute is then set based on the updated state value. Combining
  these two steps is what enables us to set up controlled forms.
```jsx
import React, { useState } from "react";
function Form() {
  const [newsletter, setNewsletter] = useState(false);
  function handleNewsletterChange(event) {
    // .checked, not .value!
    setNewsletter(event.target.checked);
  }
  return (
    <form>
      <label htmlFor="newsletter">Subscribe to our Newsletter?</label>
      <input
        type="checkbox"
        id="newsletter"
        onChange={handleNewsletterChange}
        checked={newsletter} {/* checked instead of value */}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
export default Form;
```
## Why Use Controlled Forms When We Do Not Have To
- Since we can set our state _elsewhere_ using this setup, it's easy to populate forms from existing
available data.
- When we have a controlled form, the state does not need to be stored in the same component. 
- We could store state in a parent component, instead. 
- To demonstrate this, we'll create a `ParentComponent`. 
  • The `ParentComponent` can hold all the functions while `Form` just handles the display of JSX:
```jsx
import React, { useState } from "react";
import Form from "./Form";
function ParentComponent() {
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Henry");
  function handleFirstNameChange(event) {
    setFirstName(event.target.value);
  }
  function handleLastNameChange(event) {
    setLastName(event.target.value);
  }
  return (
    <Form
      firstName={firstName}
      lastName={lastName}
      handleFirstNameChange={handleFirstNameChange}
      handleLastNameChange={handleLastNameChange}
    />
  );
}
export default ParentComponent;
```
Then `Form` becomes:
```jsx
// src/components/Form
import React from "react";
function Form({
  firstName,
  lastName,
  handleFirstNameChange,
  handleLastNameChange,
}) {
  return (
    <form>
      <input type="text" onChange={handleFirstNameChange} value={firstName} />
      <input type="text" onChange={handleLastNameChange} value={lastName} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
```
- The application is currently redering `Form` directly in `index.js`.
- Update `src/index.js` so that it renders `ParentComponent` instead of `Form`.
- With `ParentComponent`, we've moved all the form logic up one level.
Being able to store controlled form data in other components opens doors for us. 
For instance, we could create another component, a sibling of `Form`, that displays our form data as soon as a user starts filling
in the form:
```jsx
// src/components/DisplayData
import React from "react";
function DisplayData({ firstName, lastName }) {
  return (
    <div>
      <h1>{firstName}</h1>
      <h1>{lastName}</h1>
    </div>
  );
}
export default DisplayData;
```
...and adding it alongside `Form` (also wrapping both in a `div`):
```jsx
// src/components/ParentComponent
import React, { useState } from "react";
import Form from "./Form";
import DisplayData from "./DisplayData";
function ParentComponent() {
  // ...
  return (
    <div>
      <Form
        firstName={firstName}
        lastName={lastName}
        handleFirstNameChange={handleFirstNameChange}
        handleLastNameChange={handleLastNameChange}
      />
      <DisplayData firstName={firstName} lastName={lastName} />
    </div>
  );
}
```
- Now we have a component that reads from the same state we're changing with the form.
- This can be a very useful way to capture user input and utilize it throughout
your application, even if a server is not involved.
- The opposite can also be true. Imagine a user profile page with an 'Edit' button 
that opens a form for updating user info. 
- When a user clicks that 'Edit' button, they expect to see a form with their user data 
pre-populated. 
- This way, they can easily make small changes without rewriting all their profile info.
- This could be achieved by populating a form with data from props! After all, if we have a React app that is displaying
user information, that information is stored _somewhere_ on the app.
## Controlled Forms for Validation
It might seem a little counterintuitive that we need to be so verbose when working with forms in React, but this actually opens the door to additional functionality. For example, let's say we want to write an input that only takes the numbers `0` through `5`. We can now validate the data the user enters _before_ we set it on the state, allowing us to block any invalid values:
```jsx
function Form() {
  const [number, setNumber] = useState(0);
  function handleNumberChange(event) {
    const newNumber = parseInt(event.target.value);
    if (newNumber >= 0 && newNumber <= 5) {
      setNumber(newNumber);
    }
  }
  return (
    <form>
      <input type="number" value={number} onChange={handleNumberChange} />
    </form>
  );
}
```
- If the input is invalid, we simply avoid updating the state, preventing the input from updating. 
- We could optionally set another state property (for example, `isInvalidNumber`). 
- Using that state property, we can show an error in our component to indicate that the user tried to enter an invalid value:
```jsx
function Form() {
  const [number, setNumber] = useState(0);
  const [isInvalidNumber, setIsInvalidNumber] = useState(null);
  function handleNumberChange(event) {
    const newNumber = parseInt(event.target.value);
    if (newNumber >= 0 && newNumber <= 5) {
      setNumber(newNumber);
      setIsInvalidNumber(null);
    } else {
      setIsInvalidNumber(`${newNumber} is not a valid number!`);
    }
  }
  return (
    <form>
      <input type="number" value={number} onChange={handleNumberChange} />
      {isInvalidNumber ? <span style={{ color: "red" }}>{isInvalidNumber}</span> : null}
    </form>
  );
}
```
If we tried to do this using an uncontrolled component, the input would be
entered regardless, since we don't have control over the internal state of the
input. In our `onChange` handler, we'd have to roll the input back to its
previous value, which is pretty tedious!

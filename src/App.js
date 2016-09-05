import React, { Component } from 'react';
import Form from './components/Form';
import TextInput from './components/TextInput';
import { isNumeric, maxLength } from './components/Validations';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Form ref="form1">
          <h2>Form 1</h2>
          <div>
            <TextInput 
              registeredName="inputA" 
              defaultValue="defaultA"
              validations={maxLength.bind(maxLength, 5)}
              required/>
          </div>
          <div>
            <TextInput
              registeredName="inputB"
              defaultValue="defaultB"
              validations={[isNumeric, maxLength.bind(maxLength, 4)]}
              required/>
          </div>
        </Form>
        
        <Form ref="form2">
          <h2>Form 2</h2>
          <div>
            <TextInput 
              registeredName="foo" 
              defaultValue="defaultB"
              validations={maxLength.bind(maxLength, 5)}
              required/>
          </div>
          <div>
            <TextInput
              registeredName="bar"
              defaultValue="defaultA"
              validations={[isNumeric, maxLength.bind(maxLength, 4)]}
              required/>
          </div>
        </Form>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import FormManager from './components/FormManager';
import Form from './components/Form';
import TextInput from './components/TextInput';
import FormSelector from './components/FormSelector';
import SubmitButton from './components/SubmitButton';
import { isNumeric, maxLength } from './components/Validations';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            globalError: '',
            forms: [{
                name: 'form1',
                active: true,
            },{
                name: 'form2',
                active: true,
            }],
            hideNonActiveForms: false
        };

        this.onFormButtonClick = this.onFormButtonClick.bind(this);
        this.onCheckBoxClick = this.onCheckBoxClick.bind(this);
        this.getForm = this.getForm.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    render() {
        let form1 = this.getForm('form1');
        let showForm1 = !this.state.hideNonActiveForms || form1.active;

        let form2 = this.getForm('form2');
        let showForm2 = !this.state.hideNonActiveForms || form2.active;

        return (
            <div className="App">
                <FormManager ref="formMgr">
                    <div className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h2>Welcome to React</h2>
                    </div>

                    <FormSelector 
                        forms={this.state.forms}
                        hideNonActiveForms={this.state.hideNonActiveForms}
                        onFormButtonClick={this.onFormButtonClick}
                        onCheckBoxClick={this.onCheckBoxClick}/>
                    
                    { this.state.globalError ?
                        <div style={{textAlign: 'center', color: 'red'}}>
                            <span>{this.state.globalError}</span>
                        </div>
                    : null } 

                    { showForm1 ?     
                        <Form 
                            name={form1.name}
                            managed
                            active={form1.active}
                            hide={!form1.active}
                            onSubmit={this.formSubmit}>
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
                    : null }
                    
                    { showForm2 ? 
                        <Form 
                            name={form2.name}
                            managed
                            active={form2.active}
                            onSubmit={this.formSubmit}>
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
                    : null }

                    <SubmitButton onSubmit={this.onSubmit} />

                </FormManager>
            </div>
        );
    }

    onFormButtonClick(formName) {
        let forms = this.state.forms;
        forms.forEach(function(form) {
            if(form.name === formName) {
                form.active = !form.active;
            }
        });
        this.setState({
            forms: forms
        });
    }

    onCheckBoxClick(event) {
        this.setState({
            hideNonActiveForms: event.target.checked,
        });
    }

    getForm(formName) {
        let filtered = this.state.forms.filter(function(form) {
            return form.name === formName;
        });

        if(filtered.length < 1 ) {
            return undefined;
        } else {
            return filtered[0];
        }
    }

    formSubmit(model) {
        console.log(model);
    }

    onSubmit() {
        let formMgr = this.refs.formMgr;
        if(!formMgr.allActiveFormsValid()) {
            this.setState({
                globalError: 'There is a form error'
            });
            return;
        }

        let forms = formMgr.getAllActiveForms(true);
        forms.forEach(function(form) {
            form.submit();
        });
    }
}

export default App;

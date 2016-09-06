import React, { Component } from 'react';
import { isRequired } from '../Validations';

class Form extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isValid: false,
			isSubmitting: false
		};

		this.registerInput = this.registerInput.bind(this);
		this.attachToForm = this.attachToForm.bind(this);
		this.detachFromForm = this.detachFromForm.bind(this);
		this.updateModel = this.updateModel.bind(this);
		this.validateInput = this.validateInput.bind(this);
		this.validateForm = this.validateForm.bind(this);
		this.isValid = this.isValid.bind(this);
	}

	componentWillMount() {
		this.model = {};
		this.inputs = {};

		if(this.props.managed && this.props.attachToManager) {
			this.props.attachToManager(this);
		}
	}

	componentDidMount() {
		this.validateForm();
	}

	render() {
		const childrenWithProps = React.Children.map(this.props.children, this.registerInput);

		return (
			<form onSubmit={function(e){e.preventDefault();}}>
				{ childrenWithProps }
			</form>
		);
	}

	registerInput(child) {
		// Ensures that any text inside of a tag is rendered.
		if(!React.isValidElement(child)) {
			return child;
		}

		let additionalProps = {};
		if(child.props.registeredName) {
			additionalProps.attachToForm = this.attachToForm;
			additionalProps.detachFromForm = this.detachFromForm;
			additionalProps.updateModel = this.updateModel;
			additionalProps.validateInput = this.validateInput;
		}

		let grandChildren = undefined;
		if(child.props.children) {
			grandChildren = React.Children.map(child.props.children, this.registerInput);
		}

		return React.cloneElement(child, additionalProps, grandChildren); 
	}

	// Called by registered child inputs
	attachToForm(component) {
		this.inputs[component.props.registeredName] = component;
		this.model[component.props.registeredName] = component.state.value;
	}

	// Called by registered child inputs
	detachFromForm(component) {
		delete this.inputs[component.props.registeredName];
		delete this.model[component.props.registeredName];
	}

	// Called by registered child inputs
	updateModel(component, value) {
		this.model[component.props.registeredName] = value;
	}

	// Called by registered child inputs
	validateInput(component) {
		// If input is not required and does not have any validations listed
		// then there is no need to validate.
		if(!component.props.required && !component.props.validations) {
			return;
		}

		let isValid = true;
		if(component.state.value || component.props.required) {
			let validations = component.props.validations || []; 
			if(typeof validations === 'function') {
				validations = [ validations ];
			}

			if(component.props.required) {
				validations = [ isRequired, ...validations ];
			}

			for(let i = 0; i < validations.length; i++) {
				let validator = validations[i];
				if(!validator(component.state.value)) {
					isValid = false;
					break;
				}
			}
		}

		component.setState({
			isValid: isValid,
		}, this.validateForm);
	}

	validateForm() {
		let allInputsValid = true;
		let registeredNames = Object.keys(this.inputs);
		for(var i = 0; i < registeredNames.length; i++) {
			let registeredName = registeredNames[i];
			if(!this.inputs[registeredName].state.isValid) {
				allInputsValid = false;
				break;
			}
		}

		this.setState({
			isValid: allInputsValid
		});
	}

	isValid() {
		return this.state.isValid;
	}
}

export default Form; 
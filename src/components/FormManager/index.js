import React, { Component } from 'react';
import Form from '../Form';

class FormManager extends Component {
	constructor(props) {
		super(props);

		this.attachToManager = this.attachToManager.bind(this);
		this.detachFromManager = this.detachFromManager.bind(this);
		this._setChildProps = this._setChildProps.bind(this);
		this.getAllActiveForms = this.getAllActiveForms.bind(this);
		this.allActiveFormsValid = this.allActiveFormsValid.bind(this);
	}

	componentWillMount() {
		this.forms = {};
	}

	render() {
		const childrenWithProps = React.Children.map(this.props.children, this._setChildProps);

		return (
			<div>
				{childrenWithProps}
			</div>
		);
	}

	attachToManager(form) {
		this.forms[form.props.name] = form
	}

	detachFromManager(form) {
		delete this.forms[form.props.name];
	}

	getAllActiveForms(asArray) {
		let activeForms = [];
		if(asArray) {
			Object.keys(this.forms).forEach(function(formName) {
				let form = this.forms[formName];
				if(form.isValid()) {
					activeForms.push(form);
				}
			}, this);
		} else {
			
		}
		return activeForms;
	}

	allActiveFormsValid() {
		let allFormsValid = true;
		Object.keys(this.forms).forEach(function(formName) {
			var form = this.forms[formName];
			if(form.isActive() && !form.state.isValid) {
				allFormsValid = false;
			}
		}, this);
		return allFormsValid;
	}

	_setChildProps(child) {
		if(!React.isValidElement(child)) {
			return child;
		}

		let additionalProps = {};
		if(child.type === Form) {
			additionalProps.attachToManager = this.attachToManager;
			additionalProps.detachFromManager = this.detachFromManager;
		}

		let grandChildren = undefined;
		if(child.props.children) {
			grandChildren = React.Children.map(child.props.children, this._setChildProps)
		}

		return React.cloneElement(child, additionalProps, grandChildren);
	}
}

export default FormManager;
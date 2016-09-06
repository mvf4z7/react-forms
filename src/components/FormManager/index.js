import React, { Component } from 'react';
import Form from '../Form';

class FormManager extends Component {
	constructor(props) {
		super(props);

		this.attachToManager = this.attachToManager.bind(this);
		this._setChildProps = this._setChildProps.bind(this);
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
		console.log(form.type);
		this.forms[form.props.name] = form
	}

	_setChildProps(child) {
		if(!React.isValidElement(child)) {
			return child;
		}

		let additionalProps = {};
		if(child.type === Form) {
			additionalProps.attachToManager = this.attachToManager;
		}

		let grandChildren = undefined;
		if(child.props.children) {
			grandChildren = React.Children.map(child.props.children, this._setChildProps)
		}

		return React.cloneElement(child, additionalProps, grandChildren);
	}
}

export default FormManager;
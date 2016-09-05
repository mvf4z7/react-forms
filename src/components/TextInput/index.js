import React, { Component } from 'react';

class TextInput extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: this.props.defaultValue || ''
		};

		this.onChange = this.onChange.bind(this);
		this.isRegisteredInput = this.isRegisteredInput.bind(this);
	}

	componentWillMount() {
		if(this.isRegisteredInput()) {
			this.props.attachToForm(this);
		}
	}

	componentWillUnmount() {
		if(this.isRegisteredInput()) {
			this.props.detachFromForm(this);
		}
	}

	componentDidMount() {
		this.props.validateInput(this);
	}

	render() {
		return (
			<input type="text" name={this.props.registeredName} value={this.state.value} onChange={this.onChange} />
		);
	}

	onChange(event) {
		let value = event.target.value;
		this.props.updateModel(this, value);
		this.setState({
			value: value
		}, function() {
			if(this.isRegisteredInput()) {
				this.props.validateInput(this);
			}
		}.bind(this));
	}

	isRegisteredInput() {
		return this.props.registeredName && this.props.attachToForm && this.props.detachFromForm;
	}
}

export default TextInput;
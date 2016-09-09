import React, { Component } from 'react';

class FormSelector extends Component {
	render() {
		let forms = this.props.forms;
		let buttonContainerStyle = {
			display: 'flex',
		};

		return (
			<div>
				<div>
					<label htmlFor="hide">Hide non-active Forms</label>
					<input 
						name="hide"
						type="checkbox"
						value={this.props.hideNonActiveForms}
						onChange={this.props.onCheckBoxClick}/>
				</div>
				<div style={buttonContainerStyle}>
					{
						forms.map(function(form) {
							return <FormButton 
										name={form.name}
										selected={form.active}
										onClick={this.props.onFormButtonClick.bind(null, form.name)}
										key={form.name}
										width={`${(1/forms.length)*100}%`} />
						}, this)
					}
				</div>
			</div>
		);
	}
}

function FormButton(props) {
	let style = {
		fontSize: '1.2rem',
		backgroundColor: props.selected ? 'green' : 'white',
		color: props.selected ? 'white' : 'black',
		border: '1px solid gray',
		padding: '1em',
		width: props.width || undefined,
		cursor: 'pointer',
	};

	return (
		<div style={style} onClick={props.onClick}>
			<span>{props.name}</span>
		</div>
	);
}

export default FormSelector;
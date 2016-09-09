import React from 'react';

function SubmitButton(props) {
	let divStyle = {
		textAlign: 'center',
	};

	let spanStyle = {
		padding: '1rem 2rem',
		backgroundColor: 'lightgray',
		display: 'inline-block',
		cursor: 'pointer',
		marginTop: '1.5rem',
	};

	return (
		<div onClick={props.onSubmit} style={divStyle}>	
			<span style={spanStyle}>SUBMIT</span>
		</div>
	);
}

export default SubmitButton;
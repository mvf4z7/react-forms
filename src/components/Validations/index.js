import _ from 'lodash';

var Validator = {
	_validationFunction: undefined,

	_init(fn) {
		this._validationFunction = fn;
	}, 

	init(...args) {
		let fn = this._validationFunction;
		if(args.length > 0) {
			fn = fn.bind(fn, ...args);
		}
		return fn;
	}
}

function createValidatorObj(fn) {
	var validator = Object.create(Validator);
	validator._init(fn);
	return validator;
}

export function isRequired(value) {
	let isValid = true;
	if(!value) {
		isValid = false;
	}

	return isValid;
}

export function maxLength(maxLengthValue, value) {
	if(_.isString(value)) {
		return value.length <= maxLengthValue;
	} else {
		return false;
	}
}

export function isNumeric(value) {
	return /^[0-9]*$/.test(value);
}

const newIsRequired = createValidatorObj(function(value) {
	let isValid = true;
	if(!value) {
		isValid = false;
	}

	return isValid;
});

const newMaxLength = createValidatorObj(function(maxLengthValue, value) {
	if(_.isString(value)) {
		return value.length <= maxLengthValue;
	} else {
		return false;
	}
});

// window.newIsRequired = newIsRequired;
// window.newMaxLength = newMaxLength;

// console.log('isRequired result: ', newIsRequired.init()('abc'));
// console.log('maxLength result: ', newMaxLength.init(3)('123'));
// console.log('maxLength result: ', newMaxLength.init(2)('123'));




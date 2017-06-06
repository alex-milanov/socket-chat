'use strict';

// dom
const {h1, section, button, span, label, form, input} = require('iblokz-snabbdom-helpers');
// components
const counter = require('./counter');

const modes = {
	'idle': 'Idling',
	'server': 'Server',
	'client': 'Client'
}

module.exports = ({state, actions}) => section('#ui', [
	h1('Sockets Discovery & Sync Prototype'),
	section('.toolbar', [
		form([
			label('Name'),
			input('[name="name"]'),
			button('.btn[type="submit"]','Connect')
		]),
	]),
	section('.msg', state.msg)

]);

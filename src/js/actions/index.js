'use strict';

const {obj} = require('iblokz-data');

// initial
const initial = {
	username: null,
	messages: [
		// {
		// 	username: 'gosho',
		// 	message: 'hi!'
		// }
	],
	users: [
		// {
		// 	name: 'gosho',
		// 	typing: false
		// },
		// {
		// 	name: 'ivan',
		// 	typing: false
		// }
	]
};

/*
const append = (a, b) =>
	typeof a === 'string' || typeof a === 'number' && a + new Number(b)
	|| a instanceof Array && [].concat(a, b)
	|| a instanceof Object && Object.assign({}, a, b);
*/

// actions
const set = (key, patch) => state => obj.patch(state, key, patch);
const toggle = key => state => obj.patch(state, key, !obj.sub(state, key));

const join = username => state => Object.assign({}, state, {username});
const joinSuccess = ({users, messages}) => state => Object.assign({}, state, {users, messages});

const joined = username => state => obj.patch(state, 'users', [].concat(
	state.users,
	{
		username,
		typing: false
	}
));

const message = ({message, username}) => state => obj.patch(state, 'messages', [].concat(
	state.messages,
	{
		message,
		username
	}
));

module.exports = {
	initial,
	set,
	toggle,
	join,
	joinSuccess,
	joined,
	message
};

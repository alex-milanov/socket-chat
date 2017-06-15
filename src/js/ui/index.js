'use strict';

// dom
const {
	h1, div, pre, header, section,
	button, span, label, form, input,
	ul, li
} = require('iblokz-snabbdom-helpers');
// components
// const counter = require('./counter');
const formToData = form => Array.from(form.elements)
	// .map(el => (console.log(el.name), el))
	.filter(el => el.name !== undefined)
	.reduce((o, el) => ((o[el.name] = el.value), o), {});

module.exports = ({state, actions}) => div('#ui', [].concat(
	(!state.username)
		? form('#login-form', {
			on: {
				submit: ev => {
					ev.preventDefault();
					let data = formToData(ev.target);
					console.log(data);
					actions.join(data.username);
				}
			}
		}, [
			div('#name', input('[name="username"]')),
			button('Connect')
		])
		: [
			pre('#log', state.messages
				.map(msg =>
					div('.msg', [
						span('.name', msg.username),
						span(': '),
						span('.text', JSON.stringify(msg.message))
					])
				)
			),
			ul('#users', state.users.map(
				user => li(user.username + ((user.typing) ? ' (typing)' : ''))
			)),
			form('#msg-form', {
				on: {
					submit: ev => {
						ev.preventDefault();
						let data = formToData(ev.target);
						actions.message({
							message: data.message,
							username: state.username
						});
					}
				}
			}, [
				div('#new-msg',
					input({
						attrs: {
							name: 'message',
							placeholder: 'Type new message',
							value: ''
						}
					})
				),
				button('Send')
			])
		])
);

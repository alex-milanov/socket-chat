'use strict';

const {obj} = require('iblokz-data');

// initial
const initial = {
	number: 0,
	name: '',
	msgLog: []
};

const append = (a, b) =>
	typeof a === 'string' || typeof a === 'number' && a + new Number(b)
	|| a instanceof Array && [].concat(a, b)
	|| a instanceof Object && Object.assign({}, a, b);

// actions
const set = (key, patch) => state => obj.patch(state, key, patch);
const _append = (key, val) => state => obj.patch(state, key,
	append(obj.sub(state, key), val)
);

const toggle = key => state => obj.patch(state, key, !obj.sub(state, key));
const send = msg => {};

module.exports = {
	initial,
	set,
	append: _append,
	toggle
};

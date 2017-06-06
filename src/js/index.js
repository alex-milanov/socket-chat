'use strict';

// lib
const Rx = require('rx');
const $ = Rx.Observable;

// iblokz
const vdom = require('iblokz-snabbdom-helpers');
const {obj, arr} = require('iblokz-data');

// sockets
// const zonar = require('zonar');
// const zmq = require('zmq');
let socket = io.connect();
		

// app
const app = require('./util/app');
let actions = app.adapt(require('./actions'));
let ui = require('./ui');
let actions$;

// hot reloading
if (module.hot) {
	// actions
	actions$ = $.fromEventPattern(
    h => module.hot.accept("./actions", h)
	).flatMap(() => {
		actions = app.adapt(require('./actions'));
		return actions.stream.startWith(state => state);
	}).merge(actions.stream);
	// ui
	module.hot.accept("./ui", function() {
		ui = require('./ui');
		actions.stream.onNext(state => state);
	});
} else {
	actions$ = actions.stream;
}

// actions -> state
const state$ = actions$
	.startWith(() => actions.initial)
	.scan((state, change) => change(state), {})
	.map(state => (console.log(state), state))
	.share();




// state -> ui
const ui$ = state$.map(state => ui({state, actions}));
vdom.patchStream(ui$, '#ui');


// hooks
socket.on('connect', function(){
	console.log("connected");
	socket.on('sync', function(message){
		// console.log(message);
		// var transposeValue = parseInt(message[3]) / 1000 * 12
		// $("#pitch-control-transpose").val(transposeValue).change();
		// $("#x-control").val(parseFloat(message[0])*100).change();
		// $("#y-control").val(parseFloat(message[1])*100).change();
	});
});

state$.distinctUntilChanged(state => state.mode)
	.subscribe(state => {
		let z;
		switch(state.mode) {
			case 'server':
				actions.set('msg', '\nServer mode');
				// actions.append('msg', '\nError: ' + JSON.stringify(err));
			break;
			case 'client':
				actions.set('msg', '\nClient mode');
				
			break;
			default:
			case 'idle':
				actions.set('msg', '\nIdling ....');
			break;
		}
	})
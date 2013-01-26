define(['dojo/_base/declare', // declare
'dojo/Evented', // Evented
'dojo/Stateful' // Stateful
], function(declare, Evented, Stateful) {

	return declare([Evented, Stateful], {
		_targetGetter : function() {
			return  this.target || 'global';
		},
		_isFirstSelection : true
	});

});

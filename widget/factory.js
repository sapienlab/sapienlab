define(function() {

	return function(widgetProps) {		

		// root: Object
		//		Represent the root of the widget tree
		var root;

		// missing: Array
		//		Array of object definitions upcoming to instantiate 
		var missing = [widgetProps];

		while (missing.length) {

			var actual = missing.shift();

			var parentWidget = actual.$_parent;

			var children = actual.children
			delete actual.children;

			// Instantiate the actual widget
			var actualWidget = new actual.type(actual);

			if (actual.$_key)
				parentWidget.set(actual.$_key, actualWidget);
			else if (actual.$_i)
				parentWidget.addChild(actualWidget, i);
			else
				root = actualWidget;

			// annotate the upcoming object definitions to instantiate			
			for (var i in children) {
				children[i].$_parent = actualWidget;
				children[i].$_i = i;
				missing.push(children[i]);
			}
			delete actual.children;

			// has popup, dropDown, or similar attribute?
			for (var key in actual) {
				// Si este atributo tiene un miembro type, se asume que es un widget
				if (actual[key].type && key != "$_parent") {
					actual[key].$_parent = actualWidget;
					actual[key].$_key = key;
					missing.push(actual[key]);
				}
			}

		}
		
		return root;
	};

});

define(['dojo/_base/declare', // declare
'dojox/calendar/Calendar', // Calendar
'dijit/Calendar', // dijitCalendar,
'sapienlab/widgetFactory', // widgetFactory
'dojo/date/locale', // locale
'dijit/form/DropDownButton', // DropDownButton
'dojo/_base/lang'], function(declare, Calendar, dijitCalendar, widgetFactory, locale, DropDownButton, lang) {

	return declare(Calendar, {

		postCreate : function() {

			var self = this;

			self.inherited(arguments);

			// create the mini calendar
			self.miniCalendar = new dijitCalendar({});
			
			// watch the date attribute of the mini calendar for changes
			self.miniCalendar.watch('value', function(value, oldValue, newValue) {
				if(oldValue && newValue && oldValue.getTime() == newValue.getTime())					
					return;				
				self.set('date', newValue);
				self.miniCalendarDropDownButton.set('label', locale.format(newValue, {
					selector : 'date',
					formatLength : 'medium'
				}));
			});

			// create the mini calendar button
			self.miniCalendarDropDownButton = widgetFactory({
				type : DropDownButton,
				label : 'DATE_',
				style : {
					float : self.isLeftToRight() ? 'right' : 'left'
				},
				dropDown : self.miniCalendar
			});

			// add the mini calendar to the toolbar
			self.get('toolbar').addChild(self.miniCalendarDropDownButton);

			// watch the date attribute of this calendar for changes
			self.watch('date', function(name, oldValue, newValue) {
				if(oldValue && newValue && oldValue.getTime() == newValue.getTime())
					return;
				self.miniCalendar.set('date', newValue);
				self.miniCalendarDropDownButton.set('label', locale.format(newValue, {
					selector : 'date',
					formatLength : 'medium'
				}));
			});

		}
		
	}); // declare

});

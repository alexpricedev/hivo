let initDatepicker = () => {
	let date = new Date();
	$('.datepicker').datetimepicker({
		defaultDate: date,
		maxDate: date,
		format: 'Do MMMM YYYY',
		locale: 'en'
	});
};

Modules.client.initDatepicker = initDatepicker;

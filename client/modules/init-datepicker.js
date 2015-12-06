let initDatepicker = () => {
	let date = new Date();
	$('.datepicker').datetimepicker({
		defaultDate: date,
		format: 'Do MMMM YYYY',
		locale: 'en'
	});
};

Modules.client.initDatepicker = initDatepicker;

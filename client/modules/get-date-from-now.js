let getDateFromNow = (momentDate) => {
	return momentDate.locale('en').calendar(
		null,
		{
			sameDay: '[Today]',
			nextDay: '[Tomorrow]',
			nextWeek: 'dddd',
			lastDay: '[Yesterday]',
			lastWeek: '[Last] dddd'
		}
	);
}

Modules.client.getDateFromNow = getDateFromNow;

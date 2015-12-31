let fullName = (user) => {
  return user.profile.name.first + ' ' + user.profile.name.last;
};

let emailAddress = (user) => {
  return user.emails[0].address;
};

let dateLabel = (date) => {
  if (date) {
		let fromNow = moment(date).fromNow();
		return <span className="badge mod-info">{fromNow}</span>;
  } else {
		return <span className="badge mod-danger">Never</span>;
  }
};

let dateString = (date) => {
	return moment(date).format('Do MMMM YYYY');
};

let dateFromNow = (momentDate) => {
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
};

let sentanceCase = (string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

FormattingHelpers = {
  fullName: fullName,
  emailAddress: emailAddress,
  dateLabel: dateLabel,
	dateString: dateString,
	dateFromNow: dateFromNow,
	sentanceCase: sentanceCase
};

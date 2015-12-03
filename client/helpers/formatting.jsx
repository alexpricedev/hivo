let fullName = (user) => {
  return user.profile.name.first + ' ' + user.profile.name.last;
};

let emailAddress = (user) => {
  return user.emails[0].address;
};

let dateLabel = (date) => {
  if (date) {
		let fromNow = moment(date).fromNow();
		return <span className="label label-info">{fromNow}</span>;
  } else {
		return <span className="label label-danger">Never</span>;
  }
};

let dateString = (date) => {
	return moment(date).format('Do MMMM YYYY');
};

let sentanceCase = (string) => {
	return Modules.both.capitalizeFirstLetter(string);
};

FormattingHelpers = {
  fullName: fullName,
  emailAddress: emailAddress,
  dateLabel: dateLabel,
	dateString: dateString,
	sentanceCase: sentanceCase
};

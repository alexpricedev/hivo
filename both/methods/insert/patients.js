Meteor.methods({
  insertPatient(props) {
		check(props, Object);

		let users = Meteor.users.find({
			'profile.counsellor._id': props.counsellor._id
		}).fetch();

		let userExists = false;

		if (users) {
			_.forEach(users, function(user) {
				if (user.emails[0].address == props.email) {
					userExists = true;
				}
			});
		}

		if (userExists) {
			Bert.alert('A user with that email address already exists.', 'danger', 'fixed-top', 'fa-envelope');
		} else {
			let name = {
				first: props.first,
				last: props.last
			};

			// TODO: assign random password to user
			// let password = Random.secret([16]);

			Accounts.createUser({
				email: props.email,
				password: 'password',
				profile: {
					name: name,
					isAdmin: false,
					counsellor: props.counsellor
				}
			});

			// TODO: Improve error handling here.
			// Currently a false data submit will still result in
			// a 'success' Bert notification.

			Bert.alert('Invitation sent', 'success', 'growl-top-right');

			FlowRouter.go('index');
		}
	}
});

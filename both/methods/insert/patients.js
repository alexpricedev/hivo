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

			let password = Random.secret([16]);

			// TODO: assign random password to user
			Accounts.createUser({
				email: props.email,
				password: 'password',
				profile: {
					name: name,
					isAdmin: false,
					counsellor: props.counsellor
				}
			});

			Bert.alert('Invitation sent', 'success', 'growl-top-right');

			FlowRouter.go('index');
		}
	}
});

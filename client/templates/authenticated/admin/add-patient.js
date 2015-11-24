Template.adminAddPatient.onCreated(() => {
  Template.instance().subscribe('patients', Meteor.userId());
});

Template.adminAddPatient.events({
  'submit form': (event) => {
    event.preventDefault();

		let props = {
			email: event.target.email.value,
			first: event.target.first.value,
			last: event.target.last.value,
      counsellor: Meteor.user()
		};

    Meteor.call('insertPatient', props)
  }
});

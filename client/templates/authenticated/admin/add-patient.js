Template.adminAddPatient.onCreated(() => {
  Template.instance().subscribe('patients');
});

Template.adminAddPatient.events({
  'submit form': function(event) {
    event.preventDefault();

		var props = {
			email: event.target.email.value,
			first: event.target.first.value,
			last: event.target.last.value,
      counsellor: Meteor.user()
		};

    Meteor.call('insertPatient', props)
  }
});

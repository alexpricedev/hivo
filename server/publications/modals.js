Meteor.publish('modals', (slug) => {
	check(slug, String);
	return Modals.find({ slug: slug });
});

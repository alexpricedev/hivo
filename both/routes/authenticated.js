const authenticatedRedirect = () => {
  if ( !Meteor.loggingIn() && !Meteor.userId() ) {
    FlowRouter.go( 'login' );
  }
};

const authenticatedRoutes = FlowRouter.group({
  name: 'authenticated',
  triggersEnter: [ authenticatedRedirect ]
});

authenticatedRoutes.route( '/', {
  name: 'index',
  action() {
    BlazeLayout.render( 'default', { yield: 'index' } );
  }
});

authenticatedRoutes.route( '/patient/:_id', {
  name: 'adminPatientOverview',
  action(params) {
    BlazeLayout.render( 'default', { yield: 'adminPatientOverview' } );
  }
});

authenticatedRoutes.route( '/depression', {
  name: 'depression',
  action() {
    BlazeLayout.render( 'default', { yield: 'depression', footer:'footer' } );
  }
});

authenticatedRoutes.route( '/depression/exercise-one', {
  name: 'depressionExerciseOne',
  action() {
    BlazeLayout.render( 'default', { yield: 'depressionExerciseOne', footer:'footer' } );
  }
});

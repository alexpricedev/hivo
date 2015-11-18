Template.depressionExerciseOne.onRendered(function() {
    if (!Session.get('depressionExerciseOneModalSeen')) {
        $('#myModal').modal('show');
        Session.set('depressionExerciseOneModalSeen', true);
    }

    Session.set('footerProgress', 10);
});

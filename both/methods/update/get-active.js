Meteor.methods({
  updateProgramLastCompleted(_id) {
    check(_id, String);

    try {
      var programId = GetActive.update(_id, {
        $set: {
          lastCompleted: new Date()
        }
      });
      return programId;
    } catch (exception) {
      return exception;
    }
  }
});

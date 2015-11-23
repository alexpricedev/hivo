Meteor.methods({
  updateProgramLastCompleted(_id) {
    check(_id, String);

    try {
      return Programs.update(_id, {
        $set: {
          lastCompleted: new Date()
        }
      });
    } catch (exception) {
      return exception;
    }
  },
  updateProgramProgress(_id, newProgress) {
    check(_id, String);
    check(newProgress, Number);

		let program = Programs.findOne(_id);

		if (program.progress < newProgress) {
			try {
				return Programs.update(_id, {
					$set: {
						progress: newProgress
					}
				});
			} catch (exception) {
				return exception;
			}
		}
  }
});

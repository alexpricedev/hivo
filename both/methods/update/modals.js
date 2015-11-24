Meteor.methods({
  updateModal(modalProps) {
    check(modalProps, Object);

    try {
      let modalId = Modals.update(modalProps._id, {
        $set: modalProps
      });
      return modalId;
    } catch (exception) {
      return exception;
    }
  }
});

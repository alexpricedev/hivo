Meteor.methods({
  insertModal(modal) {
    check(modal, ModalSchema);

    try {
      return Modals.insert(modal);
    } catch (exception) {
      return exception;
    }
  }
});

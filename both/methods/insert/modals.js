Meteor.methods({
  insertModal: function(modal) {
    check(modal, ModalSchema);

    try {
      return Modals.insert(modal);
    } catch (exception) {
      return exception;
    }
  }
});

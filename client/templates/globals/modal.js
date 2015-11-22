Template.modal.onCreated(() => {
  Template.instance().subscribe('modals');
});

Template.modal.helpers({
  modalObject() {
    return Modals.findOne('osXNmfxu27tM2v3B4');
  }
});

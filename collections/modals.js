Modals = new Meteor.Collection( 'modals' );

Modals.allow({
  insert: () => true,
  update: () => false,
  remove: () => false
});

Modals.deny({
  insert: () => false,
  update: () => true,
  remove: () => true
});

let ModalSchema = new SimpleSchema({
  "title": {
    type: String,
    label: "The title for the modal window."
  },
  "text": {
    type: String,
    label: "The text that will appear in the modal window."
  },
  "userHasSeen": {
    type: Boolean,
    label: "Has the user seen this modal window?"
  }
});

Modals.attachSchema( ModalSchema );

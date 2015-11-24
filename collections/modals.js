Modals = new Meteor.Collection('modals');

Modals.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Modals.deny({
  insert: () => true,
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
  "slug": {
    type: String,
    label: "The slug used to find this document."
  }
});

Modals.attachSchema(ModalSchema);

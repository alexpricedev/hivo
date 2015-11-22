GetActive = new Meteor.Collection( 'getActive' );

GetActive.allow({
  insert: () => true,
  update: () => true,
  remove: () => false
});

GetActive.deny({
  insert: () => false,
  update: () => false,
  remove: () => true
});

let GetActiveSchema = new SimpleSchema({
  "userId": {
    type: String,
    label: "The ID of the user completing the exercise."
  },
  "title": {
    type: String,
    label: "The title of the program",
    optional: true,
    defaultValue: 'Get Active, Feel Good - Depression'
  },
  "path": {
    type: String,
    label: "The route name for this program",
    optional: true,
    defaultValue: 'depression'
  },
  "exercises": {
    type: [String],
    label: "A list of exercise IDs",
    optional: true,
    defaultValue: []
  },
  "lastCompleted": {
    type: Date,
    label: "The date this program was last completed.",
    optional: true
  }
});

GetActive.attachSchema( GetActiveSchema );

Programs = new Meteor.Collection('programs');

Programs.allow({
  insert: () => true,
  update: () => true,
  remove: () => false
});

Programs.deny({
  insert: () => false,
  update: () => false,
  remove: () => true
});

let ProgramsSchema = new SimpleSchema({
  "userId": {
    type: String,
    label: "The ID of the user completing the program."
  },
  "title": {
    type: String,
    label: "The title of the program.",
    optional: true
  },
  "route": {
    type: String,
    label: "The name of the route for this program type.",
    optional: true
  },
  "exercises": {
    type: [String],
    label: "An ordered list of the exerciseIds assigned to this program.",
    optional: true
  },
  "progress": {
    type: Number,
    label: "Percentage progress the user has made on this program.",
    optional: true,
		min: 0,
		max: 100,
    defaultValue: 0
  },
  "lastCompleted": {
    type: Date,
    label: "The date this program was last completed.",
    optional: true
  }
});

Programs.attachSchema(ProgramsSchema);

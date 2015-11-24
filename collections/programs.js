Programs = new Meteor.Collection('programs');

Programs.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Programs.deny({
  insert: () => true,
  update: () => true,
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
  "description": {
    type: String,
    label: "The description of this program that will be displayed to the councillor.",
    optional: true
  },
  "tags": {
    type: [String],
    label: "A list of tags related to this program.",
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

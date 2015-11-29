Exercises = new Meteor.Collection('exercises');

Exercises.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Exercises.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let ExercisesSchema = new SimpleSchema({
  "userId": {
    type: String,
    label: "The ID of the user completing the exercise."
  },
  "title": {
    type: String,
    label: "The title of the exercise type.",
		optional: true
  },
  "route": {
    type: String,
    label: "The name of the route for the exercise type.",
		optional: true
  },
  "program": {
    type: String,
    label: "The ID for the parent program for this exercise.",
		optional: true
  },
  "order": {
    type: Number,
    label: "The position of this exercise in the program list.",
		optional: true
  },
  "modal": {
    type: String,
    label: "The ID for the modal window to display.",
		optional: true
  },
  "exerciseData": {
    type: Object,
    label: "The data collected from the exercise.",
    optional: true,
		blackbox: true
  },
  "complete": {
    type: Boolean,
    label: "Has the exercise been completed?",
    optional: true
  }
});

Exercises.attachSchema(ExercisesSchema);

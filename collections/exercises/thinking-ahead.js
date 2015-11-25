let ThinkingAhead = new SimpleSchema({
  "date": {
    type: Date,
    label: "The date which this exercise was filled out.",
    optional: true
  },
  "goal": {
    type: String,
    label: "The text representing the goal the user wants to achive.",
    optional: true,
    defaultValue: ''
  },
  "rating": {
    type: Number,
    label: "A rating of the users ability to achive the goal.",
    optional: true,
		min: 0,
		max: 6,
    defaultValue: 0
  },
});

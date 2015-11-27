let StartingPoint = new SimpleSchema({
  "date": {
    type: Date,
    label: "The date which this exercise was filled out.",
    optional: true
  },
  "morning": {
    type: [Object],
    label: "",
    optional: true
  },
  "afternoon": {
    type: [Object],
    label: "",
    optional: true
  },
  "evening": {
    type: [Object],
    label: "",
    optional: true
  }
});

let ImpactOfDepressionSchema = new SimpleSchema({
  "behavioural": {
    type: String,
    label: "The text entered for the behavioural textarea.",
    optional: true,
    defaultValue: ''
  },
  "thoughts": {
    type: String,
    label: "The text entered for the thoughts textarea.",
    optional: true,
    defaultValue: ''
  },
  "physical": {
    type: String,
    label: "The text entered for the physical textarea.",
    optional: true,
    defaultValue: ''
  }
});

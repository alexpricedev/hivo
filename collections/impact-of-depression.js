ImpactOfDepression = new Meteor.Collection( 'impactOfDepression' );

ImpactOfDepression.allow({
  insert: () => true,
  update: () => true,
  remove: () => false
});

ImpactOfDepression.deny({
  insert: () => false,
  update: () => false,
  remove: () => true
});

let ImpactOfDepressionSchema = new SimpleSchema({
  "userId": {
    type: String,
    label: "The ID of the user completing the exercise."
  },
  "title": {
    type: String,
    label: "The title of the exercise.",
    optional: true,
    defaultValue: 'How Is Depression Affecting You?'
  },
  "path": {
    type: String,
    label: "The route name of the exercise.",
    optional: true,
    defaultValue: 'how-is-depression-affecting-you'
  },
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
  },
  "complete": {
    type: Boolean,
    label: "Has the exercise been completed?",
    optional: true,
    autoValue: function() {
        if (this.isUpdate ) {
            return true;
        }
    }
  }
});

ImpactOfDepression.attachSchema( ImpactOfDepressionSchema );

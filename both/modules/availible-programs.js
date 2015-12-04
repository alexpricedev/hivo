let availiblePrograms = [
	{
		title: 'Depression',
		route: 'depression',
		description: 'Help your patient to get on top of low mood and depression with this CBT program.',
		tags: ['depression', 'cognitive behavioural therapy'],
		exercises: [
			{
				order: 0,
				route: 'impact-of-depression',
				title: 'How Is Your Depression and Low Mood Affecting You'
			},
			{
				order: 1,
				route: 'thinking-ahead',
				title: 'What Do You Want to Get Out of Treatment?'
			},
			{
				order: 2,
				route: 'starting-point',
				title: 'My Starting Point Diary'
			}
		]
	},
	{
		title: 'Anxiety 101',
		route: 'anxiety',
		description: 'Help your patient to beat anxiety.',
		tags: ['anxiety', 'cognitive behavioural therapy']
	}
];

Modules.both.availiblePrograms = availiblePrograms;

let modals = [{
  title: 'How Is Your Depression and Low Mood Affecting You?',
  text: 'This exercise is about thinking about how your depression or low mood is affecting you. In each of the three boxes write in the type of things you have stopped doing or are doing differently, some of the unhelpful thoughts that commonly go through your head and the way you feel physically. Don’t worry if this seems difficult.',
	slug: 'impact-of-depression'
}, {
  title: 'Thinking Ahead',
  text: 'In the "Details about your goal" boxes, write down three things you are not presently doing but would like to. Then say how well you think you can currently achieve them by selecting the appropriate number between 0 and 6 (0 means "Not at all" and 6 means "Anytime"). It should be something that you are not able to do at the moment but that you think you can realistically achieve over the coming months. If you are struggling to identify any aims for your treatment, your councillor can help.',
	slug: 'thinking-ahead'
}];

let _checkIfModalExist = () => {
  let modalCount = Modals.find().count();
  return modalCount > 0;
};

let _createModals = (modals) => {
  for (let i = 0; i < modals.length; i++) {
    Modals.insert({
      title: modals[i].title,
      text: modals[i].text,
      slug: modals[i].slug
    });
  }
};

let generateModals = () => {
  if (!_checkIfModalExist()) {
    _createModals(modals);
  }
};

Modules.server.generateModals = generateModals;

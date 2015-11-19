let modals = [
  {
    title: 'How Is Your Depression and Low Mood Affecting You?',
    text: 'This exercise is about thinking about how your depression or low mood is affecting you. In each of the three boxes write in the type of things you have stopped doing or are doing differently, some of the unhelpful thoughts that commonly go through your head and the way you feel physically. Don’t worry if this seems difficult.',
    userHasSeen: false
  },
  {
    title: 'Other modal',
    text: 'Other modal text.',
    userHasSeen: false
  }
];

let _checkIfModalExist = () => {
  let modalCount = Modals.find().count();
  return modalCount > 0;
};

let _createModals = ( modals ) => {
  for ( let i = 0; i < modals.length; i++ ) {
      Modals.insert({
        title: modals[i].title,
        text: modals[i].text,
        userHasSeen: modals[i].userHasSeen
      });
  }
};

let generateModals = () => {
  if ( !_checkIfModalExist() ) {
    _createModals( modals );
  }
};

Modules.server.generateModals = generateModals;

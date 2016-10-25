export default function addDailyEntry(entry) {
  return () => {
    Meteor.call('dailyEntry.insert', entry);
  };
};

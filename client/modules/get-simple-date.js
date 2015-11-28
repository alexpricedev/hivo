let getSimpleDate = (self) => {
	let date = null;

	if (self.day.get() && self.month.get() && self.year.get()) {
		date = `${self.day.get()}/${self.month.get()}/${self.year.get()}`;
	} else {
		let d = new Date();
		date = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;
	}

	return date;
}

Modules.client.getSimpleDate = getSimpleDate;

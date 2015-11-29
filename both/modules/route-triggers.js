let checkValidDate = (context, redirect) => {
	let p = context.params;
	if (!moment(`${p.day}-${p.month}-${p.year}`, 'DD-MM-YYYY').isValid()) {
		redirect('not-found');
	}
}

let checkValidTime = (context, redirect) => {
	let p = context.params;
	let options = ['morning', 'afternoon', 'evening'];
	if (!lodash.includes(options, p.time)) { redirect('not-found'); }
}

Modules.both.checkValidDate = checkValidDate;
Modules.both.checkValidTime = checkValidTime;

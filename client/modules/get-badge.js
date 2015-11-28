let getBadge = (data) => {
	let num = 0,
			cls = '';

	if (data) {
		num = data ? data.length : 0;

		switch(num) {
			case 0:
				cls = 'alert-danger';
				break;
			case 1:
				cls = 'alert-info';
				break;
			default:
				cls = 'alert-success';
		}
	}

	return Spacebars.SafeString(
		`<span class="badge pull-right ${cls}">${num} / 2</span>`
	);
}

Modules.client.getBadge = getBadge;

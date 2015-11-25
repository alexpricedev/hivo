let _createGoal = (i) => {
	let goal = `<div class="col-md-6 goal">
			<div class="well well-sm clearfix">
					<div class="form-group">
							<label for="date">Today's date</label>
							<div class="input-group">
									<span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
									<input class="form-control datepicker" id="date${i}" type="text" placeholder="Please select today's date"/>
							</div>
					</div>

					<div class="form-group">
							<label for="goal">Details about your goal</label>
							<textarea class="form-control" id="goal${i}" rows="4" placeholder="Write some details about the goal you want to achive and what you want to get out of the treatment."
												value="{{exercise.exerciseData.goal}}"></textarea>
							<span class="help-block">Write in here the specific goals and achievements you wish to attain from these program.</span>
					</div>

					<div class="form-group">
							<label>I can do this now</label><br>
							<select class="form-control" id="score${i}">
									<option value="0">0 - Often</option>
									<option value="1">1</option>
									<option value="2">2 - Occasionally</option>
									<option value="3">3</option>
									<option value="4">4 - Often</option>
									<option value="5">5</option>
									<option value="6">6 - Anytime</option>
							</select>
							<span class="help-block">Pick an option that represents how often you can achive this goal</span>
					</div>
			</div>
	</div>`

	return goal;
};

let addGoal = () => {
	let i = Session.get('goal-number');
	$('.button-row').before(_createGoal(i));

	Modules.client.initDatepicker();

	Session.set('goal-number', i+1);
};

Modules.client.addGoal = addGoal;

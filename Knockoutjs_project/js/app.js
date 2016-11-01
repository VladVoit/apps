$(function(){
	var tasks = [
		{'id': 1, 'tname': 'To do 1', 'ttime': 10},
		{'id': 2, 'tname': 'To do 2', 'ttime': 18},
		{'id': 3, 'tname': 'To do 3', 'ttime': 24}
	];


function ViewModel() {
	var self = this;
	self.taskList = ko.observableArray(tasks);


	self.totalTime = ko.computed(function(){
		var total = 0;
		$.each(self.taskList(), function(id, value){
			total += parseFloat(value.ttime);
		});
		return total + ' hours';
	});

	//add item
	var keyCode = null;
	$('#addTask').keypress(function(e) {
		keyCode = (e.keyCode ? e.keyCode : e.which);
		var time = 0;
		if(keyCode == 13){
			time = prompt('Spent time');
			var taskName = $('#addTask').val();
			if (taskName.length && time.length) {
				self.taskList.push({'tname': taskName, 'ttime': time});
			};
			$('#addTask').val('');
		}
	});

	self.deleteItem = function(){
		self.taskList.remove(this);
	};

	

};

ko.applyBindings(new ViewModel());




});
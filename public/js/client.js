$(document).ready(function() {
	renderMainPage();
	bindListeners();
});

function bindListeners() {
	$('#btn-home').on('click', function() {
		renderMainPage();
	});
	$('#btn-history').on('click', function() {
		$.ajax({
			url: 'users/1/items',
			type: 'GET'
		}).done(function(response) {
			var items = $.parseJSON(response);
			var ul = document.createElement('ul');
			items.forEach(function(item) {
				var li = document.createElement('li');
				li.innerHTML = '<span>' + item.name + '</span>: <span>' + item.cost + '</span>';
				ul.appendChild(li);
			})
			$('#main-container').html(ul);
		})
	});
	$('#btn-statistics').on('click', function() {
		$('#main-container').html('3');
	});
	$('#btn-settings').on('click', function() {
		$('#main-container').html('4');
	});
	$('#form-submit').on('submit', function() {
		var name = $('#name').val();
		var cost = $('#cost').val();
		var description = $('#description').val();
		$.ajax({
			url: 'users/1/items/create',
			type: 'POST',
			dataType: 'json',
			async: 'true',
			data: {
				name: name,
				cost: cost,
				description: description
			},
			success: function() {
				$('#name').val("");
				$('#cost').val("");
				$('#description').val("");
			}
		});
		return false;
	});
}

function renderMainPage() {
	$('#main-container').html('<div id="home-container"><form id="form-submit">' +
		'<label for="name" class="ui-hidden-accessible">Name:</label>' +
		'<input type="text" name="name" id="name" value="" placeholder="Name"/>' +
		'<label for="cost" class="ui-hidden-accessible">Cost:</label>' +
		'<input type="text" name="cost" id="cost" value="" placeholder="Cost"/>' +
		'<label for="textarea-a" class="ui-hidden-accessible">Description:</label>' +
		'<textarea name="textarea" id="description" placeholder="Description">' +
		'</textarea>' +
		'<button id="btn-submit">Submit</button>' +
	'</form></div>').trigger('create');
}

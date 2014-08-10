$(document).ready(function() {
	bindListeners();
	renderMainPage();
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
}

function renderMainPage() {
	$('#main-container').html('<div id="home-container">' +
			'<div id="home-container_page" class="ui-field-contain ui-hide-label">' +
				'<input id="home-input" name="home-input" type="number" class="home-input"></input>' +
				'<a href="#popupDetails" id="home-input_button" data-rel="popup">Submit</a>' +
			'</div>' +
		'</div>');
}

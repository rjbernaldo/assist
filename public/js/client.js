$(document).ready(function() {
	renderMainPage();
	bindListeners();
	bindFormListener();
});

function bindListeners() {
	var week = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Thursday',
	'Friday',
	'Saturday'
	]
	$('#nav-btn').on('click', function(e){
		e.preventDefault();
		$('#nav-btn').removeClass('ui-btn-active');
	})
	$('#btn-home').on('click', function(e) {
		e.preventDefault();
		renderMainPage();
		bindFormListener();
	});
	$('#btn-history').on('click', function(e) {
		e.preventDefault();
		$.ajax({
			url: 'users/1/items',
			type: 'GET'
		}).done(function(response) {
			var items = $.parseJSON(response);
			var ul = $('<ul id="history-list" data-autodividers="true" data-role="listview" data-filter="true"></ul>');
			items.forEach(function(item) {
				var today = new Date();
				var itemDate = new Date(item.createdAt);
				if (itemDate.getDay() === today.getDay() && itemDate.getMonth() === today.getMonth() && itemDate.getYear() === today.getYear()) {
					day = "Today"
				} else {
					day = week[itemDate.getDay()];
				}
				var li = $('<li day=' + day + '>' +
											'<h1>$' + item.cost + '</h1>' +
											'<p>' + item.name + '</p>' +
											'<p>' + item.description + '</p>' +
											'<p>' + timeSince(Date.parse(item.createdAt)) + ' ago.</p>' +
									 '</li>');
				ul.append(li);
			})
			$('#main-container').html(ul).trigger('create');
			$('#history-list').listview({
				autodividers: true,
				autodividersSelector: function(li) {
					var out = li.attr('day');
					return out;
				}
			}).listview('refresh');
		})
	});
	$('#btn-statistics').on('click', function(e) {
		e.preventDefault();
		$('#main-container').html('3');
	});
	$('#btn-settings').on('click', function(e) {
		e.preventDefault();
		$('#main-container').html('4');
	});
}

function bindFormListener() {
	$('#btn-submit').on('click', function(e) {
		e.preventDefault();
		var name = $('#name').val();
		var cost = $('#cost').val();
		var description = $('#description').val();
		if (name !== "" && cost !== "" && description !== "") {
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
					$('#popup-confirm').html('<h3>New item created!</h3>' +
						'<h4>' + name + '</h4>' +
						'<p>' + cost + '</p>' +
						'<p>' + description + '</p>');
					$('#popup-confirm').popup("open");
					setTimeout(function() {
						$('#popup-confirm').popup("close");
						$('#name').val("");
						$('#cost').val("");
						$('#description').val("");
					}, 1500);
				}
			});
		} else {
			$('#popup-confirm').html('<h3>Please fill out all fields</h3>');
			$('#popup-confirm').popup("open");
			setTimeout(function() {
				$('#popup-confirm').popup("close");
			}, 1500);
		}
		return false;
	});
}

function renderMainPage() {
	$('#main-container').html('<div id="home-container"><form id="form-submit">' +
		'<label for="name" class="ui-hidden-accessible">Name</label>' +
		'<input type="text" name="name" id="name" value="" placeholder="Name"/>' +
		'<label for="cost" class="ui-hidden-accessible">Cost</label>' +
		'<input type="text" name="cost" id="cost" value="" placeholder="Cost"/>' +
		'<label for="description" class="ui-hidden-accessible">Description</label>' +
		'<input type="text" name="description" id="description" value="" placeholder="Description"/>' +
		'<button id="btn-submit">Submit</button>' +
		'</form></div>' +
		'<div id="popup-confirm" data-role="popup" data-transition="fade" data-position-to="#home-container" data-shadow="false" data-overlay-theme="a" data-theme="none">' +
		'</div>').trigger('create');
}
function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}

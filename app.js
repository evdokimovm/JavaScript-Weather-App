$(document).ready(function() {

	var openWeatherMap = 'http://api.openweathermap.org/data/2.5/weather';
	var APPID = 'APPID';

	if (window.navigator && window.navigator.geolocation) {

		window.navigator.geolocation.getCurrentPosition(function(position) {

			var myLatitude = position.coords.latitude;
			var myLongitude = position.coords.longitude;

			$('.geo').html('Latitude : ' + myLatitude + '</br>' + ' Longitude : ' + myLongitude);

			var d = new Date();

			var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
			var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

			$('#day').text(weekday[d.getDay()]);
			$('#date').text(month[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear());
			$('#time').html('Time: ' + (d.getHours() > 12 ? (d.getHours() - 12) : d.getHours()).toString() + ":" + ((d.getMinutes() < 10 ? '0' : '').toString() + d.getMinutes().toString()) + (d.getHours() < 12 ? ' AM' : ' PM').toString());

			$.getJSON(openWeatherMap, {

				lat: myLatitude,
				lon: myLongitude,
				APPID: APPID

			}).done(function(weather) {

				$('.city').html(weather.name);

				$('#temperature').html(Math.round(weather.main.temp - 273.15));
				$('#windSpeed').html(weather.wind.speed + ' meter/sec');
				$('#humidity').html(weather.main.humidity + ' %');
				$('#pressure').html(Math.round(weather.main.pressure / 1.33317) + ' mm Hg');

				$('#weather-status').html(weather.weather[0].main + ' / ' + weather.weather[0].description);

				var icon = '';
				var background = '';
				if (weather.weather[0].main == 'Thunderstorm') {
					icon = 'img/icons/thunderstorm-clouds.svg';
					background = 'img/backgrounds/thunderstorm.jpg';
				} else if (weather.weather[0].main == 'Drizzle') {
					icon = 'img/icons/drizzle.svg';
					background = 'img/backgrounds/rain.jpg';
				} else if (weather.weather[0].main == 'Rain') {
					icon = 'img/icons/cloud-with-drops-of-water.svg';
					background = 'img/backgrounds/rain.jpg';
				} else if (weather.weather[0].main == 'Snow') {
					icon = 'img/icons/snowflake.svg';
					background = 'img/backgrounds/snow.jpg';
				} else if (weather.weather[0].main == 'Atmosphere') {
					icon = 'img/icons/mist.svg';
					background = 'img/backgrounds/mist.jpg';
				} else if (weather.weather[0].main == 'Clear') {
					icon = 'img/icons/sun.svg';
					background = 'img/backgrounds/sun.jpg';
				} else if (weather.weather[0].main == 'Clouds') {
					icon = 'img/icons/fluffy-cloud-silhouette.svg';
					background = 'img/backgrounds/clouds.jpg';
				} else if (weather.weather[0].main == 'Extreme') {
					icon = 'img/icons/tornado.svg';
					background = 'img/backgrounds/storm.jpg';
				}

				$('.weather-icon').attr('src', icon);

				$('body').css({ 'background-image': 'url(' + background + ')' });

				var sunriseDate = new Date(weather.sys.sunrise * 1000);
				$('#sunriseTime').html((sunriseDate.getHours() > 12 ? (sunriseDate.getHours() - 12) : sunriseDate.getHours()).toString() + ":" + ((sunriseDate.getMinutes() < 10 ? '0' : '').toString() + sunriseDate.getMinutes().toString()) + (sunriseDate.getHours() < 12 ? ' AM' : ' PM').toString());

				var sunsetDate = new Date(weather.sys.sunset * 1000);
				$('#sunsetTime').html((sunsetDate.getHours() > 12 ? (sunsetDate.getHours() - 12) : sunsetDate.getHours()).toString() + ":" + ((sunsetDate.getMinutes() < 10 ? '0' : '').toString() + sunsetDate.getMinutes().toString()) + (sunsetDate.getHours() < 12 ? ' AM' : ' PM').toString());

			})

		})
	}

	var html = '<div class="wrapper">' + 
					'<div class="weather-container">' +
						'<div class="top-left">' +
							'<h1 class="city" id="city"></h1>' +
							'<h2 id="day"></h2>' +
							'<h3 id="date"></h3>' +
							'<h3 id="time"></h3>' +
							'<h5 class="geo"></h5>' +
						'</div>' +
						'<div class="top-right">' +
							'<h1 id="weather-status"></h1>' +
							'<img class="weather-icon" src="">' +
						'</div>' +
						'<div class="bottom-left">' +
							'<h1 id="temperature"></h1>' +
							'<h2 id="celsius">&degC</h2>' +
						'</div>' +
						'<div class="bottom-right">' +
							'<div class="details-key">' +
								'<p>Wind Speed</p>' +
								'<p>Humidity</p>' +
								'<p>Pressure</p>' +
								'<p>Sunrise Time</p>' +
								'<p>Sunset Time</p>' +
							'</div>' +
							'<div class="details-values">' +
								'<p id="windSpeed"></p>' +
								'<p id="humidity"></p>' +
								'<p id="pressure"></p>' +
								'<p id="sunriseTime"></p>' +
								'<p id="sunsetTime"></p>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>';

	$('body').append(html);

});

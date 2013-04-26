require.config({
	paths: {
		'jquery': [
			'http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min',
			'../vendor/jquery-1.9.1.min.js'
			]
	},
	map: {
		'*': {
			slider: 'slider2'
		}
	}
});
require(['jquery', 'slider'], function(jquery, slider) {
	console.log($);
	console.log('main ready');
	console.log(slider);

	setTimeout(function() {
		require(['testmodule'], function(testmodule) {
			console.log('testmodule loaded' + testmodule);
		});
	}, 1000);


});

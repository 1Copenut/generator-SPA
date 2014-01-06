require.config({
  paths: {
    'jquery': '../../app/bower_components/jquery/jquery',
		'underscore': '../../app/bower_components/underscore/underscore',
		'squire': '../../app/bower_components/squire/src/Squire',
		'chai': '../../app/bower_components/chai/chai'
  },

	shim: {
		underscore: {
			exports: '_'
		}
	}
});

require(['chai'], function (chai) {
	chai.should();
	window.expect = chai.expect;
	mocha.setup('bdd');

	require(['specs/test'], function(test) {
		mocha.run();
		console.log(test);
	});
});

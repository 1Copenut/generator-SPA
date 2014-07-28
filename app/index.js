'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var SpaGenerator = module.exports = function SpaGenerator(args, options, config) {
	yeoman.generators.Base.apply(this, arguments);

	this.on('end', function () {
		this.installDependencies({ skipInstall: options['skip-install'] });
	});

	this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(SpaGenerator, yeoman.generators.Base);

SpaGenerator.prototype.askFor = function askFor() {
	var cb = this.async();

	// Have Yeoman greet the user.
	console.log(this.yeoman);

	var prompts = [{
		name: 'spaName',
		message: 'What would you like to call this single-page app?'
	}];

	this.prompt(prompts, function (props) {
		this.spaName = props.spaName;

		cb();
	}.bind(this));
};

// Copy the package.json file to grab Node modules
SpaGenerator.prototype.packageJSON = function packageJSON() {
	this.template('_package.json', 'package.json');
};

// Grab Bower dependencies
SpaGenerator.prototype.bower = function bower() {
	this.copy('bowerrc', '.bowerrc');
	this.copy('_bower.json', 'bower.json');
}

// Drop in the Gruntfile.js
SpaGenerator.prototype.gruntfile = function gruntfile() {
	this.template('Gruntfile.js');
}

// Copy my editor config and jshint parameters
SpaGenerator.prototype.projectfiles = function projectfiles() {
	this.copy('editorconfig', '.editorconfig');
	this.copy('jshintrc', '.jshintrc');
};

// Create the reset, main and mocha stylesheets
SpaGenerator.prototype.styles = function styles() {
	this.copy('main.scss', 'app/styles/scss/main.scss');
	this.copy('_reset.scss', 'app/styles/scss/_reset.scss');
	this.copy('main.css', 'app/styles/css/main.css');
	this.copy('mocha.css', 'test/css/mocha.css');
};

// Include the HTML5 Boilerplate files
SpaGenerator.prototype.h5bp = function h5bp() {
	this.copy('favicon.ico', 'app/favicon.ico');
	this.copy('apple-touch-icon.png', 'app/apple-touch-icon.png');
	this.copy('apple-touch-icon-precomposed.png', 'app/apple-touch-icon-precomposed.png');
	this.copy('apple-touch-icon-57x57-precomposed.png', 'app/apple-touch-icon-57x57-precomposed.png');
	this.copy('apple-touch-icon-72x72-precomposed.png', 'app/apple-touch-icon-72x72-precomposed.png');
	this.copy('apple-touch-icon-114x114-precomposed.png', 'app/apple-touch-icon-114x114-precomposed.png');
	this.copy('apple-touch-icon-144x144-precomposed.png', 'app/apple-touch-icon-144x144-precomposed.png');
	this.copy('404.html', 'app/404.html');
	this.copy('robots.txt', 'app/robots.txt');
	this.copy('htaccess', 'app/.htaccess');
};

// Create the baseline index file
SpaGenerator.prototype.createIndex = function createIndex() {
	this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));
	this.indexFile = this.engine(this.indexFile, this);
};

// Create the testing index file
SpaGenerator.prototype.createTestIndex = function createTextIndex() {
	this.indexTestFile = this.readFileAsString(path.join(this.sourceRoot(), 'testIndex.html'));
	this.indexTestFile = this.engine(this.indexTestFile, this);
};

// Set up the Require.js structure
SpaGenerator.prototype.requirejs = function requirejs() {
	// Wire the index file for Require.js
	this.indexFile = this.appendScripts(this.indexFile, 'scripts/config.js', ['bower_components/requirejs/require.js'], {
		'data-main': 'scripts/config'
	});
	
	// Add a basic AMD module for app
	this.write('app/scripts/app.js', [
		'/*global define */',
		'define([], function () {',
		' \'use strict\';\n',
		' return \'\\\'Allo \\\'Allo!\';',
		'});'
	].join('\n'));

	// Add the config.js file
	this.template('require_config.js', 'app/scripts/config.js');

	// Copy the main.js file
	this.copy('main.js', 'app/scripts/main.js');
};

// Set up the testing Require.js structure
SpaGenerator.prototype.testRequirejs = function testRequirejs() {
	// Wire the testIndex file for Require.js
	this.indexTestFile = this.appendScripts(this.indexTestFile, 'test/scripts/config.js', ['../bower_components/requirejs/require.js'], {
		'data-main': '../scripts/config'
	});

	// Add a basic AMD module for testing
	this.write('test/scripts/tests/test.js', [
		'/*global define */',
		'define([], function () {',
		' \'use strict\';\n',
		' return \'\\\'Allo \\\'Allo!\';',
		'});'
	].join('\n'));

	// Add the test main.js file
	this.template('require_testConfig.js', 'test/scripts/config.js');

	// Copy the list of tests
	this.copy('list_of_tests.js', 'test/scripts/list_of_tests.js');
}; 

// Create the app structure
SpaGenerator.prototype.app = function app() {
	// Create the core app directory
	this.mkdir('app');
	this.mkdir('app/templates');
	this.mkdir('app/styles');
	this.mkdir('app/styles/css');
	this.mkdir('app/styles/scss');
	this.mkdir('app/imgs');
	this.mkdir('app/scripts');

	// Add the index file
	this.write('app/index.html', this.indexFile);
	
	// Create the test directory
	this.mkdir('test');
	this.mkdir('test/css');
	this.mkdir('test/scripts');
	this.mkdir('test/fixtures');
	this.mkdir('test/scripts/tests');

	// Add the test index file
	this.write('test/index.html', this.indexTestFile);
	
	// Create the server directory and copy the server.js file
	this.mkdir('server');
	this.copy('server.js', 'server/server.js')
};

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

// Create the reset and main stylesheets
SpaGenerator.prototype.styles = function styles() {
	this.copy('main.scss', 'app/styles/sass/main.scss');
	this.copy('_reset.scss', 'app/styles/sass/_reset.scss');
	this.copy('main.css', 'app/styles/css/main.css');
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

// Create the index file baseline index file
SpaGenerator.prototype.createIndex = function createIndex() {
	this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));
	this.indexFile = this.engine(this.indexFile, this);
};

// Set up the Require.js structure
SpaGenerator.prototype.requirejs = function requirejs() {
	// Wire the index file for Require.js
	this.indexFile = this.appendScripts(this.indexFile, 'scripts/main.js', ['bower_components/requirejs/require.js'], {
		'data-main': 'scripts/main'
	});
	
	// Add a basic AMD module for testing
	this.write('app/scripts/app.js', [
		'/*global define */',
		'define([], function () {',
		' \'use strict\';\n',
		' return \'\\\'Allo \\\'Allo!\';',
		'});'
	].join('\n'));

	// Add the main.js file
	this.template('require_main.js', 'app/scripts/main.js');
};

// Create the app structure
SpaGenerator.prototype.app = function app() {
	// Create the core app directory
	this.mkdir('app');
	this.mkdir('app/templates');
	this.mkdir('app/styles');
	this.mkdir('app/styles/css');
	this.mkdir('app/styles/sass');
	this.mkdir('app/imgs');
	this.mkdir('app/scripts');

	// Add the index file
	this.write('app/index.html', this.indexFile);
	
	// Create the test directory
	this.mkdir('test');
	
	// Create the server directory and copy the server.js file
	this.mkdir('server');
	this.copy('server.js', 'server/server.js')
};
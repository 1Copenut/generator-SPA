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
    message: 'Would you like to call this single-page app?'
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

SpaGenerator.prototype.app = function app() {
  // Create the core app directory
	this.mkdir('app');
  this.mkdir('app/templates');
  this.mkdir('app/css');
  this.mkdir('app/sass');
  this.mkdir('app/imgs');
  this.mkdir('app/scripts');

	// Create the test directory
	this.mkdir('test');

  // this.copy('_package.json', 'package.json');
  // this.copy('_bower.json', 'bower.json');
};

SpaGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};

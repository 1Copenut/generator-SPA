module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		
		jshint: {
			files: ["public/js/*.js", "!public/js/config.js"],
			options: {
				globals: {
					jQuery: true,
					console: true,
					module: true,
					document: true,
					define: true
				}
			}
		},
		
		compass: {
			dev: {
				options: {
					sassDir: "app/styles/sass",
					cssDir: "app/styles/css"
				}
			}
		},
		
		watch: {
	    options: {
	      livereload: true
	    },
	    css: {
	      files: ['app/styles/sass/*.scss'],
	      tasks: ['compass']
	    }
	  }
	});

	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-compass");
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	// grunt.registerTask("default", ["compass"]);
};
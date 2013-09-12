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
		}
	});

	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-compass");
	
	// grunt.registerTask("default", ["compass"]);
};
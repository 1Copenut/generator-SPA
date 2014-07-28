module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		express: {
			options: {
			  // Override defaults here
			},
			dev: {
			  options: {
			    script: 'server/server.js'
			  }
			}
		},
		
		jshint: {
			files: ['app/scripts/**/*.js', '!app/scripts/config.js'],
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
		
		sass: {
			dev: {
				options: {
					sourcemap: true
				},
				files: {
					'app/styles/css/main.css': 'app/styles/scss/main.scss'
				}
			}
		},
		
		scsslint: {
			allFiles: [
				'app/styles/scss/**/*.scss'
			],

			options: {
				colorizeOutput: true
			}
		},

		watch: {
	    options: {
	      livereload: true
	    },
	    css: {
	      files: ['app/styles/scss/**/*.scss'],
	      tasks: ['scsslint', 'sass']
	    },
			html: {
				files: ['app/**/*.html', 'test/index.html']
			},
			scripts: {
				files: ['app/scripts/**/*.js', '!app/scripts/config.js', '/test/scripts/tests/*.js'],
				tasks: ['jshint'],
				options: {
					spawn: false
				}
			}
	  },
	
		open : {
			dev : {
			  path: 'http://127.0.0.1:3000/',
			  app: 'Google Chrome'
			}
		}
	});

	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-open');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	grunt.registerTask('server', ['express:dev', 'open:dev', 'watch']);
};

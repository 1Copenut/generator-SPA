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
					'app/styles/css/main.css': 'app/styles/sass/main.scss'
				}
			}
		},
		
		watch: {
	    options: {
	      livereload: true
	    },
	    css: {
	      files: ['app/styles/sass/**/*.scss'],
	      tasks: ['sass']
	    },
			html: {
				files: ['app/**/*.html']
			},
			scripts: {
				files: ['app/scripts/**/*.js', '!app/scripts/config.js'],
				tasks: ['jshint'],
				options: {
					spawn: false
				}
			}
	  },
	
		open : {
			dev : {
			  path: 'http://127.0.0.1:3000/',
			  app: 'Google Chrome Canary'
			}
		},

		mocha: {
			browser: ['test/**/*.html'],
			options: {
				reporter: 'Spec',
				run: true
			}
		}
	});

	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-open');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-mocha');
	
	grunt.registerTask('server', ['express:dev', 'open:dev', 'watch']);
	grunt.registerTask('test', ['mocha']);
};

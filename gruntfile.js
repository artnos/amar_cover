module.exports = function(grunt){
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');


	grunt.initConfig({
		uglify: {
			my_target:{
				files:{
					'_/js/script.js' : ['_/components/js/*.js']
				}//files
			}//my target
		}, //uglify
		compass: {
			dev: {
				options: {
					config: 'config.rb'
				} //option
			}//dev
		}, //compass
		watch: {
			options: { livereload: true },
			sass: {
				files: ['_/components/sass/*.scss'],
				tasks: ['compass:dev']
			},
			scripts: {
				files: ['_/components/js/*.js'],
				tasks: ['uglify']
			},//scripts
			html: {
				files: ['*.html', '*.php']
			}

		} //watch
	})//initConfig
	grunt.registerTask('default', 'watch');
	
}//exports
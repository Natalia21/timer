module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        qunit: {
            all: ['lib/tictactoe/test/*.html']
        },
        cssmin: {
            target: {
                files: {
                    'lib/tictactoe/build/css/tictactoe.min.css': 'lib/tictactoe/src/css/tictactoe.css'
                }
            }
        },
        uglify: {
            build: {
                files: {
                    'lib/tictactoe/build/js/tictactoe.min.js': [
                        'lib/tictactoe/src/tictactoe.js',
                        'lib/tictactoe/src/modules/TicTacToe.js',
                        'lib/tictactoe/src/controllers/TimerController.js'
                    ]
                }
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: false, filter: 'isFile', 
                        src: ['bower_components/angular/angular.min.js'],
                        dest: 'lib/tictactoe/build/js/angular.min.js'
                    },
                    {
                        expand: false, filter: 'isFile', 
                        src: ['bower_components/bootstrap/dist/css/bootstrap.min.css'],
                        dest: 'lib/tictactoe/build/css/bootstrap.min.css'
                    },
                    {
                        expand: false, filter: 'isFile', 
                        src: ['bower_components/font-awesome/css/font-awesome.min.css'],
                        dest: 'lib/tictactoe/build/css/font-awesome.min.css'
                    },
                    {
                        expand: false, filter: 'isFile', 
                        src: ['bower_components/jquery-svg/jquery.svg.min.js'],
                        dest: 'lib/tictactoe/build/js/jquery.svg.min.js'
                    },
                    {
                        expand: false, filter: 'isFile', 
                        src: ['bower_components/jquery-svg/jquery.svg.css'],
                        dest: 'lib/tictactoe/build/css/jquery.svg.css'
                    },
                    {
                        expand: false, filter: 'isFile', 
                        src: ['bower_components/jquery/dist/jquery.min.js'],
                        dest: 'lib/tictactoe/build/js/jquery.min.js'
                    },
                    {
                        expand: true, filter: 'isFile', 
                        cwd: 'lib/tictactoe/src/views/',
                        src: ['**/*.html'],
                        dest: 'lib/tictactoe/build'
                    },
                    {
                        expand: true, filter: 'isFile', 
                        cwd: 'lib/tictactoe/src/fonts/',
                        src: ['*'],
                        dest: 'lib/tictactoe/build/fonts/'
                    },
                    {
                        expand: true, filter: 'isFile', 
                        cwd: 'bower_components/font-awesome/fonts/',
                        src: ['*'],
                        dest: 'lib/tictactoe/build/fonts/'
                    }
                ]
            }
        },
        sass: {
            dist: {
                files: {
                    'lib/tictactoe/src/css/tictactoe.css': 'lib/tictactoe/src/scss/tictactoe.scss'
                } 
            }
        },
        clean: ["lib/tictactoe/build"]
    });
    
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    
    // Default task(s).
    grunt.registerTask('default', ['clean', 'sass', 'cssmin', 'uglify', 'copy']);
}
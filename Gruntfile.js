module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['app/**/*.js'],
                dest: 'dist/concat.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! app <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            build: {
                src: 'dist/concat.js',
                dest: 'dist/app.min.js'
            }
        },
        qunit: {
            files: ['test/**/*.html']
        },
        jshint: {
            files: ['app/**/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint', 'qunit']
        },
        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            '.tmp',
                            'dist/*',
                            '!dist/.git*'
                        ]
                    }
                ]
            },
            server: '.tmp',
            concat: 'dist/concat.js'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('test', ['jshint', 'qunit']);

//    grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
    grunt.registerTask('default', ['clean:dist', 'jshint', 'concat', 'uglify', 'clean:concat']);

    grunt.registerTask('build', ['clean:dist', 'jshint', 'concat', 'uglify', 'clean:concat']);

};
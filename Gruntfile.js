module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-todo');

    grunt.initConfig({

        env: {
            development:    { NODE_ENV: 'development' },
            test:           { NODE_ENV: 'test' },
            prod:           { NODE_ENV: 'prod' },
        },


        express: {
            options:    { script: './server.js' },
            dev:        { node_env: 'development' },
            test:       { node_env: 'test' },
            prod:       { node_env: 'prod' },
        },


        watch: {
            scripts: {
                files: [ '**/*.js' ],
                tasks: [ 'jshint' ],
                options: { spawn: false },
            },
        },


        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    require: 'coverage/blanket',
                },
                src: [ 'test/**/*.js' ],
            },
            coverage: {
                options: {
                    reporter: 'html-cov',
                    quiet: true,
                    captureFile: 'coverage/coverage.html',
                },
                src: ['test/**/*.js'],
            },
        },


        jshint: {
            options: {
                reporter: require('jshint-stylish'),
            },
            all: [
                'Gruntfile.js',
                'src/**/*.js',
                'test/**/*.js',
                'config/**/*.js',
                'coverage/**/*.js',
                'server.js',
            ],
        },


        todo: {
            options: {
                marks: [
                    {
                        name: 'FIX',
                        pattern: /FIXME/,
                        color: 'red'
                    },
                    {
                        name: 'TODO',
                        pattern: /TODO/,
                        color: 'yellow'
                    },
                    {
                        name: 'NOTE',
                        pattern: /NOTE/,
                        color: 'blue'
                    },
                    {
                        name: 'STUB',
                        pattern: /STUB/,
                        color: 'red',
                    },
                ],
            },
            src: [
                'src/**/*.js',
                'test/**/*.js',
                'config/**/*.js',
                'coverage/**/*.js',
                'server.js',
            ],
        },
    });

    grunt.registerTask('serve', [ 'express:dev', 'watch' ]);
    grunt.registerTask('test', [ 'env:test', 'express:dev', 'mochaTest' ]);
    grunt.registerTask('lint', 'jshint');
    grunt.registerTask('default', [ 'lint', 'todo', 'test' ]);
};

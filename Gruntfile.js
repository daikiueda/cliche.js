'use strict';

var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        buildTarget: grunt.file.readJSON('build.json'),
        
        watch: {
            options: {
                nospawn: true,
                livereload: LIVERELOAD_PORT
            },
            concat: {
                files: [
                    'src/**/*.js'
                ],
                tasks: [
                    'concat'
                ]
            },
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    'exsamples/index.html'
                ]
            }
        },
        connect: {
            options: {
                port: 9000,
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'exsamples')
                        ];
                    }
                }
            },
            dist: {
                options: {
                    base: 'exsamples'
                }
            }
        },
        open: {
            dev: {
                path: 'http://localhost:<%= connect.options.port %>'
            },
            dist: {
                path: 'exsamples/index.html'
            }
        },
        
        concat: {
            options: {
                process: function( src, filepath ){
                    return [
                        '// ' + filepath,
                        src,
                    ].join( '\n' );
                }
            },
            build: {
                files: { '.tmp/js/cliche.js': '<%= buildTarget.src %>' }
            }
        },
        uglify: {
            options: {
                beautify: false,
                compress: {
                    global_defs: {
                        DEBUG: false
                    },
                    dead_code: true
                }
            },
            dist: {
                files: { 'dist/cliche.js': '.tmp/js/cliche.js' }
            }
        },
        
        copy: {
            exsamples: {
                files: { 'exsamples/js/cliche.js': 'dist/cliche.js' }
            }
        },
        
        clean: {
            options: {
                force: true
            },
            dist: [
                '.tmp',
                'dist'
            ],
            dev: [
                'exsamples/js'
            ]
        },
    });

    grunt.registerTask('dev', function (target) {
        grunt.task.run( [
            'clean',
            'concat',
            'connect:livereload',
            'open:dev',
            'watch'
        ] );
    });

    grunt.registerTask('build', [
        'clean:dist',
        'concat',
        'uglify',
        'copy:exsamples',
        'open:dist'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);
};

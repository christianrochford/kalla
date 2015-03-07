'use strict';

var
LIVERELOAD_PORT = 35729,
  lrSnippet = require('connect-livereload')({
    port: LIVERELOAD_PORT
  }),
  mountFolder = function(connect, dir) {
    return connect.static(require('path').resolve(dir));
  };

module.exports = function(grunt) {

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    compass: {
      dist: {
        options: {
          config: 'assets/dist/config.rb',
          sassDir: 'assets/dist/sass',
          cssDir: 'assets/dist/stylesheets',
          environment: 'production',
        }
      }
    },

    autoprefixer: {
      dist: {
        files: {
          'assets/dist/css/kalla.css': 'assets/dist/stylesheets/*.css'
        }
      }
    },

    jshint: {
      files: ['assets/js/app/*.js'],
      options: {
        force: true,
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['assets/js/jquery/jquery.js',
          'assets/js/plugins/*.js',
          'assets/js/app/*.js'
        ],
        dest: 'assets/dist/js/kalla.js'
      }
    },

    uglify: {
      options: {
        mangle: false
      },
      dist: {
        files: {
          'assets/dist/js/kalla.min.js': ['assets/dist/js/kalla.js'],
          'assets/js/modernizr/modernizr.min.js': ['assets/js/modernizr/modernizr.js']
        }
      }
    },

    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'assets/img',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'dist/img'
        }]
      }
    },

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            'assets/js/jquery/*',
            'assets/js/modernizr/*',
            '!assets/js/jquery/jquery.js',
            '!assets/js/modernizr/modernizr.min.js'
          ]
        }]
      },
      server: '.tmp'
    },

    connect: {
      options: {
        port: 9000,
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          middleware: function(connect) {
            return [
              lrSnippet,
              mountFolder(connect, './')
            ];
          }
        }
      }
    },

    open: {
      all: {
        // Gets the port from the connect configuration
        path: 'http://localhost:9000/assets/dist'
      }
    },

    watch: {
      options: {
        livereload: true
      },
      css: {
        files: ['assets/dist/sass/*.scss', 'index.html'],
        tasks: ['compass']
      },
      styles: {
        files: ['assets/dist/stylesheets/*.css'],
        tasks: ['autoprefixer']
      },
      js: {
        files: 'assets/js/app/*.js',
        tasks: ['jshint', 'concat', 'uglify']
      },
      livereload: {
        files: [
          '*.html',
          'assets/dist/stylesheets/*.css',
          'assets/dist/js/*.min.js',
          'assets/dist/img/*'
        ]
      }
    }

  });

  grunt.registerTask('default', ['imagemin', 'jshint', 'concat', 'uglify', 'compass:dist', 'autoprefixer', 'clean']);

  grunt.registerTask('server', [
    'clean:server',
    'connect:livereload',
    'open',
    'watch'
  ]);

};

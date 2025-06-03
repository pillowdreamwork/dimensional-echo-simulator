module.exports = function(grunt) {
  // Load all grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    // Project configuration
    pkg: grunt.file.readJSON('package.json'),

    // Clean directories
    clean: {
      dist: ['dist'],
      temp: ['.tmp']
    },

    // Copy files
    copy: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['**/*.{html,txt,ico}'],
          dest: 'dist/'
        }]
      }
    },

    // Concatenate files
    concat: {
      options: {
        separator: ';',
        stripBanners: true
      },
      js: {
        src: ['src/lib/**/*.js', 'src/utils/**/*.js'],
        dest: 'dist/js/combined.js'
      }
    },

    // Minify JavaScript
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'dist/js/combined.js',
        dest: 'dist/js/combined.min.js'
      }
    },

    // Compile Sass
    sass: {
      dist: {
        options: {
          style: 'compressed',
          sourcemap: 'none'
        },
        files: {
          'dist/css/main.css': 'src/scss/main.scss'
        }
      },
      dev: {
        options: {
          style: 'expanded',
          sourcemap: 'auto'
        },
        files: {
          'dist/css/main.css': 'src/scss/main.scss'
        }
      }
    },

    // Minify CSS
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'dist/css',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/css',
          ext: '.min.css'
        }]
      }
    },

    // Minify HTML
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          cwd: 'src',
          src: '**/*.html',
          dest: 'dist'
        }]
      }
    },

    // Watch for changes
    watch: {
      scripts: {
        files: ['src/**/*.js', 'src/**/*.ts'],
        tasks: ['concat', 'uglify'],
        options: {
          spawn: false,
        },
      },
      styles: {
        files: ['src/**/*.scss', 'src/**/*.css'],
        tasks: ['sass', 'cssmin'],
        options: {
          spawn: false,
        },
      },
      html: {
        files: ['src/**/*.html'],
        tasks: ['htmlmin'],
        options: {
          spawn: false,
        },
      }
    },

    // Babel for ES6+ transpilation
    babel: {
      options: {
        sourceMap: true,
        presets: ['@babel/preset-env']
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'src/js',
          src: ['**/*.js'],
          dest: 'dist/js'
        }]
      }
    }
  });

  // Register tasks
  grunt.registerTask('default', ['clean', 'copy', 'concat', 'uglify', 'sass', 'cssmin', 'htmlmin']);
  grunt.registerTask('build', ['clean', 'copy', 'concat', 'uglify', 'sass', 'cssmin', 'htmlmin']);
  grunt.registerTask('dev', ['clean', 'copy', 'sass:dev', 'watch']);
  grunt.registerTask('js', ['concat', 'uglify']);
  grunt.registerTask('css', ['sass', 'cssmin']);
};

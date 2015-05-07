
module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // Styleguide Generation tool
    hologram: {
      generate: {
        options: {
          config: 'hologram_config.yml'
        }
      }
    },

    // CSS Preprocessor
    sass: { // Task
      dist: { // Target
        options: {
          // cssmin will minify later
          style: 'expanded',
          compass: 'true' 
        },
        files: { // Dictionary of files
          'css/build/global.css': 'scss/global.scss'
        }
      }
    },

    // Add Prefixes to CSS properties
    autoprefixer: {
      options: {
        browsers: ['last 2 version', 'ie 8' ,'ie 9']
      },
      multiple_files: {
        expand: true,
        flatten: true,
        src: 'css/build/*.css',
        dest: 'css/build/prefixed/'
      }
    },

    // Minified CSS
    cssmin: {
      combine: {
        files: {
          'css/build/minified/global.css': ['css/build/prefixed/global.css']
        }
      }
    },

    // Hint error when compile JS
    jshint: {
      beforeconcat: ['js/*.js']
    },

    // Combine all JS files together
    concat: {
      dist: {
        // Order matter
        src: [
          'js/libs/jquery.js',
          'js/libs/*.js',
          'scss/*/*/*.js',
          'js/global.js',
        ],
        dest: 'js/build/production.js'
      }
    },

    // Minify JS Files
    uglify: {
      build: {
        src: 'js/build/production.js',
        dest: 'js/build/production.min.js'
      }
    },

    // Image optimization
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'images/'
        }]
      }
    },

    // Enable the use of command line
    shell : {
      jekyllBuild : {
        command : 'jekyll build'
      },
      jekyllServe : {
        command : 'jekyll serve'
      }
    },

    // Actively listening to changes
    watch: {
      options: {
        livereload: true,
      },

      scripts: {
        files: ['js/*.js',
                'js/libs/*.js',
                'scss/*/*/*.js'],

        tasks: ['newer:concat', 'newer:uglify', 'newer:jshint', 'shell:jekyllBuild'],
        options: {
          spawn: false,
        }
      },
      css: {
        files: ['scss/*.scss','scss/*/*.scss','scss/**/*.scss'],
        tasks: ['sass', 'newer:autoprefixer', 'newer:cssmin', 'shell:jekyllBuild'],
        options: {
          spawn: false,
        }
      },
      hologram: {
        files: [
        'hologram_config.yml',
        'scss/*/*.scss',
        'scss/*/*/*.scss',
        'doc_assets/*'
        ],
        tasks: ["hologram"]
      },
      images: {
        files: ['images/**/*.{png,jpg,gif}', 'images/*.{png,jpg,gif}'],
        tasks: ['newer:imagemin','shell:jekyllBuild'],
        options: {
          spawn: false,
        }
      },
      html: {
        files: ['_includes/*.html', '_layouts/*.html','_posts/*.html','*.html'],
        tasks:['shell:jekyllBuild'],
        options:{
          spawn: false
        }
      },
      markdown: {
        files: ['*.md','_project/*.md','_posts/*.md'],
        tasks:['shell:jekyllBuild'],
        options:{
          spawn: false
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 8000,
          base: './_site'
        }
      }
    },

  });


  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Default Task is basically a rebuild
  grunt.registerTask('default', ['concat', 'uglify', 'sass', 'imagemin','shell:jekyllBuild']);

  grunt.registerTask('dev', ['connect', 'watch']);

};
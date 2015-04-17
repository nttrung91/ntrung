
module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    hologram: {
      generate: {
        options: {
          config: 'hologram_config.yml'
        }
      }
    },

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

    cssmin: {
      combine: {
        files: {
          'css/build/minified/global.css': ['css/build/prefixed/global.css']
        }
      }
    },

    jshint: {
      beforeconcat: ['js/*.js']
    },

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

    uglify: {
      build: {
        src: 'js/build/production.js',
        dest: 'js/build/production.min.js'
      }
    },

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

    shell : {
      jekyllBuild : {
        command : 'jekyll build'
      },
      jekyllServe : {
        command : 'jekyll serve'
      }
    },

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
      // hologram: {
      //   files: [
      //   'hologram_config.yml',
      //   'scss/*/*.scss',
      //   'scss/*/*/*.scss',
      //   'doc_assets/*'
      //   ],
      //   tasks: ["hologram"]
      // },
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

  // Default Task is basically a rebuild
  grunt.registerTask('default', ['concat', 'uglify', 'sass', 'imagemin','shell:jekyllBuild']);

  grunt.registerTask('dev', ['connect', 'watch']);

};
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

  //  Config
    pkg: grunt.file.readJSON('package.json')

   ,config: {
      dev: {
        options: {
          variables: {
            'dest': '_site'
          }
        }
      },
      stage: {
        options: {
          variables: {
            'dest': 'beta'
          }
        }
      },
      deploy: {
        options: {
          variables: {
            'dest': '2015'
          }
        }
      }
    }

  //  Build Site

   ,watch: {
      files: ['web/**/*', '!web/_includes/bower_components/**/*']
     ,tasks: ['dev']
     ,options: {
        livereload: true
      }
    }

   ,express: {
      dev: {
        options: {
          port: 3000,
          hostname: 'localhost',
          bases: '<%= grunt.config.get("dest") %>'
        }
      }
    }

   ,shell: {
      jekyll_dev: {
        command: 'jekyll build'
      },
      jekyll_stage: {
        command: 'jekyll build --destination <%= grunt.config.get("dest") %> --config _config.stage.yml'
      },
      jekyll_deploy: {
        command: 'jekyll build --destination <%= grunt.config.get("dest") %> --config _config.production.yml'
      },
      open: {
        command: 'open ./<%= grunt.config.get("dest") %>'
      }
    }

   ,copy: {
      bower: {
        files: [
          { expand: true, flatten: true, cwd: 'web/_includes/bower_components', src: ['html5shiv/dist/html5shiv.js'], dest: '<%= grunt.config.get("dest") %>/static/js/lib'},
          { expand: true, flatten: true, cwd: 'web/_includes/bower_components', src: ['respondJS/dest/respond.min.js'], dest: '<%= grunt.config.get("dest") %>/static/js/lib'}
        ]
      }
    }

   ,clean: {
      files: ['<%= grunt.config.get("dest") %>']
    }

  // Compile

   ,less: {
      development: {
        options: {
          paths: ['web/static/css']
        }
       ,files: {
          'web/static/css/global.css': ['web/_includes/less/global.less'],
          'web/_includes/css/preload.css': ['web/_includes/less/preload.less']
        }
      }
     ,production: {
        options: {
          compress: true
         ,paths: ['web/static/css']
        }
       ,files: {
          'web/static/css/global.css': ['web/_includes/less/global.less'],
          'web/_includes/css/preload.css': ['web/_includes/less/preload.less']
        }
      }
    }

   ,svg2png: {
      gui: {
        // specify files in array format with multiple src-dest mapping
        files: [
            // rasterize all SVG files in "img" and its subdirectories to "img/png"
            {
              cwd: '<%= grunt.config.get("dest") %>/static/gui/'
             ,src: ['**/*.svg']
             ,dest: '<%= grunt.config.get("dest") %>/static/gui/'
             }
        ]
      }
     ,media: {
        files: [
          {
            cwd: '<%= grunt.config.get("dest") %>/media/'
           ,src: ['**/*.svg']
           ,dest: '<%= grunt.config.get("dest") %>/media/'
          }
        ]
       }
      }

  // Validate

   ,htmlhint: {
      options: {
        'tag-pair': true,
        'tagname-lowercase': true,
        'attr-lowercase': true,
        'attr-value-double-quotes': true,
        'doctype-first': true,
        'spec-char-escape': true,
        'id-unique': true,
        'style-disabled': true,
        'src-not-empty': true,
        'img-alt-require': true
      },
      src: ['<%= grunt.config.get("dest") %>/**/*.html']

    }

   ,csslint: {
      options: {
        'adjoining-classes': false,
        'box-model': false,
        'box-sizing': false,
        'regex-selectors': false,
        'universal-selector': false,
        'font-sizes': false  //  Until CSSLint has the option to set an ammount
      },
      src: ['<%= grunt.config.get("dest") %>/static/css/*.css']
    }

   ,jshint: {
      options: {
        browser: true,
        curly: true,
        eqeqeq: true,
        eqnull: true,
        indent: 2,
        laxbreak: true,
        laxcomma: true,
        quotmark: 'single',
        trailing: true,
        undef: true,
        globals: {
          console: true,
          module: true,
          jQuery: true,
          Modernizr: true
        }
      },
      src: ['gruntfile.js', 'web/_includes/js/*.js']
    }

  // Optimise

   ,imagemin: {
      options: {
        optimizationLevel: 3
      },
      dev: {
        files: [{
          expand: true,
          cwd: '<%= grunt.config.get("dest") %>/static/gui',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: '<%= grunt.config.get("dest") %>/static/gui'
        },
        {
          expand: true,
          cwd: '<%= grunt.config.get("dest") %>/static/media',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: '<%= grunt.config.get("dest") %>/static/media'
        }]
      }
    }

   ,hashres: {
      options: {
        encoding: 'utf8',
        fileNameFormat: '${name}.${hash}.${ext}',
        renameFiles: true
      },
      image: {
        src: [
          '<%= grunt.config.get("dest") %>/media/**/*.{png,jpg,gif,svg}'
         ,'<%= grunt.config.get("dest") %>/static/**/*.{png,jpg,gif,svg}'
       ],
        dest: '<%= grunt.config.get("dest") %>/**/*.{html,php,css}',
      },
      css: {
        src: ['<%= grunt.config.get("dest") %>/static/css/**/*.css'],
        dest: '<%= grunt.config.get("dest") %>/**/*.{html,php}',
      },
      js: {
        src: ['<%= grunt.config.get("dest") %>/static/js/**/*.js'],
        dest: '<%= grunt.config.get("dest") %>/**/*.{html,php}',
      }
    }

  });

  // Tasks

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-htmlhint');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-config');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-hashres');
  grunt.loadNpmTasks('grunt-svg2png');
  //grunt.loadNpmTasks('grunt-autoprefixer');

  // Options

  grunt.registerTask('default', ['dev', 'serve']);
  grunt.registerTask('test', ['config:dev', 'htmlhint', 'csslint', 'jshint']);
  grunt.registerTask('optim', ['imagemin']);
  grunt.registerTask('dev', ['config:dev', 'clean', 'less:development', 'shell:jekyll_dev', 'copy']);
  grunt.registerTask('serve', ['express', 'watch']);
  grunt.registerTask('stage', ['config:stage', 'clean', 'less:production', 'shell:jekyll_stage', 'copy', 'hashres', 'svg2png', 'optim']);
  grunt.registerTask('deploy', ['config:deploy', 'clean', 'less:production', 'shell:jekyll_deploy', 'copy', 'hashres', 'svg2png', 'optim']);

};

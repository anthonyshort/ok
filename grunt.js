module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    concat: {
      dist: {
        src: [
          '<banner:meta.banner>',
          'lib/ok.js',
          'lib/validator.js',
          'lib/errors.js'
        ],
        dest: 'ok.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'ok.min.js'
      }
    },
    test: {
      files: ['test/**/*.js']
    },
    lint: {
      files: ['grunt.js', 'lib/**/*.js', 'test/**/*.js']
    },
    watch: {
      files: ['grunt.js', 'src/**/*.coffee', 'test/**/*.coffee'],
      tasks: 'coffee concat test'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true
      },
      globals: {
        exports: true,
        module: false
      }
    },
    coffee: {
      app: {
        src: ['src/*.coffee'],
        dest: 'lib',
        options: {
          bare: false
        }
      },
      test: {
        src: ['test/coffee/*.coffee'],
        dest: 'test/specs',
        options: {
          bare: true
        }
      }
    },
    mocha: {
      index: ['test/index.html']
    },
    uglify: {}
  });

  // Default task.
  grunt.registerTask('default', 'coffee concat min mocha');
  grunt.registerTask('test', 'coffee mocha');
  grunt.loadNpmTasks('grunt-coffee');
  grunt.loadNpmTasks('grunt-mocha');

};

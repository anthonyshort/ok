module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    min: {
      dist: {
        src: 'ok.js',
        dest: 'ok.min.js'
      }
    },
    lint: {
      files: ['grunt.js', 'index.js', 'lib/**/*.js', 'test/**/*.js']
    },
    watch: {
      files: ['grunt.js', 'index.js', 'lib/**/*.js', 'test/**/*.coffee'],
      tasks: 'test'
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
      test: {
        src: ['test/src/*.coffee'],
        dest: 'test/specs/*.js',
        options: {
          bare: true
        }
      }
    },
    mocha: {
      index: ['test/index.html']
    },
    shell: {
      install: {
        command: "component install -f"
      },
      build: {
        command: "component build -o ./ -s ok -n ok"
      }
    },
    clean: {
      publish: ['build', 'ok.css']
    }
  });

  grunt.registerTask('test', 'build coffee mocha');
  grunt.registerTask('install', 'shell:install');
  grunt.registerTask('build', 'shell:build clean');
  grunt.registerTask('publish', 'build min');

  grunt.registerTask('default', 'install build test publish clean');

  grunt.loadNpmTasks('grunt-coffee');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-contrib');
  grunt.loadNpmTasks('grunt-shell');
};

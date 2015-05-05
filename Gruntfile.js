module.exports = function(grunt) {

  // Configuration
  grunt.initConfig({
    /*------- PackageJSON -------*/
    pkg: grunt.file.readJSON('package.json'),

    /*------- JS Hint -------*/
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js']
    },
    /*------- Clean -------*/
    clean: ["dist/"],
    /*------- RequireJS -------*/
    requirejs: {
      js: {
        options: {
          mainConfigFile: 'src/config.js',
          // AMDClean for converting scripts into plain javascript
          // files instead of including almond AMD loader.
          onModuleBundleComplete: function (data) {
            var fs = require('fs'),
            amdclean = require('amdclean'),
            outputFile = data.path;
            fs.writeFileSync(outputFile, amdclean.clean({
              'filePath': outputFile,
              'transformAMDChecks': false,
              'aggressiveOptimizations': false,
              'createAnonymousAMDModule': true,
              // Wrap library in an Immediately Invoked Function Expression (IIFE)
              'wrap': {
                'start': ';(function(window, document, navigator, undefined) {\nvar SEMANTICS={debug:true};\n',
                'end': '\n}(typeof window !== "undefined" ? window : {}, typeof document !== "undefined" ? document : { createElement: function() {} }, typeof window !== "undefined" ? window.navigator : {}));'
              },
              'escodegen': { 'comment': false }
            }));
          }
          
        }
      }
    },
    /*------- Uglify -------*/
    uglify: {
      my_target: {
        files: {
          'dist/semantic.min.js': ['dist/semantic.js']
        }
      }
    },

    /*------- YuiDoc -------*/
    yuidoc: {
      compile: {
        name: '<%= pkg.name %>',
        description: '<%= pkg.description %>',
        url: "http://semanticjs.oguzgelal.com",
        logo: "http://i.imgur.com/dcLg0MG.png",
        version: '<%= pkg.version %>',
        options: {
          paths: 'src/',
          outdir: 'dist/docs'
        }
      }
    }


  });

// Load NPM Tasks
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-requirejs');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-yuidoc');

// Default
grunt.registerTask('default', [
  'clean',
  'jshint',
  'requirejs',
  'uglify',
  'yuidoc'
  ]);

};
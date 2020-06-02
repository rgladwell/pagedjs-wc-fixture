module.exports = function (grunt) {
  'use strict'

  var resolve = require('rollup-plugin-node-resolve')

  grunt.initConfig({
    copy: {
      main: {
        files: [
          {
            src: 'index.html',
            dest: 'dist/html/index.html'
          },
          {
            src: 'main.css',
            dest: 'dist/html/main.css'
          }
        ]
      }
    },

    watch: {
      options: {
        livereload: true
      },
      html: {
        files: ['index.html', 'main.css', 'package.json'],
        tasks: ['copy:main']
      }
    },

    clean: {
      release: ['dist']
    },

    connect: {
      server: {
        options: {
          port: 8000,
          base: 'dist/html',
          hostname: 'localhost',
          livereload: true
        }
      }
    },

    npmcopy: {
      dist: {
        options: {
          destPrefix: 'dist/html/vendor'
        },
        files: {
          'pagedjs': 'pagedjs'
        }
      }
    },

    rollup: {
      options: {
        format: 'es',
        plugins: [
          resolve()
        ]
      },
      dist: {
        files: {
          'dist/html/scripts/vellum.js': 'vellum.js'
        }
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-connect')
  grunt.loadNpmTasks('grunt-npmcopy')
  grunt.loadNpmTasks('grunt-rollup')

  grunt.registerTask('default', ['copy', 'npmcopy', 'rollup'])
  grunt.registerTask('run', ['default', 'connect', 'watch'])
}

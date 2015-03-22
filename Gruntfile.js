module.exports = function(grunt) {

   grunt.initConfig({

      pkg: grunt.file.readJSON('package.json'),

      banner: '/*!\n' +
      ' * <%= pkg.name %> v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
      ' * Copyright 2015-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
      ' */\n',
      concat: {
         options: {
            separator: '\n'
         },
         css: {
            src: ['css/built-bootstrap+<%= pkg.name %>.css',
                  'css/plugins/font-awesome.css',
                  'css/plugins/animate.css',
                  'css/plugins/select2.css',
                  'css/plugins/select2-bootstrap.css',
                  'css/built-plugin-overrides.css'],
            dest: 'dist/css/<%= pkg.name %>-v<%= pkg.version %>.css'
         },
         js: {
            src: ['js/bootstrap.min.js',
                  'js/plugins/select2.js',
                  'js/plugins/fixie.js',
                  'js/plugins/holder.js',
                  'js/<%= pkg.name %>-v<%= pkg.version %>.js'],
            dest: 'dist/js/<%= pkg.name %>-v<%= pkg.version %>.js'
         }
      },
      uglify: {
         dist: {
            files: {
               'dist/js/<%= pkg.name %>-v<%= pkg.version %>.min.js': ['dist/js/<%= pkg.name %>-v<%= pkg.version %>.js']
            }
         }
      },
      cssmin: {
         dist: {
            files: [{
               expand: true,
               cwd: 'dist/css/',
               src: ['*.css', '!*.min.css'],
               dest: 'dist/css/',
               ext: '.min.css'
            }]
         }
      },
      copy: {
         fonts: {
            src: 'fonts/*',
            dest: 'dist/'
         },
         select2: {
            flatten: true,
            expand: true,
            src: 'img/select2/*',
            dest: 'dist/css/'
         },
         // bower: {
         //    flatten: true,
         //    expand: true,
         //    src: 'img/select2/*',
         //    dest: 'dist/css/'
         // },
      },
      clean: ["dist/*"],
      less: {
         mixin: {
            options: {
               sourceMap: false,
            },
            src: ['css/less/components/mixins/utility-belt.less'],
            dest: 'css/less/components/built-utility-belt.less'
         },
         dev: {
            options: {
               banner: '<%= banner %>',
               stripBanners: false,
               sourceMap: true,
               sourceMapFilename: 'dist/css/<%= pkg.name %>-v<%= pkg.version %>.css.map'
            },
            src: ['css/less/build.less'],
            dest: 'css/built-bootstrap+mr.css'
         },
         overrides: {
            options: {
               sourceMap: false,
            },
            src: ['css/less/components/plugin-overrides.less'],
            dest: 'css/built-plugin-overrides.css'
         },
      },
      watch: {
         options: {
            livereload: true
         },
         less:{
            files: ['css/less/**', 'css/**'],
            tasks: ['css']
         },
         js:{
            files: ['js/**'],
            tasks: ['js']
         },
         html:{
            files: ['*.php', '*.html', 'includes/**' ],
            tasks: []
         },
      },
      'sftp-deploy': {
         full: {
            auth: {
               host: 'HOSTNAMEIPADDRESS',
               port: 22,
               authKey: 'key1'
            },
            src: '../project-init-php/',
            dest: '/location/from/server/root/',
            exclusions: [
               'bower_components',
               'node_modules',
               '.DS_Store',
               '.gitignore',
               '.git'
            ],
            progress: true
         }
      },
      autoprefixer: {
        options: {
            browsers: ['last 4 versions']
         },
         // prefix all files
         normal: {
            expand: true,
            flatten: true,
            src: 'dist/css/*.css',
            dest: 'dist/css/'
         }
      },
      replace: {
         glyphicon: {
            src: ['dist/css/*'],             // source files array (supports minimatch)
            dest: 'dist/css/',             // destination directory or file
            replacements: [{
               from: 'glyphicon',                   // string replacement
               to: 'fa'
            }]
         }
      }
   });

   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-contrib-less');    
   grunt.loadNpmTasks('grunt-contrib-watch');
   grunt.loadNpmTasks('grunt-contrib-cssmin');   
   grunt.loadNpmTasks('grunt-contrib-concat');   
   grunt.loadNpmTasks('grunt-contrib-clean');    
   grunt.loadNpmTasks('grunt-contrib-copy');    
   grunt.loadNpmTasks('grunt-sftp-deploy');
   grunt.loadNpmTasks('grunt-autoprefixer');
   grunt.loadNpmTasks('grunt-text-replace');
   //img-min //SETUP

   //Slim task runners
   grunt.registerTask('default', ['less:dev', 'concat:js', 'watch']);
   grunt.registerTask('css', ['less:dev', 'concat:css', 'replace', 'autoprefixer', 'watch']);
   grunt.registerTask('js', ['concat:js', 'watch']);

   //Production ready task runners
   grunt.registerTask('full', ['clean', 'copy', 'less', 'concat', 'replace', 'autoprefixer', 'cssmin', 'uglify']);
   grunt.registerTask('deploy', ['sftp-deploy']);
};
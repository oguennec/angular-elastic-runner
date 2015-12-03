// Karma configuration
// Generated on Mon Nov 30 2015 16:56:51 GMT+0000 (GMT)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [

          'public-lib/lib/angular/angular.js',
          'public-lib/lib/angular-ui-router/release/angular-ui-router.js',
          'public-lib/lib/angular-mocks/angular-mocks.js',
          'public-lib/lib/sinon/lib/sinon.js',
          'public-lib/lib/ng-prettyjson/dist/ng-prettyjson.min.js',
          'public-lib/lib/elasticsearch/elasticsearch.js',
          'public-lib/lib/elasticsearch/elasticsearch.angular.js',
          'public-lib/lib/jquery/dist/jquery.js',
          'public-lib/lib/bootstrap/dist/js/bootstrap.js',
          'public-lib/lib/bootstrap-material-design/dist/js/ripples.js',
          'public-lib/lib/bootstrap-material-design/dist/js/material.js',
          'public-lib/lib/angular-recursion/angular-recursion.js',
          'public-lib/lib/angular-elastic-builder/dist/angular-elastic-builder.js',

          'public/app.js',
          'public/app/search/esSearch.ctrl.js',
          'public/app/querybuilder/queryBuilder.ctrl.js',
          'public/app/search/esSearch.svc.js',
          'public/app/shared/stateWatcher.svc.js',

          'spec/app/search/esSearch.svc.spec.js'
        ],


        // list of files to exclude
        exclude: [
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {},


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],

        plugins: [
        'karma-jasmine',
        'karma-phantomjs-launcher'
        ],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultanous
        concurrency: Infinity
    })
}

module.exports = function(config) {
  config.set({
    frameworks:  ['jasmine'],
    files:  [
      'bower_components/angular/angular.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'angular-flags.js',
      'test/**/*.js'
    ],
    browsers: ['PhantomJS'],
    singleRun: true
  });
};

## angular-flags

> Plug-n-play feature flags for your AngularJS app

[![Build Status](https://travis-ci.org/jimjamjoh/angular-flags.png?branch=master)](https://travis-ci.org/jimjamjoh/angular-flags)

### About angular-flags

angular-flags is a cookie-based approach managing the on/off state of [feature flags](http://martinfowler.com/bliki/FeatureToggle.html), designed to facilitate [trunk-based development](http://paulhammant.com/2013/04/05/what-is-trunk-based-development/) of your AngularJS app.  It is based upon a feature flags implementation using Rack middleware to manage flags in Rails/Sinatra apps developed by a pair of ThoughtWorks colleagues of mine and open-sourced as [rack-flags](https://github.com/moredip/rack-flags).

### Getting started:

Angular-flags is designed to easily plug into an existing AngularJS app with a minimum of configuration or setup.  The [_Github Page_](http://jimjamjoh.github.io/angular-flags) for angular-flags gives a detailed walk-through of setting up and using angular-flags using the [reference app](http://github.com/jimjamjoh/angular-flags-example).

### When forking:

To run the tests:
 
```
npm install -g bower karma
bower install
karma start
```


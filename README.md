## angular-flags

> Plug-n-play feature flags for your angular app

[![Build Status](https://travis-ci.org/jimjamjoh/angular-flags.png?branch=master)](https://travis-ci.org/jimjamjoh/angular-flags)

### About angular-flags

angular-flags is a cookie-based approach managing the on/off state of [feature flags](http://martinfowler.com/bliki/FeatureToggle.html), designed to facilitate [trunk-based development](http://paulhammant.com/2013/04/05/what-is-trunk-based-development/) of your Angular app.  It is based upon a feature flags implementation using Rack middleware to manage flags in Rails/Sinatra apps developed by a pair of ThoughtWorks colleagues of mine and open-sourced as [rack-flags](https://github.com/moredip/rack-flags).

### Getting started:

#### 1. Install with Bower

Add an angular-flags entry to your `bower.json`(`component.json` for bower < 0.9.0) or install manually:

`bower install angular-flags`

#### 2. Include angular-flags in your app

- Add a `<script>` tag reference to the bower-installed `angular-flags.js` in your index.html.
- Then add a module dependency on `$featureFlags` to your main site module.

#### 3. Initialise with your default flag settings

Initialisation takes a JSON array of objects containing a "name" attribute and a "default" attribute of either "on" or "of".  For example:

```javascript
var defaults = [
	{'name': 'Safe old feature', 'default': 'on'},
	{'name': 'Cutting-edge new feature', 'default': 'off'}
]
$featureFlagsFactory.initialise(defaults);
```

(Initialisation with a JSON array allows the flags to be set either at deploy-time, as in this example, or at runtime by calling out to an AJAX resource for the flags.)

#### 4. Override defaults with cookies

angular-flags shims an admin console into your app at the route `#/featureFlags`.  After initialisation, navigate to this route to override the default flag settings with browser cookies.  Look at this [reference app](https://github.com/jimjamjoh/angular-flags-example) to see it in action.

#### 5. Show/hide features with default or overriden flag setting

Best practice is to keep your flag evaluation as close to the UI as possible and evaluate flag values with an `ng-show` or `ng-hide` in your Angular views.  Here's how:

In your controller:

```javascript
angular('myModule').controller('myCtrl', ['$featureFlagsFactory', function($featureFlagsFactory) {
	$scope.featureFlags = $featureFlagsFactory;
}]);
```

And in your view:

```html
<div ng-show="featureflags.on('experimental')">
	<!-- view template for experimental feature here -->
</div>
```

### Reference app:

Have a look at the [reference app](https://github.com/jimjamjoh/angular-flags-example) to see angular-flags in action.  The diff of [this commit](https://github.com/jimjamjoh/angular-flags-example/commit/f6fba5c2d44c11c7a5bf0af00c6db5da9d5f9c4a) shows how simple it is to include angular-flags into an existing Angular app.

### When forking:

To run the tests:
 
`npm install -g bower karma`

`bower install`

`karma start`

